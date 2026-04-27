"""Step 7 — Extend users table + add audit_logs table.

Revision ID: 0002_step7_auth
Revises: 0001_initial
Create Date: 2026-04-27
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0002_step7_auth"
down_revision = "0001_initial"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Extend users table with new columns
    op.add_column("users", sa.Column("first_name", sa.String(128), nullable=True))
    op.add_column("users", sa.Column("last_name", sa.String(128), nullable=True))
    op.add_column("users", sa.Column("avatar_url", sa.String(512), nullable=True))
    op.add_column(
        "users",
        sa.Column("status", sa.String(32), nullable=False, server_default="active"),
    )
    op.add_column(
        "users",
        sa.Column("is_verified", sa.Boolean(), nullable=False, server_default="false"),
    )
    op.add_column(
        "users",
        sa.Column("is_vip", sa.Boolean(), nullable=False, server_default="false"),
    )
    op.add_column("users", sa.Column("vip_plan_id", sa.String(128), nullable=True))
    op.add_column("users", sa.Column("email_verify_token", sa.String(256), nullable=True))
    op.add_column("users", sa.Column("password_reset_token", sa.String(256), nullable=True))
    op.add_column(
        "users",
        sa.Column("password_reset_expires", sa.DateTime(timezone=True), nullable=True),
    )
    op.add_column(
        "users",
        sa.Column("last_login", sa.DateTime(timezone=True), nullable=True),
    )

    # Create audit_logs table
    op.create_table(
        "audit_logs",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("actor_id", sa.String(128), nullable=True),
        sa.Column("event", sa.String(128), nullable=False),
        sa.Column("target_id", sa.String(128), nullable=True),
        sa.Column("detail", sa.Text(), nullable=True),
        sa.Column("ip", sa.String(45), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index("ix_audit_logs_actor_id", "audit_logs", ["actor_id"])
    op.create_index("ix_audit_logs_event", "audit_logs", ["event"])


def downgrade() -> None:
    op.drop_index("ix_audit_logs_event", "audit_logs")
    op.drop_index("ix_audit_logs_actor_id", "audit_logs")
    op.drop_table("audit_logs")

    op.drop_column("users", "last_login")
    op.drop_column("users", "password_reset_expires")
    op.drop_column("users", "password_reset_token")
    op.drop_column("users", "email_verify_token")
    op.drop_column("users", "vip_plan_id")
    op.drop_column("users", "is_vip")
    op.drop_column("users", "is_verified")
    op.drop_column("users", "status")
    op.drop_column("users", "avatar_url")
    op.drop_column("users", "last_name")
    op.drop_column("users", "first_name")
