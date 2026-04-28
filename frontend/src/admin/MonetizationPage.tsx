/**
 * frontend/src/admin/MonetizationPage.tsx
 * Admin monetization dashboard — affiliate revenue, sponsorships, VIP revenue,
 * and ad impressions.
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { DollarSign, Link2, Building2, Crown, BarChart2 } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { mockMonetization } from "../data/mockAdminStats";
import { isAdminAuthenticated } from "../lib/auth/token";

const revenueTimeline = [
  { month: "Sep", affiliate: 4200, sponsorship: 2500, vip: 1800 },
  { month: "Oct", affiliate: 5100, sponsorship: 3000, vip: 2100 },
  { month: "Nov", affiliate: 6300, sponsorship: 3500, vip: 2700 },
  { month: "Dec", affiliate: 8200, sponsorship: 4800, vip: 3400 },
  { month: "Jan", affiliate: 7400, sponsorship: 4200, vip: 3100 },
  { month: "Feb", affiliate: 9100, sponsorship: 5500, vip: 3900 },
];

const affiliateClicks = [
  { name: "Lovehoney", clicks: 876 },
  { name: "Magic Wand", clicks: 543 },
  { name: "LELO", clicks: 234 },
  { name: "We-Vibe", clicks: 198 },
  { name: "Doc Johnson", clicks: 142 },
];

const totalAffiliate = mockMonetization.affiliatePartners.reduce((s, p) => s + p.revenue, 0);
const totalSponsor = mockMonetization.sponsorships.reduce((s, sp) => s + sp.monthlyRate, 0);

const METRIC_CARDS = [
  { label: "Affiliate Revenue (MTD)", value: `$${totalAffiliate.toLocaleString()}`, icon: Link2, color: "text-primary", bg: "bg-primary/10" },
  { label: "Sponsorship Revenue", value: `$${totalSponsor.toLocaleString()}`, icon: Building2, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "VIP Revenue", value: "$2,340", icon: Crown, color: "text-gold", bg: "bg-gold/10" },
  { label: "Ad Impressions", value: "184,200", icon: BarChart2, color: "text-purple-400", bg: "bg-purple-500/10" },
];

export const MonetizationPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return (
    <AdminLayout title="Monetization">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {METRIC_CARDS.map((card) => (
          <div key={card.label} className="bg-surface rounded-2xl p-5 border border-white/8">
            <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-2xl font-black text-textPrimary">{card.value}</p>
            <p className="text-xs text-textMuted mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-surface rounded-2xl p-6 border border-white/8 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <DollarSign className="w-5 h-5 text-gold" />
          <h2 className="text-lg font-bold text-textPrimary">Revenue by Channel — Last 6 Months</h2>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: "#15151C", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#F8FAFC" }}
              formatter={(v: number) => [`$${v.toLocaleString()}`]}
            />
            <Line type="monotone" dataKey="affiliate" stroke="#E11D48" strokeWidth={2} name="Affiliate" dot={{ r: 4, fill: "#E11D48" }} />
            <Line type="monotone" dataKey="sponsorship" stroke="#60A5FA" strokeWidth={2} name="Sponsorship" dot={{ r: 4, fill: "#60A5FA" }} />
            <Line type="monotone" dataKey="vip" stroke="#F5C451" strokeWidth={2} name="VIP" dot={{ r: 4, fill: "#F5C451" }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-4 justify-center">
          {[{ color: "bg-primary", label: "Affiliate" }, { color: "bg-blue-400", label: "Sponsorship" }, { color: "bg-gold", label: "VIP" }].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs text-textMuted">
              <div className={`w-3 h-1.5 rounded-full ${l.color}`} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Partners + Affiliate Clicks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Affiliate Partners Table */}
        <div className="bg-surface rounded-2xl p-6 border border-white/8">
          <h2 className="text-lg font-bold text-textPrimary mb-5">Affiliate Partners</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-textMuted text-xs uppercase tracking-wider">
                <th className="pb-3">Partner</th>
                <th className="pb-3">Category</th>
                <th className="pb-3 text-right">Clicks</th>
                <th className="pb-3 text-right">Sales</th>
                <th className="pb-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockMonetization.affiliatePartners.map((p) => (
                <tr key={p.name}>
                  <td className="py-3 text-textPrimary font-medium">{p.name}</td>
                  <td className="py-3 text-textMuted">{p.category}</td>
                  <td className="py-3 text-right text-textMuted">{p.clicks}</td>
                  <td className="py-3 text-right text-textMuted">{p.conversions}</td>
                  <td className="py-3 text-right text-gold font-bold">${p.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Affiliate Clicks Bar Chart */}
        <div className="bg-surface rounded-2xl p-6 border border-white/8">
          <h2 className="text-lg font-bold text-textPrimary mb-5">Affiliate Clicks by Partner</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={affiliateClicks}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#15151C", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#F8FAFC" }}
              />
              <Bar dataKey="clicks" fill="#E11D48" radius={[6, 6, 0, 0]} name="Clicks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sponsorships Table */}
      <div className="bg-surface rounded-2xl p-6 border border-white/8">
        <h2 className="text-lg font-bold text-textPrimary mb-5">Active Sponsorships</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-textMuted text-xs uppercase tracking-wider">
              <th className="pb-3">Sponsorship</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Monthly Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockMonetization.sponsorships.map((sp) => (
              <tr key={sp.name}>
                <td className="py-3 text-textPrimary font-medium">{sp.name}</td>
                <td className="py-3 text-textMuted">{sp.type}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${sp.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {sp.status}
                  </span>
                </td>
                <td className="py-3 text-right text-gold font-bold">${sp.monthlyRate.toLocaleString()}/mo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
