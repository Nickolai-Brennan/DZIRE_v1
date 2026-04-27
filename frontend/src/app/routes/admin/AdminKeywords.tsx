import { AdminLayout } from '@/components/layout/AdminLayout';
import { mockKeywordReports } from '@/data/mockAdminStats';
import { TrendingUp } from 'lucide-react';
export function AdminKeywords() {
  return (
    <AdminLayout title="Keyword & Tag Reports">
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">{['Keyword','Cluster','Usage Count','Ranking','Suggestions'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {mockKeywordReports.map(r=>(
              <tr key={r.id} className="border-b border-white/5 hover:bg-white/3">
                <td className="px-4 py-3 text-white font-medium">{r.keyword}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded-full">{r.cluster}</span></td>
                <td className="px-4 py-3 text-white/60">{r.usage}</td>
                <td className="px-4 py-3">{r.ranking ? <span className="flex items-center gap-1 text-green-400 font-bold"><TrendingUp className="w-3 h-3"/>#{r.ranking}</span> : <span className="text-white/30">—</span>}</td>
                <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{r.suggestions.map(s=><span key={s} className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 rounded-full">{s}</span>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
