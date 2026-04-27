import { AdminLayout } from '@/components/layout/AdminLayout';
import { mockScheduleItems } from '@/data/mockAdminStats';
import { Calendar, Plus } from 'lucide-react';
const CONTENT_TYPES = ['article','review','position guide','dictionary term','dzire doll spotlight','story','newsletter','social post','sponsor placement','vip drop'];
const PLATFORMS = ['X','Bluesky','Instagram','Threads','Reddit','TikTok','Pinterest','Email'];
export function AdminSchedule() {
  return (
    <AdminLayout title="Schedule & Social Integrations">
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white text-sm font-semibold rounded-lg transition-colors"><Plus className="w-4 h-4"/>Schedule Post</button>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {['draft','scheduled','published'].map(status=>(
          <div key={status} className="glass-card p-4">
            <h3 className="font-semibold text-white capitalize mb-3">{status}</h3>
            <div className="space-y-2">
              {mockScheduleItems.filter(i=>i.status===status).map(item=>(
                <div key={item.id} className="p-3 bg-white/5 rounded-lg">
                  <p className="text-sm text-white font-medium">{item.title}</p>
                  <p className="text-xs text-rose-400 mt-1">{item.contentType}</p>
                  <p className="text-xs text-white/30 mt-1">{new Date(item.scheduledAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="glass-card p-6 mb-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-rose-500"/>Content Types</h3>
        <div className="flex flex-wrap gap-2">{CONTENT_TYPES.map(t=><span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 text-sm rounded-full capitalize">{t}</span>)}</div>
      </div>
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Social Platform Integrations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PLATFORMS.map(p=><div key={p} className="glass-card p-3 text-center"><p className="text-white/60 text-sm">{p}</p><span className="text-xs text-white/30">Not connected</span></div>)}
        </div>
      </div>
    </AdminLayout>
  );
}
