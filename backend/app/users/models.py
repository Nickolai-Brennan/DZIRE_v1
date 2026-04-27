"""backend/app/users/models.py — Re-exports the User ORM model.

The User model lives in app.models.user to preserve the existing migration
history. This module re-exports it so the users package has a consistent API.
"""
from ..models.user import User  # noqa: F401
