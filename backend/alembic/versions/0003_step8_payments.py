"""Step 8 — Payments, Billing, Subscriptions, Affiliates tracking, Revenue tables.

Revision ID: 0003_step8_payments
Revises: 0002_step7_auth
Create Date: 2026-04-28
"""

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision = "0003_step8_payments"
down_revision = "0002_step7_auth"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ------------------------------------------------------------------
    # stripe_customers
    # ------------------------------------------------------------------
    op.create_table(
        "stripe_customers",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column(
            "user_id", postgresql.UUID(as_uuid=True), nullable=False, unique=True
        ),
        sa.Column("provider", sa.String(32), nullable=False, server_default="stripe"),
        sa.Column("provider_customer_id", sa.Text(), nullable=False, unique=True),
        sa.Column("email", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index("ix_stripe_customers_user_id", "stripe_customers", ["user_id"])

    # ------------------------------------------------------------------
    # payments
    # ------------------------------------------------------------------
    op.create_table(
        "payments",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("customer_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("provider_payment_id", sa.Text(), nullable=True),
        sa.Column("amount", sa.Numeric(12, 2), nullable=False, server_default="0"),
        sa.Column("currency", sa.String(8), nullable=False, server_default="usd"),
        sa.Column("status", sa.String(32), nullable=False, server_default="pending"),
        sa.Column("payment_method", sa.Text(), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index("ix_payments_user_id", "payments", ["user_id"])

    # ------------------------------------------------------------------
    # payment_methods
    # ------------------------------------------------------------------
    op.create_table(
        "payment_methods",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("provider_payment_method_id", sa.Text(), nullable=False),
        sa.Column("type", sa.String(32), nullable=False, server_default="card"),
        sa.Column("last4", sa.String(4), nullable=True),
        sa.Column("brand", sa.String(32), nullable=True),
        sa.Column("exp_month", sa.Integer(), nullable=True),
        sa.Column("exp_year", sa.Integer(), nullable=True),
        sa.Column(
            "is_default",
            sa.Boolean(),
            nullable=False,
            server_default="false",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index("ix_payment_methods_user_id", "payment_methods", ["user_id"])

    # ------------------------------------------------------------------
    # invoices
    # ------------------------------------------------------------------
    op.create_table(
        "invoices",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("provider_invoice_id", sa.Text(), nullable=True, unique=True),
        sa.Column(
            "amount_due",
            sa.Numeric(12, 2),
            nullable=False,
            server_default="0",
        ),
        sa.Column(
            "amount_paid",
            sa.Numeric(12, 2),
            nullable=False,
            server_default="0",
        ),
        sa.Column("currency", sa.String(8), nullable=False, server_default="usd"),
        sa.Column("status", sa.String(32), nullable=False, server_default="open"),
        sa.Column("invoice_url", sa.Text(), nullable=True),
        sa.Column("pdf_url", sa.Text(), nullable=True),
        sa.Column("period_start", sa.DateTime(timezone=True), nullable=True),
        sa.Column("period_end", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index("ix_invoices_user_id", "invoices", ["user_id"])

    # ------------------------------------------------------------------
    # revenue_events
    # ------------------------------------------------------------------
    op.create_table(
        "revenue_events",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("type", sa.String(32), nullable=False),
        sa.Column("source_id", sa.Text(), nullable=True),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("amount", sa.Numeric(12, 2), nullable=False, server_default="0"),
        sa.Column("currency", sa.String(8), nullable=False, server_default="usd"),
        sa.Column(
            "status",
            sa.String(32),
            nullable=False,
            server_default="completed",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index("ix_revenue_events_type", "revenue_events", ["type"])

    # ------------------------------------------------------------------
    # affiliate_clicks
    # ------------------------------------------------------------------
    op.create_table(
        "affiliate_clicks",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("affiliate_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("post_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("session_id", sa.Text(), nullable=True),
        sa.Column("click_id", sa.Text(), nullable=False),
        sa.Column("utm_source", sa.String(256), nullable=True),
        sa.Column("utm_medium", sa.String(256), nullable=True),
        sa.Column("utm_campaign", sa.String(256), nullable=True),
        sa.Column("referrer", sa.Text(), nullable=True),
        sa.Column("ip_address", sa.String(45), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index(
        "ix_affiliate_clicks_affiliate_id",
        "affiliate_clicks",
        ["affiliate_id"],
    )

    # ------------------------------------------------------------------
    # affiliate_conversions
    # ------------------------------------------------------------------
    op.create_table(
        "affiliate_conversions",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column(
            "affiliate_click_id",
            postgresql.UUID(as_uuid=True),
            nullable=True,
        ),
        sa.Column("order_id", sa.Text(), nullable=True),
        sa.Column("amount", sa.Numeric(12, 2), nullable=False, server_default="0"),
        sa.Column(
            "commission",
            sa.Numeric(12, 2),
            nullable=False,
            server_default="0",
        ),
        sa.Column(
            "status",
            sa.String(32),
            nullable=False,
            server_default="pending",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )

    # ------------------------------------------------------------------
    # affiliate_payouts
    # ------------------------------------------------------------------
    op.create_table(
        "affiliate_payouts",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("affiliate_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("amount", sa.Numeric(12, 2), nullable=False),
        sa.Column("currency", sa.String(8), nullable=False, server_default="usd"),
        sa.Column(
            "status",
            sa.String(32),
            nullable=False,
            server_default="pending",
        ),
        sa.Column("method", sa.String(64), nullable=True),
        sa.Column("reference", sa.Text(), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("paid_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )

    # ------------------------------------------------------------------
    # sponsor_revenue
    # ------------------------------------------------------------------
    op.create_table(
        "sponsor_revenue",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("sponsor_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("campaign_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("impressions", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("clicks", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("ctr", sa.Numeric(5, 4), nullable=True),
        sa.Column("revenue", sa.Numeric(12, 2), nullable=False, server_default="0"),
        sa.Column("period_start", sa.Date(), nullable=True),
        sa.Column("period_end", sa.Date(), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index(
        "ix_sponsor_revenue_sponsor_id",
        "sponsor_revenue",
        ["sponsor_id"],
    )

    # ------------------------------------------------------------------
    # sponsor_clicks
    # ------------------------------------------------------------------
    op.create_table(
        "sponsor_clicks",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("sponsor_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("campaign_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("ip_address", sa.String(45), nullable=True),
        sa.Column("referrer", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )

    # ------------------------------------------------------------------
    # Extend vip_subscriptions — add provider_price_id column
    # ------------------------------------------------------------------
    op.add_column(
        "vip_subscriptions",
        sa.Column("provider_price_id", sa.Text(), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("vip_subscriptions", "provider_price_id")
    op.drop_table("sponsor_clicks")
    op.drop_index("ix_sponsor_revenue_sponsor_id", "sponsor_revenue")
    op.drop_table("sponsor_revenue")
    op.drop_table("affiliate_payouts")
    op.drop_table("affiliate_conversions")
    op.drop_index("ix_affiliate_clicks_affiliate_id", "affiliate_clicks")
    op.drop_table("affiliate_clicks")
    op.drop_index("ix_revenue_events_type", "revenue_events")
    op.drop_table("revenue_events")
    op.drop_index("ix_invoices_user_id", "invoices")
    op.drop_table("invoices")
    op.drop_index("ix_payment_methods_user_id", "payment_methods")
    op.drop_table("payment_methods")
    op.drop_index("ix_payments_user_id", "payments")
    op.drop_table("payments")
    op.drop_index("ix_stripe_customers_user_id", "stripe_customers")
    op.drop_table("stripe_customers")
