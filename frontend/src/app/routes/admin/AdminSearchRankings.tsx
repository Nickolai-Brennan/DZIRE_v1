import { AdminLayout } from '@/components/layout/AdminLayout';
import { mockKeywordReports } from '@/data/mockAdminStats';
import { TrendingUp, TrendingDown } from 'lucide-react';
export function AdminSearchRankings() {
  return (
    <AdminLayout title="Search Rankings">
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="border-b border-white/10">{['Keyword','Cluster','Current Rank','Change','Search Volume'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody>{mockKeywordReports.map(r=><tr key={r.id} className="border-b border-white/5 hover:bg-white/3">
            <td className="px-4 py-3 text-white font-medium">{r.keyword}</td>
            <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded-full">{r.cluster}</span></td>
            <td className="px-4 py-3 text-white font-bold">#{r.ranking || '—'}</td>
            <td className="px-4 py-3"><span className="flex items-center gap-1 text-green-400 text-xs"><TrendingUp className="w-3 h-3"/>+2</span></td>
            <td className="px-4 py-3 text-white/60">{(r.usage * 42).toLocaleString()}/mo</td>
          </tr>)}</tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
