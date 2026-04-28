"""backend/app/permissions/guards.py — FastAPI dependency guards for RBAC.

Provides:
  require_admin(user)        — user must have admin role
  require_vip(user)          — user must have is_vip = True
  require_permission(perm)   — user must have the given permission
"""

from __future__ import annotations

from fastapi import Depends, HTTPException, status

from ..permissions.permissions import Permission, has_permission
from ..permissions.roles import Role


def _forbidden(detail: str) -> HTTPException:
    return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=detail)


def require_admin(user=Depends()) -> None:  # type: ignore[assignment]
    """Guard: user must have role 'admin'.

    Import and use as a FastAPI dependency after get_current_user:

        @router.get("/admin-only")
        async def endpoint(user = Depends(get_current_user)):
            require_admin(user)
    """
    if user.role != Role.admin:
        raise _forbidden("Admin access required.")
    return user


def require_vip(user) -> None:
    """Guard: user must be an active VIP subscriber."""
    if not user.is_vip:
        raise _forbidden("VIP access required.")
    return user


def require_permission(permission: Permission):
    """Guard factory: returns a callable that checks a specific permission.

    Usage:
        @router.post("/posts")
        async def create(
            user = Depends(get_current_user),
            _=Depends(require_permission(Permission.create_post)),
        ): ...
    """

    def _guard(user=Depends()) -> None:  # type: ignore[assignment]
        if not has_permission(user.role, permission):
            raise _forbidden(f"Permission '{permission}' required.")
        return user

    return _guard
