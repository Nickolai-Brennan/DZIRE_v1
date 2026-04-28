"""backend/app/billing/receipts.py — Receipt helpers (stub).

Full receipt generation (PDF, email delivery) would be implemented here.
Currently provides a minimal data structure and placeholder function.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from uuid import UUID


@dataclass
class Receipt:
    invoice_id: UUID
    user_id: UUID
    amount: float
    currency: str
    paid_at: datetime
    pdf_url: Optional[str] = None


def build_receipt(invoice: object) -> Receipt:
    """Build a Receipt dataclass from an Invoice ORM instance."""
    return Receipt(
        invoice_id=invoice.id,  # type: ignore[attr-defined]
        user_id=invoice.user_id,  # type: ignore[attr-defined]
        amount=float(invoice.amount_paid),  # type: ignore[attr-defined]
        currency=invoice.currency,  # type: ignore[attr-defined]
        paid_at=invoice.created_at,  # type: ignore[attr-defined]
        pdf_url=invoice.pdf_url,  # type: ignore[attr-defined]
    )
