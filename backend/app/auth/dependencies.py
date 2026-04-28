"""backend/app/auth/dependencies.py — FastAPI auth dependencies."""

from __future__ import annotations

import uuid

from fastapi import Cookie, Depends, Header, HTTPException, status
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.database import get_db
from ..models.user import User
from .jwt import decode_token
from .tokens import decode_token as decode_rich_token

# ---------------------------------------------------------------------------
# Legacy helpers (used by existing /auth/* routes)
# ---------------------------------------------------------------------------


async def get_current_user_id(
    authorization: str | None = Header(default=None),
) -> str:
    """Extract and validate the Bearer access token. Returns user_id string."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not authorization or not authorization.startswith("Bearer "):
        raise credentials_exception
    token = authorization.removeprefix("Bearer ").strip()
    try:
        payload = decode_token(token)
        if payload.get("type") != "access":
            raise credentials_exception
        user_id: str | None = payload.get("sub")
        if not user_id:
            raise credentials_exception
        return user_id
    except JWTError:
        raise credentials_exception


async def get_refresh_token_subject(
    refresh_token: str | None = Cookie(default=None),
) -> str:
    """Extract subject from the HttpOnly refresh token cookie."""
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing",
        )
    try:
        payload = decode_token(refresh_token)
        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
            )
        return payload["sub"]
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )


# ---------------------------------------------------------------------------
# New dependencies — return full User object
# ---------------------------------------------------------------------------


async def get_current_user(
    authorization: str | None = Header(default=None),
    access_token: str | None = Cookie(default=None),
    db: AsyncSession = Depends(get_db),
) -> User:
    """Dependency: validate access token (Bearer header or cookie) and return User.

    Accepts:
      - Authorization: Bearer <token>   (for API clients)
      - access_token HttpOnly cookie    (for browser-based flows)
    """
    from sqlalchemy import select

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token: str | None = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.removeprefix("Bearer ").strip()
    elif access_token:
        token = access_token

    if not token:
        raise credentials_exception

    try:
        payload = decode_rich_token(token)
        if payload.get("type") != "access":
            raise credentials_exception
        user_id_str: str | None = payload.get("sub")
        if not user_id_str:
            raise credentials_exception
        user_id = uuid.UUID(user_id_str)
    except (JWTError, ValueError):
        raise credentials_exception

    result = await db.execute(select(User).where(User.id == user_id))
    user: User | None = result.scalar_one_or_none()
    if user is None or user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive.",
        )
    return user


async def get_current_user_optional(
    authorization: str | None = Header(default=None),
    access_token: str | None = Cookie(default=None),
    db: AsyncSession = Depends(get_db),
) -> User | None:
    """Like get_current_user but returns None instead of raising for unauthenticated requests."""
    try:
        return await get_current_user(
            authorization=authorization, access_token=access_token, db=db
        )
    except HTTPException:
        return None
