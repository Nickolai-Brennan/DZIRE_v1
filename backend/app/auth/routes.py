"""backend/app/auth/routes.py — Full auth API endpoints.

Routes:
  POST /api/auth/register
  POST /api/auth/login
  POST /api/auth/logout
  POST /api/auth/refresh
  POST /api/auth/forgot-password
  POST /api/auth/reset-password
  POST /api/auth/verify-email

Tokens are stored in HttpOnly cookies. The access_token is also returned in
the JSON body for API clients that prefer the Bearer header pattern.
"""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Cookie, Depends, HTTPException, Request, Response, status
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth import services
from ..auth.schemas import (
    ForgotPasswordRequest,
    LoginRequest,
    RegisterRequest,
    ResetPasswordRequest,
    TokenResponse,
    UserPublicResponse,
    VerifyEmailRequest,
)
from ..auth.tokens import create_access_token, create_refresh_token, decode_token
from ..core.config import get_settings
from ..core.database import get_db

router = APIRouter(prefix="/api/auth", tags=["auth"])
settings = get_settings()

_ACCESS_COOKIE = "access_token"
_REFRESH_COOKIE = "refresh_token"

_REFRESH_COOKIE_OPTS: dict = {
    "key": _REFRESH_COOKIE,
    "httponly": True,
    "secure": True,
    "samesite": "strict",
    "max_age": settings.refresh_token_expire_days * 86_400,
}

_ACCESS_COOKIE_OPTS: dict = {
    "key": _ACCESS_COOKIE,
    "httponly": True,
    "secure": True,
    "samesite": "strict",
    "max_age": settings.access_token_expire_minutes * 60,
}


def _set_tokens(response: Response, access_token: str, refresh_token: str) -> None:
    response.set_cookie(value=access_token, **_ACCESS_COOKIE_OPTS)
    response.set_cookie(value=refresh_token, **_REFRESH_COOKIE_OPTS)


# ---------------------------------------------------------------------------
# Register
# ---------------------------------------------------------------------------

@router.post("/register", response_model=UserPublicResponse, status_code=201)
async def register(
    body: RegisterRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
) -> UserPublicResponse:
    try:
        user = await services.register_user(
            db,
            email=body.email,
            username=body.username,
            password=body.password,
            first_name=body.first_name,
            last_name=body.last_name,
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc))
    access, refresh = services.make_token_pair(user)
    _set_tokens(response, access, refresh)
    return UserPublicResponse.model_validate(user)


# ---------------------------------------------------------------------------
# Login
# ---------------------------------------------------------------------------

@router.post("/login", response_model=TokenResponse)
async def login(
    body: LoginRequest,
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
) -> TokenResponse:
    ip = request.client.host if request.client else None
    user = await services.authenticate_user(db, body.email, body.password, ip=ip)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials.",
        )
    access, refresh = services.make_token_pair(user)
    _set_tokens(response, access, refresh)
    return TokenResponse(access_token=access)


# ---------------------------------------------------------------------------
# Logout
# ---------------------------------------------------------------------------

@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(response: Response) -> None:
    response.delete_cookie(_ACCESS_COOKIE)
    response.delete_cookie(_REFRESH_COOKIE)


# ---------------------------------------------------------------------------
# Refresh
# ---------------------------------------------------------------------------

@router.post("/refresh", response_model=TokenResponse)
async def refresh_tokens(
    response: Response,
    refresh_token: str | None = Cookie(default=None),
    db: AsyncSession = Depends(get_db),
) -> TokenResponse:
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token missing."
        )
    try:
        payload = decode_token(refresh_token)
        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type."
            )
        user_id: str = payload["sub"]
    except (JWTError, KeyError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token."
        )

    user = await services.get_user_by_id(db, uuid.UUID(user_id))
    if not user or user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found or inactive."
        )
    access, new_refresh = services.make_token_pair(user)
    _set_tokens(response, access, new_refresh)
    return TokenResponse(access_token=access)


# ---------------------------------------------------------------------------
# Forgot password
# ---------------------------------------------------------------------------

@router.post("/forgot-password", status_code=status.HTTP_204_NO_CONTENT)
async def forgot_password(
    body: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db),
) -> None:
    await services.initiate_password_reset(db, body.email)


# ---------------------------------------------------------------------------
# Reset password
# ---------------------------------------------------------------------------

@router.post("/reset-password", status_code=status.HTTP_204_NO_CONTENT)
async def reset_password(
    body: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db),
) -> None:
    try:
        await services.complete_password_reset(db, body.token, body.new_password)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))


# ---------------------------------------------------------------------------
# Verify email
# ---------------------------------------------------------------------------

@router.post("/verify-email", status_code=status.HTTP_204_NO_CONTENT)
async def verify_email(
    body: VerifyEmailRequest,
    db: AsyncSession = Depends(get_db),
) -> None:
    try:
        await services.verify_email(db, body.token)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
