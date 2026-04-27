"""backend/app/permissions/roles.py — Role definitions for RBAC.

Defines all user-facing roles for the DZIRE platform.
"""
from enum import Enum


class Role(str, Enum):
    admin = "admin"
    editor = "editor"
    marketing = "marketing"
    sponsor_manager = "sponsor_manager"
    analyst = "analyst"
    member = "member"
    vip = "vip"
    guest = "guest"


# Human-readable descriptions
ROLE_DESCRIPTIONS: dict[str, str] = {
    Role.admin: "Full system access",
    Role.editor: "Content creation and editing",
    Role.marketing: "Campaigns, SEO, newsletter",
    Role.sponsor_manager: "Sponsors and affiliates",
    Role.analyst: "Dashboards only",
    Role.member: "Registered user",
    Role.vip: "Premium subscriber",
    Role.guest: "Not logged in",
}
