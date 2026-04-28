"""backend/app/models/admin_user.py — AdminUser SQLAlchemy model.

WARNING: The dev seed creates a temporary admin/admin account for local
development only.  TODO: Change admin credentials before production.
"""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core.database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(
        String(64), unique=True, nullable=False, index=True
    )
    password_hash: Mapped[str] = mapped_column(String(256), nullable=False)
    role_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("admin_roles.id"), nullable=False
    )
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    role_obj: Mapped["AdminRole"] = relationship(  # type: ignore[name-defined]  # noqa: F821
        "AdminRole", back_populates="users", lazy="joined"
    )
