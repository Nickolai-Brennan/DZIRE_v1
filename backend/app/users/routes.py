"""backend/app/users/routes.py — User management API endpoints.

Routes:
  GET    /api/users/me            — current user profile
  PUT    /api/users/update        — update own profile
  GET    /api/users/list          — list all users (admin only)
  GET    /api/users/{id}          — get user by ID (admin only)
  DELETE /api/users/delete/{id}   — delete user (admin only)
"""

from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth.dependencies import get_current_user
from ..core.database import get_db
from ..models.user import User
from ..permissions.roles import Role
from . import services
from .schemas import (AdminUserUpdateRequest, UserPublicResponse,
                      UserUpdateRequest)

router = APIRouter(prefix="/api/users", tags=["users"])


def _require_admin(current_user: User) -> None:
    if current_user.role != Role.admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required."
        )


# ---------------------------------------------------------------------------
# Current user
# ---------------------------------------------------------------------------


@router.get("/me", response_model=UserPublicResponse)
async def me(current_user: User = Depends(get_current_user)) -> UserPublicResponse:
    return UserPublicResponse.model_validate(current_user)


@router.put("/update", response_model=UserPublicResponse)
async def update_me(
    body: UserUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> UserPublicResponse:
    updated = await services.update_user(
        db,
        current_user,
        first_name=body.first_name,
        last_name=body.last_name,
        avatar_url=body.avatar_url,
        username=body.username,
    )
    return UserPublicResponse.model_validate(updated)


# ---------------------------------------------------------------------------
# Admin endpoints
# ---------------------------------------------------------------------------


@router.get("/list", response_model=list[UserPublicResponse])
async def list_users(
    offset: int = 0,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[UserPublicResponse]:
    _require_admin(current_user)
    users = await services.list_users(db, offset=offset, limit=limit)
    return [UserPublicResponse.model_validate(u) for u in users]


@router.get("/{user_id}", response_model=UserPublicResponse)
async def get_user(
    user_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> UserPublicResponse:
    _require_admin(current_user)
    user = await services.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )
    return UserPublicResponse.model_validate(user)


@router.patch("/{user_id}/admin-update", response_model=UserPublicResponse)
async def admin_update(
    user_id: uuid.UUID,
    body: AdminUserUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> UserPublicResponse:
    _require_admin(current_user)
    user = await services.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )
    updated = await services.admin_update_user(
        db,
        user,
        role=body.role,
        status=body.status,
        is_vip=body.is_vip,
        vip_plan_id=body.vip_plan_id,
    )
    return UserPublicResponse.model_validate(updated)


@router.delete("/delete/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    _require_admin(current_user)
    user = await services.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )
    await services.delete_user(db, user)
