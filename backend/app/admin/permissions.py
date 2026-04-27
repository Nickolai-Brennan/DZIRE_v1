"""backend/app/admin/permissions.py — Role-based access control for admin endpoints."""
from __future__ import annotations
from typing import Callable

from fastapi import Depends, HTTPException, status

from ..api.deps import require_admin
from ..models.admin_user import AdminUser


def _role_checker(allowed_roles: list[str]) -> Callable:
    async def check(admin: AdminUser = Depends(require_admin)) -> AdminUser:
        role_name = admin.role_obj.name if admin.role_obj else ""
        if role_name not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role '{role_name}' is not authorized for this endpoint.",
            )
        return admin
    return check


# Pre-built dependency guards per role group
require_role_admin = _role_checker(["admin"])
require_role_content = _role_checker(["admin", "editor"])
require_role_marketing = _role_checker(["admin", "marketing"])
require_role_sponsor = _role_checker(["admin", "sponsor_manager"])
require_role_analyst = _role_checker(["admin", "marketing", "analyst"])
require_role_any_admin = _role_checker(["admin", "editor", "marketing", "sponsor_manager", "analyst", "viewer"])
