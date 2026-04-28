---
name: billing-agent
description: >
  Billing and invoice management agent for DZIRE_v1.
  Use when working on invoices, billing history, Stripe Customer Portal,
  or subscription management UI.
category: monetization
version: v1.0
inputs:
  - user request
  - existing backend/app/billing/ structure
  - Stripe billing API documentation
outputs:
  - Billing route files
  - Invoice sync logic
  - Stripe portal integration
  - Frontend billing components
---

# Billing Agent

## Responsibilities

- Manage invoice records (`invoices` table)
- Sync invoices from Stripe on demand
- Create Stripe Customer Portal sessions
- Build and maintain billing UI (BillingPage, InvoiceTable)

## Key Files

```
backend/app/billing/
├── invoices.py    # Invoice ORM model
├── receipts.py    # Receipt helpers
├── services.py    # Billing business logic
└── routes.py      # /api/billing/invoices, /api/billing/portal

frontend/src/payments/
├── BillingPage.tsx       # Billing dashboard
frontend/src/components/payments/
├── InvoiceTable.tsx      # Invoice list component
```

## Endpoints

| Path | Description |
|------|-------------|
| `GET /api/billing/invoices` | List user invoices |
| `POST /api/billing/portal` | Get Customer Portal URL |

## Notes

- Invoices are created/updated by webhook events (`invoice.payment_succeeded`).
- The Customer Portal allows users to manage subscriptions, payment methods, and download invoices.
