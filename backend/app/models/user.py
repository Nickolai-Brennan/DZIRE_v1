"""backend/app/models/user.py — SQLAlchemy ORM model for users."""

import uuid
from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from ..core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    username: Mapped[str] = mapped_column(
        String, unique=True, nullable=False, index=True
    )
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    # Profile fields
    first_name: Mapped[str | None] = mapped_column(String(128), nullable=True)
    last_name: Mapped[str | None] = mapped_column(String(128), nullable=True)
    avatar_url: Mapped[str | None] = mapped_column(String(512), nullable=True)
    # Role / access control
    role: Mapped[str] = mapped_column(String, nullable=False, default="member")
    # Status: active | inactive | suspended | banned
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="active")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    is_vip: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    vip_plan_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
    # Email verification
    email_verify_token: Mapped[str | None] = mapped_column(String(256), nullable=True)
    # Password reset
    password_reset_token: Mapped[str | None] = mapped_column(String(256), nullable=True)
    password_reset_expires: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    # Timestamps
    last_login: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
