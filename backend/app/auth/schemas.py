"""backend/app/auth/schemas.py — Pydantic v2 schemas for auth endpoints."""
from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


# ---------------------------------------------------------------------------
# Request schemas
# ---------------------------------------------------------------------------

class RegisterRequest(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3, max_length=64)
    password: str = Field(min_length=8)
    first_name: str | None = None
    last_name: str | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(min_length=8)


class VerifyEmailRequest(BaseModel):
    token: str


# ---------------------------------------------------------------------------
# Response schemas
# ---------------------------------------------------------------------------

class TokenResponse(BaseModel):
    """Returned after successful login/refresh (access token in body, refresh in cookie)."""
    access_token: str
    token_type: str = "bearer"


class UserPublicResponse(BaseModel):
    """Publicly safe user data included in auth responses."""
    id: uuid.UUID
    email: str
    username: str
    first_name: str | None
    last_name: str | None
    avatar_url: str | None
    role: str
    status: str
    is_verified: bool
    is_vip: bool
    vip_plan_id: str | None
    created_at: datetime
    last_login: datetime | None

    model_config = {"from_attributes": True}
