---
name: payment-integration
description: Stripe payment integration skill for DZIRE_v1. Handles Checkout sessions, webhook verification, customer management, and payment security.
category: monetization
version: v1.0
inputs:
  - user request
  - Stripe API credentials (test mode)
outputs:
  - Stripe checkout session URL
  - Webhook event handling
  - Customer and payment records
---

# Payment Integration Skill

## Purpose

Integrate Stripe payments into DZIRE_v1 using test mode.

## Capabilities

- Create Stripe customers
- Create Checkout sessions for subscription plans
- Verify and handle webhook events
- Store local payment records (no card data)

## Usage

```python
from app.payments.services import create_checkout_session
from app.payments.schemas import CheckoutSessionRequest

req = CheckoutSessionRequest(price_id="price_...", user_id=user_id)
result = await create_checkout_session(db, user_id, email, req)
# Redirect user to result["url"]
```

## Webhook Handling

Register `POST /api/payments/webhook` as your Stripe webhook endpoint.
Use `stripe listen --forward-to localhost:8000/api/payments/webhook` for local dev.

## References

- [backend/app/payments/](../../backend/app/payments/)
- [docs/payments.md](../../docs/payments.md)
