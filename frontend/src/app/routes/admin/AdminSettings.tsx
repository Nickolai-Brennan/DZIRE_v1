import { AdminLayout } from '@/components/layout/AdminLayout';
export function AdminSettings() {
  return (
    <AdminLayout title="Settings">
      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-6"><h3 className="font-bold text-white mb-4">Site Settings</h3>
          <div className="space-y-3">
            {['Site Name','Site URL','Admin Email'].map(l=>(
              <div key={l}><label className="text-xs text-white/40 uppercase tracking-wide mb-1 block">{l}</label>
                <input defaultValue={l==='Site Name'?'DZIRE':l==='Site URL'?'https://dzire.com':'admin@dzire.com'} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-500/40"/></div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6 border border-red-500/20"><h3 className="font-bold text-red-400 mb-2">Security</h3>
          <p className="text-sm text-white/50 mb-4">Change admin credentials before deploying to production.</p>
          <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 text-sm rounded-lg hover:bg-red-500/30 transition-colors">Change Password</button>
        </div>
      </div>
    </AdminLayout>
  );
}
