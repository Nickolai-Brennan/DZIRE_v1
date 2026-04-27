import { AdminLayout } from '@/components/layout/AdminLayout';
import { mockNewsletterSubscribers } from '@/data/mockAdminStats';
export function AdminNewsletter() {
  return (
    <AdminLayout title="Newsletter Users">
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">{['Email','Tier','Status','Signed Up','Opens'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {mockNewsletterSubscribers.map(s=>(
              <tr key={s.email} className="border-b border-white/5 hover:bg-white/3">
                <td className="px-4 py-3 text-white font-medium">{s.email}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${s.tier==='vip'?'bg-yellow-400/20 text-yellow-400':'bg-white/10 text-white/60'}`}>{s.tier.toUpperCase()}</span></td>
                <td className="px-4 py-3"><span className={`text-xs font-semibold ${s.status==='active'?'text-green-400':s.status==='unsubscribed'?'text-yellow-400':'text-red-400'}`}>{s.status}</span></td>
                <td className="px-4 py-3 text-white/40">{s.signedUp}</td>
                <td className="px-4 py-3 text-white/60">{s.opens}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
