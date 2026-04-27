"""backend/app/services/admin_service.py — Admin user business logic."""
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.admin_role import AdminRole
from ..models.admin_user import AdminUser

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(plain: str) -> str:
    return _pwd_context.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    return _pwd_context.verify(plain, hashed)


async def get_admin_by_username(db: AsyncSession, username: str) -> AdminUser | None:
    result = await db.execute(
        select(AdminUser).where(AdminUser.username == username)
    )
    return result.scalar_one_or_none()


async def get_admin_by_id(db: AsyncSession, admin_id: int) -> AdminUser | None:
    result = await db.execute(
        select(AdminUser).where(AdminUser.id == admin_id)
    )
    return result.scalar_one_or_none()


async def authenticate_admin(
    db: AsyncSession, username: str, password: str
) -> AdminUser | None:
    admin = await get_admin_by_username(db, username)
    if not admin:
        return None
    if not verify_password(password, admin.password_hash):
        return None
    if not admin.is_active:
        return None
    return admin


async def get_or_create_role(db: AsyncSession, name: str) -> AdminRole:
    result = await db.execute(select(AdminRole).where(AdminRole.name == name))
    role = result.scalar_one_or_none()
    if role is None:
        role = AdminRole(name=name)
        db.add(role)
        await db.flush()
    return role
