"""backend/app/api/routes/admin_auth.py — Admin auth endpoints.

Endpoints:
  POST /api/admin/login   — return JWT access token
  POST /api/admin/logout  — no-op for MVP (JWT logout is client-side)
  GET  /api/admin/me      — return current admin user
"""

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from ...auth.jwt import create_admin_access_token
from ...core.config import get_settings
from ...core.database import get_db
from ...models.admin_login_attempt import AdminLoginAttempt
from ...models.admin_user import AdminUser
from ...schemas.admin_auth import (AdminLoginRequest, AdminTokenResponse,
                                   AdminUserResponse)
from ...services.admin_service import authenticate_admin
from ..deps import require_admin

router = APIRouter(prefix="/api/admin", tags=["admin-auth"])
settings = get_settings()


@router.post("/login", response_model=AdminTokenResponse)
async def admin_login(
    body: AdminLoginRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> AdminTokenResponse:
    """Authenticate an admin user and return a JWT access token."""
    ip = request.client.host if request.client else None
    admin = await authenticate_admin(db, body.username, body.password)

    attempt = AdminLoginAttempt(
        username=body.username,
        ip=ip,
        success=admin is not None,
    )
    db.add(attempt)
    await db.commit()

    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials",
        )

    token = create_admin_access_token(admin.id)
    return AdminTokenResponse(
        access_token=token,
        expires_in=settings.access_token_expire_minutes * 60,
    )


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def admin_logout() -> None:
    """Logout — MVP no-op.

    JWT tokens are stateless; the client should discard the token.
    For production, implement a token blacklist or use short expiry + refresh tokens.
    """


@router.get("/me", response_model=AdminUserResponse)
async def admin_me(
    current_admin: AdminUser = Depends(require_admin),
) -> AdminUserResponse:
    """Return the currently authenticated admin user."""
    return AdminUserResponse(
        id=current_admin.id,
        username=current_admin.username,
        role=current_admin.role_obj.name,
        is_active=current_admin.is_active,
        created_at=current_admin.created_at,
    )
