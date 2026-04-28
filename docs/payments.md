# Payments — DZIRE_v1

Step 8 implements Stripe-based payments in **test mode**.

## Environment Variables

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_VIP_MONTHLY=price_...
STRIPE_PRICE_ID_VIP_YEARLY=price_...
FRONTEND_URL=http://localhost:5173
```

Get test keys from [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys).

## Flow

1. User visits `/subscribe` → sees plan cards.
2. Clicks **Subscribe** → POST `/api/subscriptions/subscribe` → returns Stripe Checkout URL.
3. User completes checkout on Stripe → redirected to `/checkout?checkout=success`.
4. Stripe fires `checkout.session.completed` → backend webhook activates subscription + grants VIP.

## Webhook Setup (local dev)

```bash
# Install Stripe CLI
stripe login
stripe listen --forward-to localhost:8000/api/payments/webhook
```

Copy the `whsec_...` secret printed by the CLI and set `STRIPE_WEBHOOK_SECRET`.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/payments/create-checkout-session` | Create Checkout session |
| GET | `/api/payments/methods` | List payment methods |
| GET | `/api/payments/history` | List payments |
| POST | `/api/payments/webhook` | Stripe webhook (signature verified) |

## Security

- Webhook signature is verified via `stripe.Webhook.construct_event`.
- Card data is **never** stored locally — Stripe tokens only.
- All payment endpoints should be served over HTTPS in production.
