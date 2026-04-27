"""backend/app/users/schemas.py — Pydantic v2 schemas for user CRUD endpoints."""

from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class UserPublicResponse(BaseModel):
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


class UserUpdateRequest(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    avatar_url: str | None = Field(default=None, max_length=512)
    username: str | None = Field(default=None, min_length=3, max_length=64)


class AdminUserUpdateRequest(BaseModel):
    role: str | None = None
    status: str | None = None
    is_vip: bool | None = None
    vip_plan_id: str | None = None
