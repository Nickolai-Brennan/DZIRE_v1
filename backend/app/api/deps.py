"""backend/app/api/deps.py — Admin auth dependency."""
from fastapi import Depends, HTTPException, Header, status
from jose import JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth.jwt import decode_token
from ..core.database import get_db
from ..models.admin_user import AdminUser
from ..services.admin_service import get_admin_by_id


async def require_admin(
    authorization: str | None = Header(default=None),
    db: AsyncSession = Depends(get_db),
) -> AdminUser:
    """FastAPI dependency — validates Bearer JWT and returns the AdminUser."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate admin credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not authorization or not authorization.startswith("Bearer "):
        raise credentials_exception
    token = authorization.removeprefix("Bearer ").strip()
    try:
        payload = decode_token(token)
        if payload.get("type") != "admin_access":
            raise credentials_exception
        admin_id_str: str | None = payload.get("sub")
        if not admin_id_str:
            raise credentials_exception
        admin_id = int(admin_id_str)
    except (JWTError, ValueError):
        raise credentials_exception

    admin = await get_admin_by_id(db, admin_id)
    if admin is None or not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin user not found or inactive",
        )
    return admin
