"""backend/app/permissions/permissions.py — Permission definitions for RBAC.

Defines all permissions and the role → permission mapping.
"""

from enum import Enum

from .roles import Role


class Permission(str, Enum):
    create_post = "create_post"
    edit_post = "edit_post"
    delete_post = "delete_post"
    publish_post = "publish_post"
    view_admin = "view_admin"
    view_analytics = "view_analytics"
    manage_affiliates = "manage_affiliates"
    manage_sponsors = "manage_sponsors"
    manage_users = "manage_users"
    manage_roles = "manage_roles"
    manage_payments = "manage_payments"
    view_vip_content = "view_vip_content"


# All permissions (convenience set)
ALL_PERMISSIONS: frozenset[Permission] = frozenset(Permission)

# Role → Permission mapping
ROLE_PERMISSIONS: dict[str, frozenset[Permission]] = {
    Role.admin: ALL_PERMISSIONS,
    Role.editor: frozenset(
        {
            Permission.create_post,
            Permission.edit_post,
            Permission.publish_post,
        }
    ),
    Role.marketing: frozenset(
        {
            Permission.view_analytics,
            Permission.manage_affiliates,
            Permission.manage_sponsors,
        }
    ),
    Role.sponsor_manager: frozenset(
        {
            Permission.manage_affiliates,
            Permission.manage_sponsors,
        }
    ),
    Role.analyst: frozenset(
        {
            Permission.view_analytics,
        }
    ),
    Role.vip: frozenset(
        {
            Permission.view_vip_content,
        }
    ),
    Role.member: frozenset(),
    Role.guest: frozenset(),
}


def get_permissions_for_role(role: str) -> frozenset[Permission]:
    """Return the set of permissions for a given role string."""
    return ROLE_PERMISSIONS.get(role, frozenset())


def has_permission(role: str, permission: Permission) -> bool:
    """Check whether a role has a specific permission."""
    return permission in get_permissions_for_role(role)
