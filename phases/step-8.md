# STEP 8 — PAYMENTS + BILLING + SUBSCRIPTIONS + REVENUE SYSTEM

Step 8 integrates monetization infrastructure:
- Payments (Stripe recommended)
- Billing + invoices
- Subscription lifecycle (VIP)
- Affiliate tracking + payouts
- Sponsor revenue tracking
- Revenue dashboards + reporting
- Webhooks + reconciliation

---

## STEP 8 OBJECTIVE

Turn engagement into measurable, automated revenue.

```text
Auth + Roles
→ Payments
→ Subscriptions
→ Affiliate Tracking
→ Sponsor Revenue
→ Financial Analytics


---

STEP 8 FILE STRUCTURE ADDITIONS

backend/app/payments/
├── providers/
│   └── stripe.py
├── models.py
├── schemas.py
├── routes.py
├── services.py
├── webhooks.py
└── reconciliation.py

backend/app/billing/
├── invoices.py
├── receipts.py
└── services.py

backend/app/affiliates/
├── tracking.py
├── attribution.py
└── payouts.py

backend/app/sponsors/
├── revenue.py
└── reporting.py

frontend/src/payments/
├── CheckoutPage.tsx
├── BillingPage.tsx
├── SubscriptionPage.tsx
├── PaymentMethods.tsx

frontend/src/components/payments/
├── PricingTable.tsx
├── PlanCard.tsx
├── CheckoutForm.tsx
├── InvoiceTable.tsx
├── PaymentStatus.tsx

frontend/src/components/monetization/
├── AffiliateWidget.tsx
├── SponsorBanner.tsx
├── CouponBox.tsx

api/contracts/payments.json
api/contracts/billing.json
api/contracts/subscriptions.json

docs/payments.md
docs/billing.md
docs/subscriptions.md
docs/affiliates.md
docs/revenue.md

skills/payment-integration/
skills/subscription-manager/
skills/revenue-analytics/
skills/affiliate-tracker/

.github/agents/payments-agent.md
.github/agents/billing-agent.md
.github/agents/revenue-agent.md


---

1. PAYMENT PROVIDER

Recommended

Stripe

Supported Features

One-time payments
Subscriptions
Coupons / promo codes
Invoices
Customer portal
Webhooks
Tax handling
Multi-currency (optional)


---

2. CORE DATABASE TABLES

customers
payment_methods
payments
invoices

subscription_plans
subscriptions
subscription_events

affiliate_clicks
affiliate_conversions
affiliate_payouts

sponsor_revenue
sponsor_clicks

revenue_events


---

3. CUSTOMER MODEL

id
user_id
provider (stripe)
provider_customer_id
email
created_at


---

4. PAYMENT MODEL

id
user_id
customer_id
provider_payment_id
amount
currency
status
payment_method
description
created_at


---

5. SUBSCRIPTION PLAN MODEL

id
name
price
currency
billing_interval (monthly/yearly)
features
is_active
provider_price_id


---

6. SUBSCRIPTION MODEL

id
user_id
plan_id
provider_subscription_id
status
current_period_start
current_period_end
cancel_at_period_end
created_at
updated_at


---

7. SUBSCRIPTION STATUS

active
trialing
past_due
canceled
unpaid
incomplete


---

8. BILLING / INVOICE MODEL

id
user_id
provider_invoice_id
amount_due
amount_paid
currency
status
invoice_url
pdf_url
created_at


---

9. AFFILIATE TRACKING MODEL

id
affiliate_id
post_id
user_id
session_id
click_id
utm_source
utm_medium
utm_campaign
referrer
created_at


---

10. AFFILIATE CONVERSION MODEL

id
affiliate_click_id
order_id
amount
commission
status
created_at


---

11. SPONSOR REVENUE MODEL

id
sponsor_id
campaign_id
impressions
clicks
ctr
revenue
period_start
period_end


---

12. REVENUE EVENT MODEL

id
type (subscription, affiliate, sponsor)
source_id
amount
currency
status
created_at


---

13. PAYMENT ROUTES

/api/payments/create-intent
/api/payments/confirm
/api/payments/methods
/api/payments/webhook

/api/subscriptions/plans
/api/subscriptions/subscribe
/api/subscriptions/cancel
/api/subscriptions/upgrade
/api/subscriptions/downgrade

/api/billing/invoices
/api/billing/portal

/api/affiliates/track
/api/affiliates/conversion

/api/revenue/summary
/api/revenue/analytics


---

14. STRIPE WORKFLOW

Subscription Flow

User selects plan
→ Create customer
→ Create checkout session
→ Redirect to Stripe
→ Payment success
→ Stripe webhook fires
→ Update subscription in DB
→ Grant VIP access


---

Webhooks (CRITICAL)

invoice.payment_succeeded
invoice.payment_failed
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
checkout.session.completed


---

15. WEBHOOK HANDLER

def handle_webhook(event):
    if event.type == "checkout.session.completed":
        activate_subscription()
    elif event.type == "invoice.payment_failed":
        mark_past_due()
    elif event.type == "customer.subscription.deleted":
        revoke_access()


---

16. FRONTEND CHECKOUT FLOW

User clicks Subscribe
→ Load PricingTable
→ Select plan
→ Create checkout session
→ Redirect to Stripe
→ Return success page
→ Update UI (VIP unlocked)


---

17. PRICING TABLE

Free Plan
VIP Monthly
VIP Yearly
Enterprise (optional)

Plan Features

VIP Content Access
Ad-free experience
Exclusive content
Priority support
Early access


---

18. BILLING DASHBOARD

Features

View invoices
Download receipts
Update payment method
Cancel subscription
Upgrade/downgrade plan
View billing history


---

19. REVENUE DASHBOARD (ADMIN)

Metrics

Total Revenue
MRR (Monthly Recurring Revenue)
ARR (Annual Recurring Revenue)
Subscription Growth
Affiliate Revenue
Sponsor Revenue
Conversion Rates
Churn Rate
LTV (Lifetime Value)


---

20. AFFILIATE SYSTEM LOGIC

User clicks affiliate link
→ Track click
→ Store session + UTM
→ User converts
→ Match conversion to click
→ Calculate commission
→ Store payout record


---

21. COUPON SYSTEM

code
discount_type (percent/fixed)
value
valid_from
valid_to
max_uses
used_count
status


---

22. PAYMENT SECURITY

Never store card data
Use Stripe tokens only
Validate webhook signatures
Use HTTPS only
Protect endpoints with auth
Rate limit payment endpoints


---

23. NEW AGENTS FOR STEP 8

payments-agent

Purpose:

Integrate Stripe

Build checkout flows

Handle webhooks


billing-agent

Purpose:

Manage invoices

Build billing UI

Handle subscriptions


revenue-agent

Purpose:

Track revenue streams

Build analytics dashboards

Monitor conversions



---

24. NEW SKILLS FOR STEP 8

skills/payment-integration/
skills/subscription-manager/
skills/revenue-analytics/
skills/affiliate-tracker/


---

25. STEP 8 BUILD ORDER

1. Create payment schema
2. Create subscription schema
3. Create billing/invoice schema
4. Create affiliate tracking schema
5. Create revenue schema
6. Integrate Stripe SDK
7. Create payment routes
8. Create webhook handler
9. Build checkout flow
10. Build subscription logic
11. Build billing dashboard
12. Build revenue dashboard
13. Build affiliate tracking logic
14. Build sponsor revenue logic
15. Add docs and evals


---

26. STEP 8 TASK LIST

T-121 Create customer table
T-122 Create payment table
T-123 Create subscription plans table
T-124 Create subscriptions table
T-125 Create invoice table
T-126 Create affiliate tracking tables
T-127 Create revenue tables
T-128 Integrate Stripe SDK
T-129 Create payment routes
T-130 Create subscription routes
T-131 Create billing routes
T-132 Create webhook handler
T-133 Build checkout page
T-134 Build pricing table
T-135 Build billing dashboard
T-136 Build revenue dashboard
T-137 Build affiliate tracking logic
T-138 Build sponsor revenue tracking
T-139 Add payment security checks
T-140 Create payment docs
T-141 Run Step 8 review


---

STEP 8 COMPLETION CHECKLIST

[ ] Payments work
[ ] Stripe integrated
[ ] Subscriptions active
[ ] VIP access tied to billing
[ ] Billing dashboard working
[ ] Invoices generated
[ ] Affiliate tracking working
[ ] Sponsor revenue tracked
[ ] Revenue dashboard working
[ ] Webhooks handled correctly
[ ] Payment security enforced
[ ] Agents added
[ ] Skills added
[ ] Docs created


---

STEP 8 COMPLETION STANDARD

Step 8 is complete when the system can:

Accept payments
Manage subscriptions
Generate invoices
Track affiliate revenue
Track sponsor revenue
Display financial analytics
Automate billing lifecycle


---

NEXT STEP

Step 9 should implement search, filtering, personalization, recommendation engine, and user behavior intelligence.
