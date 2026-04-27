import { AdminLayout } from '@/components/layout/AdminLayout';
import { mockKeywordReports } from '@/data/mockAdminStats';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
export function AdminKeywords() {
  return (
    <AdminLayout title="Keyword & Tag Reports">
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">{['Keyword','Rank','Volume','Change'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {mockKeywordReports.map(r=>(
              <tr key={r.keyword} className="border-b border-white/5 hover:bg-white/3">
                <td className="px-4 py-3 text-white font-medium">{r.keyword}</td>
                <td className="px-4 py-3 text-white/60">#{r.rank}</td>
                <td className="px-4 py-3 text-white/60">{r.volume.toLocaleString()}</td>
                <td className="px-4 py-3">
                  {r.change > 0 ? <span className="flex items-center gap-1 text-green-400 font-bold"><TrendingUp className="w-3 h-3"/>+{r.change}</span>
                  : r.change < 0 ? <span className="flex items-center gap-1 text-red-400 font-bold"><TrendingDown className="w-3 h-3"/>{r.change}</span>
                  : <span className="flex items-center gap-1 text-white/30"><Minus className="w-3 h-3"/>0</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
