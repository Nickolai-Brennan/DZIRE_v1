"""Step 10 — Content Calendar, Campaigns, Social Accounts, Social Posts, Social Size Chart.

Revision ID: 0004_step10_social_publishing
Revises: 0003_step8_payments
Create Date: 2026-04-28
"""

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision = "0004_step10_social_publishing"
down_revision = "0003_step8_payments"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ------------------------------------------------------------------
    # content_calendar
    # ------------------------------------------------------------------
    op.create_table(
        "content_calendar",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("title", sa.Text, nullable=False),
        sa.Column("content_type", sa.String(80), nullable=False),
        sa.Column("related_post_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("campaign_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("platform", sa.String(80), nullable=True),
        sa.Column("status", sa.String(40), nullable=False, server_default="idea"),
        sa.Column("scheduled_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("assigned_to", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("priority", sa.Integer, nullable=False, server_default="3"),
        sa.Column("notes", sa.Text, nullable=True),
        sa.Column("last_verified_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )
    op.create_index("ix_content_calendar_status", "content_calendar", ["status"])
    op.create_index(
        "ix_content_calendar_scheduled_at", "content_calendar", ["scheduled_at"]
    )
    op.create_index(
        "ix_content_calendar_campaign_id", "content_calendar", ["campaign_id"]
    )
    op.create_index("ix_content_calendar_platform", "content_calendar", ["platform"])

    # ------------------------------------------------------------------
    # campaigns
    # ------------------------------------------------------------------
    op.create_table(
        "campaigns",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("name", sa.Text, nullable=False),
        sa.Column("campaign_type", sa.String(80), nullable=False),
        sa.Column("goal", sa.Text, nullable=True),
        sa.Column("start_date", sa.Date, nullable=True),
        sa.Column("end_date", sa.Date, nullable=True),
        sa.Column("status", sa.String(40), nullable=False, server_default="draft"),
        sa.Column("budget", sa.Numeric(12, 2), nullable=True),
        sa.Column("target_platforms", postgresql.ARRAY(sa.Text), nullable=True),
        sa.Column("primary_cta", sa.String(255), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )
    op.create_index("ix_campaigns_status", "campaigns", ["status"])

    # ------------------------------------------------------------------
    # social_accounts
    # ------------------------------------------------------------------
    op.create_table(
        "social_accounts",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("platform", sa.String(80), nullable=False),
        sa.Column("account_name", sa.String(255), nullable=False),
        sa.Column("account_handle", sa.String(255), nullable=True),
        sa.Column("external_account_id", sa.String(255), nullable=True),
        sa.Column("auth_type", sa.String(80), nullable=True),
        sa.Column("access_token_encrypted", sa.Text, nullable=True),
        sa.Column("refresh_token_encrypted", sa.Text, nullable=True),
        sa.Column("webhook_url", sa.Text, nullable=True),
        sa.Column("status", sa.String(40), nullable=False, server_default="active"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )
    op.create_index("ix_social_accounts_platform", "social_accounts", ["platform"])
    op.create_index("ix_social_accounts_status", "social_accounts", ["status"])

    # ------------------------------------------------------------------
    # social_posts
    # ------------------------------------------------------------------
    op.create_table(
        "social_posts",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("platform", sa.String(80), nullable=False),
        sa.Column(
            "account_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("social_accounts.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("related_content_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("campaign_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("caption", sa.Text, nullable=True),
        sa.Column("media_url", sa.Text, nullable=True),
        sa.Column("post_url", sa.Text, nullable=True),
        sa.Column("hashtags", postgresql.ARRAY(sa.Text), nullable=True),
        sa.Column("status", sa.String(40), nullable=False, server_default="draft"),
        sa.Column("scheduled_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("external_post_id", sa.String(255), nullable=True),
        sa.Column(
            "platform_specific_data",
            postgresql.JSONB,
            nullable=False,
            server_default="{}",
        ),
        sa.Column("impressions", sa.Integer, nullable=False, server_default="0"),
        sa.Column("clicks", sa.Integer, nullable=False, server_default="0"),
        sa.Column("likes", sa.Integer, nullable=False, server_default="0"),
        sa.Column("comments", sa.Integer, nullable=False, server_default="0"),
        sa.Column("shares", sa.Integer, nullable=False, server_default="0"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )
    op.create_index("ix_social_posts_platform", "social_posts", ["platform"])
    op.create_index("ix_social_posts_status", "social_posts", ["status"])
    op.create_index("ix_social_posts_scheduled_at", "social_posts", ["scheduled_at"])
    op.create_index("ix_social_posts_account_id", "social_posts", ["account_id"])
    op.create_index("ix_social_posts_campaign_id", "social_posts", ["campaign_id"])

    # ------------------------------------------------------------------
    # social_size_chart
    # ------------------------------------------------------------------
    op.create_table(
        "social_size_chart",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("platform", sa.String(80), nullable=False),
        sa.Column("asset_type", sa.String(120), nullable=False),
        sa.Column("recommended_width", sa.Integer, nullable=False),
        sa.Column("recommended_height", sa.Integer, nullable=False),
        sa.Column("aspect_ratio", sa.String(40), nullable=True),
        sa.Column("text_limit", sa.Integer, nullable=True),
        sa.Column("caption_limit", sa.Integer, nullable=True),
        sa.Column("hashtag_limit", sa.Integer, nullable=True),
        sa.Column("safe_zone_notes", sa.Text, nullable=True),
        sa.Column("file_type", sa.String(120), nullable=True),
        sa.Column("max_file_size", sa.String(80), nullable=True),
        sa.Column("template_path", sa.Text, nullable=True),
        sa.Column("last_verified_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("status", sa.String(40), nullable=False, server_default="active"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )
    op.create_index("ix_social_size_chart_platform", "social_size_chart", ["platform"])
    op.create_index("ix_social_size_chart_status", "social_size_chart", ["status"])


def downgrade() -> None:
    op.drop_table("social_size_chart")
    op.drop_table("social_posts")
    op.drop_table("social_accounts")
    op.drop_table("campaigns")
    op.drop_table("content_calendar")
