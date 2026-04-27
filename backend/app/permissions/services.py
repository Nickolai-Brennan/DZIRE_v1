"""backend/app/permissions/services.py — Permission lookup services."""
from __future__ import annotations

from .permissions import Permission, get_permissions_for_role
from .roles import Role, ROLE_DESCRIPTIONS


def get_role_summary() -> list[dict]:
    """Return a list of roles with their permissions — useful for admin UIs."""
    return [
        {
            "role": role.value,
            "description": ROLE_DESCRIPTIONS.get(role, ""),
            "permissions": [p.value for p in get_permissions_for_role(role)],
        }
        for role in Role
    ]


def user_can(role: str, permission: str) -> bool:
    """Check if a role string has the given permission string."""
    try:
        perm = Permission(permission)
    except ValueError:
        return False
    return perm in get_permissions_for_role(role)
