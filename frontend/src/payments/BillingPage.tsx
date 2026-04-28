/**
 * frontend/src/payments/BillingPage.tsx
 * Billing dashboard — shows invoices and customer portal link.
 */
import React, { useEffect, useState } from "react";
import { InvoiceTable } from "../components/payments/InvoiceTable";

interface Invoice {
  id: string;
  provider_invoice_id?: string;
  amount_due: number;
  amount_paid: number;
  currency: string;
  status: string;
  invoice_url?: string;
  pdf_url?: string;
}

export const BillingPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  const userId = localStorage.getItem("user_id") ?? "";

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/billing/invoices?user_id=${userId}`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setInvoices)
      .catch(() => setInvoices([]))
      .finally(() => setLoading(false));
  }, [userId]);

  const openPortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      if (!res.ok) throw new Error("Portal unavailable");
      const { url } = await res.json();
      window.open(url, "_blank", "noopener");
    } catch {
      alert("Unable to open billing portal. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-textPrimary">Billing</h1>
        <button
          onClick={openPortal}
          disabled={portalLoading}
          className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {portalLoading ? "Opening…" : "Manage Billing"}
        </button>
      </div>

      {loading ? (
        <p className="text-textMuted">Loading invoices…</p>
      ) : invoices.length === 0 ? (
        <p className="text-textMuted italic">No invoices found.</p>
      ) : (
        <InvoiceTable invoices={invoices} />
      )}
    </div>
  );
};
