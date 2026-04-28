/**
 * frontend/src/admin/GeographicStatsPage.tsx
 * Admin geographic stats — top countries, regions, and conversion by location.
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Globe, TrendingUp } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { isAdminAuthenticated } from "../lib/auth/token";

const countryData = [
  {
    country: "United States",
    code: "US",
    visitors: 68400,
    pct: 43.5,
    conversions: 4.2,
  },
  {
    country: "United Kingdom",
    code: "GB",
    visitors: 21300,
    pct: 13.6,
    conversions: 3.8,
  },
  {
    country: "Canada",
    code: "CA",
    visitors: 14200,
    pct: 9.0,
    conversions: 3.5,
  },
  {
    country: "Australia",
    code: "AU",
    visitors: 11800,
    pct: 7.5,
    conversions: 4.0,
  },
  {
    country: "Germany",
    code: "DE",
    visitors: 8900,
    pct: 5.7,
    conversions: 2.9,
  },
  { country: "France", code: "FR", visitors: 6700, pct: 4.3, conversions: 2.6 },
  {
    country: "Netherlands",
    code: "NL",
    visitors: 4300,
    pct: 2.7,
    conversions: 3.1,
  },
  { country: "Sweden", code: "SE", visitors: 3100, pct: 2.0, conversions: 2.8 },
  { country: "Other", code: "—", visitors: 18400, pct: 11.7, conversions: 2.3 },
];

const regionData = [
  { region: "California", visitors: 18200, conversions: 4.8 },
  { region: "New York", visitors: 14500, conversions: 4.5 },
  { region: "Texas", visitors: 10300, conversions: 3.9 },
  { region: "Florida", visitors: 8700, conversions: 3.7 },
  { region: "Illinois", visitors: 6200, conversions: 3.4 },
  { region: "Washington", visitors: 5800, conversions: 4.1 },
];

const conversionByRegion = [
  { name: "US", rate: 4.2 },
  { name: "UK", rate: 3.8 },
  { name: "CA", rate: 3.5 },
  { name: "AU", rate: 4.0 },
  { name: "DE", rate: 2.9 },
  { name: "FR", rate: 2.6 },
  { name: "NL", rate: 3.1 },
  { name: "SE", rate: 2.8 },
];

export const GeographicStatsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return (
    <AdminLayout title="Geographic Stats">
      {/* Privacy Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Globe className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-300">
          Geographic data is anonymized and aggregated. No individual user
          locations are tracked or stored. All data is based on IP geolocation
          at a country/region level only.
        </p>
      </div>

      {/* Conversion by Region Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface rounded-2xl p-6 border border-white/8">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-textPrimary">
              Conversion Rate by Country
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={conversionByRegion}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#15151C",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#F8FAFC",
                }}
                formatter={(v) => [`${v ?? ""}%`, "Conversion Rate"]}
              />
              <Bar
                dataKey="rate"
                fill="#F5C451"
                radius={[6, 6, 0, 0]}
                name="Rate %"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Regions */}
        <div className="bg-surface rounded-2xl p-6 border border-white/8">
          <h2 className="text-lg font-bold text-textPrimary mb-5">
            Top US States / Regions
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-textMuted text-xs uppercase tracking-wider">
                <th className="pb-3">Region</th>
                <th className="pb-3 text-right">Visitors</th>
                <th className="pb-3 text-right">Conv. Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {regionData.map((row) => (
                <tr key={row.region}>
                  <td className="py-3 text-textPrimary">{row.region}</td>
                  <td className="py-3 text-right text-textMuted">
                    {row.visitors.toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-green-400 font-bold">
                    {row.conversions}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Country Table */}
      <div className="bg-surface rounded-2xl p-6 border border-white/8">
        <h2 className="text-lg font-bold text-textPrimary mb-5">
          Traffic by Country
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-textMuted text-xs uppercase tracking-wider">
              <th className="pb-3">Country</th>
              <th className="pb-3">Code</th>
              <th className="pb-3 text-right">Visitors</th>
              <th className="pb-3 text-right">Share</th>
              <th className="pb-3 text-right">Conv. Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {countryData.map((row) => (
              <tr key={row.country}>
                <td className="py-3 text-textPrimary font-medium">
                  {row.country}
                </td>
                <td className="py-3 text-textMuted">{row.code}</td>
                <td className="py-3 text-right text-textMuted">
                  {row.visitors.toLocaleString()}
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="text-textMuted text-xs w-10 text-right">
                      {row.pct}%
                    </span>
                  </div>
                </td>
                <td className="py-3 text-right text-green-400 font-bold">
                  {row.conversions}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
