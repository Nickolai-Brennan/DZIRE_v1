# Billing — DZIRE_v1

## Overview

The billing module provides invoice listing and access to the Stripe Customer Portal.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/billing/invoices` | List invoices for a user |
| POST | `/api/billing/portal` | Get Stripe Customer Portal URL |

## Invoice Model

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Internal invoice ID |
| user_id | UUID | User |
| provider_invoice_id | string | Stripe invoice ID |
| amount_due | decimal | Amount due in major currency unit |
| amount_paid | decimal | Amount paid |
| currency | string | ISO 4217 currency code |
| status | string | open, paid, void, uncollectible |
| invoice_url | string | Hosted invoice URL |
| pdf_url | string | Invoice PDF URL |

## Customer Portal

The Stripe Customer Portal allows users to:
- View invoices
- Update payment methods
- Cancel or change subscriptions

Call `POST /api/billing/portal` with `user_id` to get a portal session URL, then redirect the user.
