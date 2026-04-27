import { AdminLayout } from '@/components/layout/AdminLayout';
import { mockNewsletterSubscribers } from '@/data/mockAdminStats';
export function AdminNewsletter() {
  return (
    <AdminLayout title="Newsletter Users">
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10">{['Name','Email','Interests','Source','Status','Joined'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {mockNewsletterSubscribers.map(s=>(
              <tr key={s.id} className="border-b border-white/5 hover:bg-white/3">
                <td className="px-4 py-3 text-white font-medium">{s.firstName}</td>
                <td className="px-4 py-3 text-white/60">{s.email}</td>
                <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{s.interests.map(i=><span key={i} className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 rounded-full">{i}</span>)}</div></td>
                <td className="px-4 py-3 text-white/50">{s.signupSource}</td>
                <td className="px-4 py-3"><span className={`text-xs font-semibold ${s.status==='active'?'text-green-400':s.status==='unsubscribed'?'text-yellow-400':'text-red-400'}`}>{s.status}</span></td>
                <td className="px-4 py-3 text-white/40">{new Date(s.joinedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
