"""Initial schema — users, admin_roles, admin_users, admin_login_attempts.

Revision ID: 0001_initial
Revises:
Create Date: 2026-04-27 07:22:19
"""

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers
revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # users table (existing public user model)
    op.create_table(
        "users",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("username", sa.String(), nullable=False),
        sa.Column("hashed_password", sa.String(), nullable=False),
        sa.Column("role", sa.String(), nullable=False, server_default="member"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.UniqueConstraint("email"),
        sa.UniqueConstraint("username"),
    )
    op.create_index("ix_users_email", "users", ["email"])
    op.create_index("ix_users_username", "users", ["username"])

    # admin_roles
    op.create_table(
        "admin_roles",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("name", sa.String(64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.UniqueConstraint("name"),
    )
    op.create_index("ix_admin_roles_name", "admin_roles", ["name"])

    # Seed super_admin role
    op.execute("INSERT INTO admin_roles (name) VALUES ('super_admin')")

    # admin_users
    op.create_table(
        "admin_users",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("username", sa.String(64), nullable=False),
        sa.Column("password_hash", sa.String(256), nullable=False),
        sa.Column(
            "role_id",
            sa.Integer(),
            sa.ForeignKey("admin_roles.id"),
            nullable=False,
        ),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.UniqueConstraint("username"),
    )
    op.create_index("ix_admin_users_username", "admin_users", ["username"])

    # admin_login_attempts
    op.create_table(
        "admin_login_attempts",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("username", sa.String(64), nullable=False),
        sa.Column("ip", sa.String(45), nullable=True),
        sa.Column("success", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index(
        "ix_admin_login_attempts_username", "admin_login_attempts", ["username"]
    )


def downgrade() -> None:
    op.drop_index("ix_admin_login_attempts_username", "admin_login_attempts")
    op.drop_table("admin_login_attempts")
    op.drop_index("ix_admin_users_username", "admin_users")
    op.drop_table("admin_users")
    op.drop_index("ix_admin_roles_name", "admin_roles")
    op.drop_table("admin_roles")
    op.drop_index("ix_users_username", "users")
    op.drop_index("ix_users_email", "users")
    op.drop_table("users")
