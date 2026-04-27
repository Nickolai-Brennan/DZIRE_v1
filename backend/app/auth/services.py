"""backend/app/auth/services.py — Auth business logic.

Handles: registration, password verification, token generation,
email verification stubs, password reset stubs, and audit logging.
"""
from __future__ import annotations

import logging
import secrets
import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth.models import AuditLog
from ..auth.security import hash_password, verify_password
from ..auth.tokens import create_access_token, create_refresh_token
from ..models.user import User
from ..permissions.roles import Role

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# User lookup helpers
# ---------------------------------------------------------------------------

async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: str | uuid.UUID) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def get_user_by_username(db: AsyncSession, username: str) -> User | None:
    result = await db.execute(select(User).where(User.username == username))
    return result.scalar_one_or_none()


# ---------------------------------------------------------------------------
# Registration
# ---------------------------------------------------------------------------

async def register_user(
    db: AsyncSession,
    email: str,
    username: str,
    password: str,
    first_name: str | None = None,
    last_name: str | None = None,
) -> User:
    """Create and persist a new user. Raises ValueError on conflict."""
    if await get_user_by_email(db, email):
        raise ValueError("Email already registered.")
    if await get_user_by_username(db, username):
        raise ValueError("Username already taken.")

    verify_token = secrets.token_urlsafe(32)
    user = User(
        email=email,
        username=username,
        hashed_password=hash_password(password),
        first_name=first_name,
        last_name=last_name,
        role=Role.member,
        status="active",
        is_active=True,
        is_verified=False,
        is_vip=False,
        email_verify_token=verify_token,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    # Placeholder email sender — plug in real provider here
    _send_verification_email(email, verify_token)

    await _audit(db, actor_id=str(user.id), event="register", detail=f"email={email}")
    return user


# ---------------------------------------------------------------------------
# Authentication
# ---------------------------------------------------------------------------

async def authenticate_user(
    db: AsyncSession, email: str, password: str, ip: str | None = None
) -> User | None:
    """Validate credentials. Returns User on success, None on failure."""
    user = await get_user_by_email(db, email)
    success = (
        user is not None
        and verify_password(password, user.hashed_password)
        and user.status == "active"
    )
    await _audit(
        db,
        actor_id=str(user.id) if user else None,
        event="login_success" if success else "login_failure",
        detail=f"email={email}",
        ip=ip,
    )
    if not success:
        return None
    # Update last_login
    user.last_login = datetime.now(tz=timezone.utc)
    await db.commit()
    await db.refresh(user)
    return user


def make_token_pair(user: User) -> tuple[str, str]:
    """Return (access_token, refresh_token) for the given user."""
    access = create_access_token(
        user_id=str(user.id),
        email=user.email,
        role=user.role,
        is_vip=user.is_vip,
    )
    refresh = create_refresh_token(user_id=str(user.id))
    return access, refresh


# ---------------------------------------------------------------------------
# Email verification
# ---------------------------------------------------------------------------

async def verify_email(db: AsyncSession, token: str) -> User:
    """Mark the user's email as verified. Raises ValueError if invalid."""
    result = await db.execute(
        select(User).where(User.email_verify_token == token)
    )
    user = result.scalar_one_or_none()
    if not user:
        raise ValueError("Invalid or expired verification token.")
    user.is_verified = True
    user.email_verify_token = None
    await db.commit()
    await db.refresh(user)
    await _audit(db, actor_id=str(user.id), event="email_verified")
    return user


# ---------------------------------------------------------------------------
# Password reset
# ---------------------------------------------------------------------------

async def initiate_password_reset(db: AsyncSession, email: str) -> None:
    """Generate a reset token and send reset email (stub)."""
    user = await get_user_by_email(db, email)
    if not user:
        # Do not reveal whether email exists
        return
    token = secrets.token_urlsafe(32)
    user.password_reset_token = token
    user.password_reset_expires = datetime.now(tz=timezone.utc) + timedelta(hours=1)
    await db.commit()
    _send_password_reset_email(user.email, token)
    await _audit(db, actor_id=str(user.id), event="password_reset_requested")


async def complete_password_reset(
    db: AsyncSession, token: str, new_password: str
) -> User:
    """Apply the new password if the reset token is valid."""
    result = await db.execute(
        select(User).where(User.password_reset_token == token)
    )
    user = result.scalar_one_or_none()
    if not user or not user.password_reset_expires:
        raise ValueError("Invalid or expired reset token.")
    if user.password_reset_expires < datetime.now(tz=timezone.utc):
        raise ValueError("Reset token has expired.")
    user.hashed_password = hash_password(new_password)
    user.password_reset_token = None
    user.password_reset_expires = None
    await db.commit()
    await db.refresh(user)
    await _audit(db, actor_id=str(user.id), event="password_reset_complete")
    return user


# ---------------------------------------------------------------------------
# Audit logging
# ---------------------------------------------------------------------------

async def _audit(
    db: AsyncSession,
    *,
    event: str,
    actor_id: str | None = None,
    target_id: str | None = None,
    detail: str | None = None,
    ip: str | None = None,
) -> None:
    entry = AuditLog(
        actor_id=actor_id,
        event=event,
        target_id=target_id,
        detail=detail,
        ip=ip,
    )
    db.add(entry)
    await db.commit()


# ---------------------------------------------------------------------------
# Email stubs — replace with real provider (SendGrid, Mailgun, etc.)
# ---------------------------------------------------------------------------

def _send_verification_email(email: str, token: str) -> None:
    """Placeholder: log verification token.

    To integrate a real provider:
      1. Install the provider SDK (e.g. ``pip install sendgrid``).
      2. Replace this function with an async call to the provider API.
      3. Set SENDGRID_API_KEY (or equivalent) in your environment.
    """
    logger.info(
        "[EMAIL STUB] Verification email for %s — token: %s", email, token
    )


def _send_password_reset_email(email: str, token: str) -> None:
    """Placeholder: log password reset token.

    See _send_verification_email for integration instructions.
    """
    logger.info(
        "[EMAIL STUB] Password reset email for %s — token: %s", email, token
    )
