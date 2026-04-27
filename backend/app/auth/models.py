"""backend/app/auth/models.py — Audit log model for security event tracking."""
from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from ..core.database import Base


class AuditLog(Base):
    """Tracks security-relevant events: logins, role changes, admin actions, etc."""
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    # Who performed the action (user id or "system")
    actor_id: Mapped[str | None] = mapped_column(String(128), nullable=True, index=True)
    # What happened (e.g. "login_success", "password_reset", "role_change")
    event: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    # Optional target (e.g. the user whose role was changed)
    target_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
    # Free-form details (JSON string or human readable)
    detail: Mapped[str | None] = mapped_column(Text, nullable=True)
    # Client IP address
    ip: Mapped[str | None] = mapped_column(String(45), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
