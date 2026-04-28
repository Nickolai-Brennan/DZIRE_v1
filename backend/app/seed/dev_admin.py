"""backend/app/seed/dev_admin.py — Dev-only temporary admin seed.

WARNING: This creates a TEMPORARY admin account for local development.
         username: admin  |  password: admin
         TODO: Change admin credentials before production.
         This seed only runs when ENV=development AND SEED_DEV_ADMIN=true.
"""

import asyncio
import logging

from sqlalchemy.ext.asyncio import AsyncSession

from ..core.config import get_settings
from ..core.database import AsyncSessionLocal
from ..models.admin_user import AdminUser
from ..services.admin_service import (get_admin_by_username,
                                      get_or_create_role, hash_password)

logger = logging.getLogger(__name__)

_DEV_ADMIN_USERNAME = "admin"
_DEV_ADMIN_PASSWORD = "admin"  # TEMPORARY — change before production


async def seed_dev_admin(db: AsyncSession) -> None:
    """Seed the temporary dev admin user if not already present."""
    settings = get_settings()

    if not settings.is_development or not settings.seed_dev_admin:
        return

    logger.warning(
        "⚠️  DEV SEED: Creating temporary admin account (admin/admin). "
        "TODO: Change admin credentials before production."
    )

    role = await get_or_create_role(db, "super_admin")

    existing = await get_admin_by_username(db, _DEV_ADMIN_USERNAME)
    if existing:
        logger.info("Dev admin already exists — skipping seed.")
        return

    admin = AdminUser(
        username=_DEV_ADMIN_USERNAME,
        password_hash=hash_password(_DEV_ADMIN_PASSWORD),
        role_id=role.id,
        is_active=True,
    )
    db.add(admin)
    await db.commit()
    logger.warning(
        "⚠️  Dev admin created: username=admin  password=admin  (INSECURE — dev only)"
    )


async def run_seed() -> None:
    """Entry point for standalone seed execution."""
    async with AsyncSessionLocal() as db:
        await seed_dev_admin(db)


if __name__ == "__main__":
    asyncio.run(run_seed())
