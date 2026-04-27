import { AdminLayout } from '@/components/layout/AdminLayout';
import { mockSeoReports } from '@/data/mockAdminStats';
import { CheckCircle, AlertCircle } from 'lucide-react';
export function AdminSeoReports() {
  return (
    <AdminLayout title="SEO Reports">
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">{['Page Title','Slug','Target Keyword','SEO Score','Warnings'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {mockSeoReports.map(r=>(
              <tr key={r.id} className="border-b border-white/5 hover:bg-white/3">
                <td className="px-4 py-3 text-white font-medium">{r.pageTitle}</td>
                <td className="px-4 py-3 text-white/50 font-mono text-xs">{r.slug}</td>
                <td className="px-4 py-3 text-white/60">{r.targetKeyword}</td>
                <td className="px-4 py-3"><span className={`font-bold ${r.seoScore>=80?'text-green-400':r.seoScore>=60?'text-yellow-400':'text-red-400'}`}>{r.seoScore}</span></td>
                <td className="px-4 py-3">
                  {r.warnings.length===0 ? <span className="flex items-center gap-1 text-green-400 text-xs"><CheckCircle className="w-3 h-3"/>No issues</span> :
                    <div className="flex flex-col gap-1">{r.warnings.map(w=><span key={w} className="flex items-center gap-1 text-yellow-400 text-xs"><AlertCircle className="w-3 h-3"/>{w}</span>)}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
