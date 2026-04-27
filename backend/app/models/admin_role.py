"""backend/app/models/admin_role.py — AdminRole SQLAlchemy model."""
from datetime import datetime

from sqlalchemy import DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core.database import Base


class AdminRole(Base):
    __tablename__ = "admin_roles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(64), unique=True, nullable=False, index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # back-ref used by AdminUser
    users: Mapped[list["AdminUser"]] = relationship(  # type: ignore[name-defined]  # noqa: F821
        "AdminUser", back_populates="role_obj", lazy="select"
    )
