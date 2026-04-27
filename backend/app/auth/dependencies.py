"""backend/app/auth/dependencies.py — FastAPI auth dependencies."""
from fastapi import Cookie, Depends, HTTPException, Header, status
from jose import JWTError

from .jwt import decode_token
from ..core.database import AsyncSession, get_db


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
