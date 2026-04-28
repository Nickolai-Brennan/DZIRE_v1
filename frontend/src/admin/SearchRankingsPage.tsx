/**
 * frontend/src/admin/SearchRankingsPage.tsx
 * Admin search rankings — keyword positions, rank movement, winners/losers,
 * and content needing SEO updates.
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { isAdminAuthenticated } from "../lib/auth/token";

interface KeywordRanking {
  keyword: string;
  page: string;
  position: number;
  prevPosition: number;
  searchVolume: number;
  clicks: number;
  impressions: number;
}

const keywords: KeywordRanking[] = [
  { keyword: "intimate positions guide", page: "/positions", position: 3, prevPosition: 5, searchVolume: 14400, clicks: 1840, impressions: 31200 },
  { keyword: "best vibrators 2024", page: "/reviews", position: 7, prevPosition: 9, searchVolume: 22000, clicks: 2100, impressions: 48000 },
  { keyword: "missionary position tips", page: "/positions/classic-missionary", position: 2, prevPosition: 2, searchVolume: 8800, clicks: 980, impressions: 19800 },
  { keyword: "aftercare definition", page: "/dictionary/aftercare", position: 1, prevPosition: 3, searchVolume: 3200, clicks: 720, impressions: 9400 },
  { keyword: "adult product reviews", page: "/reviews", position: 12, prevPosition: 8, searchVolume: 18600, clicks: 840, impressions: 34500 },
  { keyword: "DZIRE dolls", page: "/dzire-dolls", position: 4, prevPosition: 6, searchVolume: 1200, clicks: 340, impressions: 4800 },
  { keyword: "digital intimacy essay", page: "/magazine", position: 15, prevPosition: 22, searchVolume: 2800, clicks: 180, impressions: 6200 },
  { keyword: "beginner sex positions", page: "/positions?filter=Beginner", position: 5, prevPosition: 4, searchVolume: 31000, clicks: 3200, impressions: 72000 },
  { keyword: "couple connection tips", page: "/magazine", position: 19, prevPosition: 18, searchVolume: 9400, clicks: 420, impressions: 18700 },
  { keyword: "consent meaning", page: "/dictionary/consent", position: 8, prevPosition: 11, searchVolume: 12000, clicks: 1100, impressions: 26400 },
];

const getMovement = (current: number, prev: number) => {
  const diff = prev - current;
  if (diff > 0) return { icon: TrendingUp, color: "text-green-400", label: `+${diff}` };
  if (diff < 0) return { icon: TrendingDown, color: "text-red-400", label: `${diff}` };
  return { icon: Minus, color: "text-textMuted", label: "—" };
};

const getPositionColor = (pos: number) => {
  if (pos <= 3) return "text-gold font-black";
  if (pos <= 10) return "text-green-400 font-bold";
  return "text-textMuted";
};

const contentNeedingUpdate = [
  { page: "/magazine/modern-desire", keyword: "digital intimacy", score: 58, issue: "Word count too low, missing H2 tags" },
  { page: "/positions?filter=Beginner", keyword: "beginner sex positions", score: 64, issue: "Title tag too long, meta description missing" },
  { page: "/reviews", keyword: "adult product reviews", issue: "Rank dropped from #8 to #12 — needs fresh content", score: 61 },
  { page: "/magazine", keyword: "couple connection tips", issue: "Low click-through rate — improve title/meta", score: 55 },
];

const INTEGRATIONS = ["Google Search Console", "Semrush", "Ahrefs", "DataForSEO"];

export const SearchRankingsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const winners = keywords.filter((k) => k.prevPosition - k.position > 0).sort((a, b) => (b.prevPosition - b.position) - (a.prevPosition - a.position)).slice(0, 3);
  const losers = keywords.filter((k) => k.prevPosition - k.position < 0).sort((a, b) => (a.prevPosition - a.position) - (b.prevPosition - b.position)).slice(0, 3);

  return (
    <AdminLayout title="Search Rankings">
      {/* Winners & Losers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Winners */}
        <div className="bg-surface rounded-2xl p-6 border border-green-500/20">
          <h2 className="text-base font-bold text-green-400 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> Top Movers (Rising)
          </h2>
          <div className="space-y-3">
            {winners.map((k) => {
              const mv = getMovement(k.position, k.prevPosition);
              return (
                <div key={k.keyword} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-textPrimary font-medium">{k.keyword}</p>
                    <p className="text-xs text-textMuted">{k.page}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-sm font-black ${getPositionColor(k.position)}`}>#{k.position}</span>
                    <span className={`flex items-center gap-1 text-xs font-bold ${mv.color}`}>
                      <mv.icon className="w-3 h-3" />{mv.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Losers */}
        <div className="bg-surface rounded-2xl p-6 border border-red-500/20">
          <h2 className="text-base font-bold text-red-400 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5" /> Needs Attention (Falling)
          </h2>
          <div className="space-y-3">
            {losers.map((k) => {
              const mv = getMovement(k.position, k.prevPosition);
              return (
                <div key={k.keyword} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-textPrimary font-medium">{k.keyword}</p>
                    <p className="text-xs text-textMuted">{k.page}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-sm font-black ${getPositionColor(k.position)}`}>#{k.position}</span>
                    <span className={`flex items-center gap-1 text-xs font-bold ${mv.color}`}>
                      <mv.icon className="w-3 h-3" />{mv.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full Rankings Table */}
      <div className="bg-surface rounded-2xl p-6 border border-white/8 mb-8">
        <h2 className="text-lg font-bold text-textPrimary mb-5">Keyword Rankings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-textMuted text-xs uppercase tracking-wider">
                <th className="pb-3">Keyword</th>
                <th className="pb-3">Page</th>
                <th className="pb-3 text-center">Position</th>
                <th className="pb-3 text-center">Change</th>
                <th className="pb-3 text-right">Volume</th>
                <th className="pb-3 text-right">Clicks</th>
                <th className="pb-3 text-right">Impressions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {keywords.map((k) => {
                const mv = getMovement(k.position, k.prevPosition);
                return (
                  <tr key={k.keyword}>
                    <td className="py-3 text-textPrimary font-medium">{k.keyword}</td>
                    <td className="py-3 text-xs text-textMuted font-mono truncate max-w-[160px]">{k.page}</td>
                    <td className="py-3 text-center">
                      <span className={`text-base font-black ${getPositionColor(k.position)}`}>#{k.position}</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`flex items-center justify-center gap-1 text-xs font-bold ${mv.color}`}>
                        <mv.icon className="w-3 h-3" />{mv.label}
                      </span>
                    </td>
                    <td className="py-3 text-right text-textMuted">{k.searchVolume.toLocaleString()}</td>
                    <td className="py-3 text-right text-primary font-medium">{k.clicks.toLocaleString()}</td>
                    <td className="py-3 text-right text-textMuted">{k.impressions.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Needing Update */}
      <div className="bg-surface rounded-2xl p-6 border border-white/8 mb-8">
        <h2 className="text-lg font-bold text-textPrimary mb-5">Content Needing Update</h2>
        <div className="space-y-4">
          {contentNeedingUpdate.map((item) => (
            <div key={item.page} className="flex items-start gap-4 bg-surfaceAlt rounded-xl p-4 border border-white/8">
              <div className="flex-1">
                <p className="font-medium text-textPrimary text-sm">{item.keyword}</p>
                <p className="text-xs text-textMuted font-mono">{item.page}</p>
                <p className="text-xs text-yellow-400 mt-1">{item.issue}</p>
              </div>
              <div className="text-center shrink-0">
                <p className={`text-xl font-black ${item.score >= 65 ? "text-yellow-400" : "text-red-400"}`}>{item.score}</p>
                <p className="text-xs text-textMuted">SEO Score</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Placeholders */}
      <div className="bg-surface rounded-2xl p-6 border border-white/8">
        <h2 className="text-lg font-bold text-textPrimary mb-3">Data Source Integrations</h2>
        <p className="text-sm text-textMuted mb-5">Connect these tools to pull live ranking data automatically.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INTEGRATIONS.map((name) => (
            <div
              key={name}
              className="bg-surfaceAlt rounded-xl p-4 border border-white/8 text-center cursor-pointer hover:border-primary/40 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-textMuted mx-auto mb-2" />
              <p className="text-sm text-textPrimary font-medium">{name}</p>
              <p className="text-xs text-textMuted mt-1">Not connected</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
