"""backend/app/payments/reconciliation.py — Stub for payment reconciliation.

Reconciliation compares local payment records against Stripe to detect
discrepancies (missing payments, duplicate records, status mismatches).
This is a minimal stub providing the data structure and entry point.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Optional
from uuid import UUID

logger = logging.getLogger(__name__)


@dataclass
class ReconciliationResult:
    """Summary of a reconciliation run."""

    checked: int = 0
    matched: int = 0
    discrepancies: list[dict] = field(default_factory=list)

    @property
    def has_discrepancies(self) -> bool:
        return bool(self.discrepancies)


async def reconcile_payments(
    *,
    user_id: Optional[UUID] = None,
    dry_run: bool = True,
) -> ReconciliationResult:
    """
    Compare local payment records against Stripe.

    Args:
        user_id: If provided, reconcile only for this user.
        dry_run: If True, log discrepancies but do not update local records.

    Returns:
        ReconciliationResult with counts and discrepancy details.
    """
    result = ReconciliationResult()
    logger.info(
        "Reconciliation run started (user_id=%s, dry_run=%s)",
        user_id,
        dry_run,
    )
    # TODO: Implement full reconciliation logic:
    # 1. Fetch all local Payment records (optionally filtered by user_id).
    # 2. For each record that has a provider_payment_id, call Stripe API to
    #    retrieve the PaymentIntent or Invoice.
    # 3. Compare status and amount.
    # 4. Log discrepancies; if not dry_run, update local records.
    logger.info(
        "Reconciliation complete: checked=%d matched=%d discrepancies=%d",
        result.checked,
        result.matched,
        len(result.discrepancies),
    )
    return result
