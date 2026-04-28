"""backend/app/affiliates/attribution.py — Click-to-conversion attribution logic."""

from __future__ import annotations

from typing import Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .tracking import AffiliateClick, AffiliateConversion


async def find_click_for_session(
    db: AsyncSession,
    session_id: str,
) -> Optional[AffiliateClick]:
    """Return the most recent click for a given session."""
    result = await db.execute(
        select(AffiliateClick)
        .where(AffiliateClick.session_id == session_id)
        .order_by(AffiliateClick.created_at.desc())
        .limit(1)
    )
    return result.scalar_one_or_none()


async def attribute_conversion(
    db: AsyncSession,
    *,
    session_id: Optional[str],
    click_id: Optional[UUID],
    order_id: Optional[str],
    amount: float,
    commission_rate: float = 0.10,
) -> AffiliateConversion:
    """Create a conversion record, linked to the originating click if found."""
    resolved_click_id: Optional[UUID] = click_id
    if not resolved_click_id and session_id:
        click = await find_click_for_session(db, session_id)
        if click:
            resolved_click_id = click.id

    commission = round(amount * commission_rate, 2)
    conversion = AffiliateConversion(
        affiliate_click_id=resolved_click_id,
        order_id=order_id,
        amount=amount,
        commission=commission,
        status="pending",
    )
    db.add(conversion)
    await db.commit()
    await db.refresh(conversion)
    return conversion
