"""backend/app/auth/tokens.py — JWT creation and validation with rich claims.

Access token claims: user_id, email, role, is_vip, exp, type="access"
Refresh token claims: sub (user_id), exp, type="refresh"
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from ..core.config import get_settings

settings = get_settings()


def create_access_token(user_id: str, email: str, role: str, is_vip: bool) -> str:
    """Create a short-lived access JWT with full user claims."""
    expire = datetime.now(tz=timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    payload = {
        "sub": user_id,
        "user_id": user_id,
        "email": email,
        "role": role,
        "is_vip": is_vip,
        "exp": expire,
        "type": "access",
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def create_refresh_token(user_id: str) -> str:
    """Create a long-lived refresh JWT."""
    expire = datetime.now(tz=timezone.utc) + timedelta(
        days=settings.refresh_token_expire_days
    )
    payload = {"sub": user_id, "exp": expire, "type": "refresh"}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict:
    """Decode and validate a JWT. Raises JWTError on failure."""
    return jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
