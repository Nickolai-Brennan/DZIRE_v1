import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Eye, Save, Send } from 'lucide-react';
export function AdminPostContent() {
  const [form, setForm] = useState({ title:'',subtitle:'',slug:'',excerpt:'',category:'',tags:'',targetKeyword:'',metaTitle:'',metaDescription:'',content:'',publishStatus:'draft' });
  const setField = (k: string, v: string) => setForm(f=>({...f,[k]:v}));
  return (
    <AdminLayout title="Post Web Content">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-white">New Post</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-sm rounded-lg hover:bg-white/10 transition-colors"><Eye className="w-3.5 h-3.5"/>Preview</button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-sm rounded-lg hover:bg-white/10 transition-colors"><Save className="w-3.5 h-3.5"/>Save Draft</button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white text-sm font-semibold rounded-lg transition-colors"><Send className="w-3.5 h-3.5"/>Publish</button>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2 space-y-4">
            {[['title','Title',''],['subtitle','Subtitle',''],['slug','Slug (URL)','']].map(([k,l,ph])=>(
              <div key={k}><label className="text-xs text-white/40 uppercase tracking-wide mb-1 block">{l}</label>
                <input value={form[k as keyof typeof form]} onChange={e=>setField(k,e.target.value)} placeholder={ph} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-rose-500/40"/></div>
            ))}
            <div><label className="text-xs text-white/40 uppercase tracking-wide mb-1 block">Excerpt</label>
              <textarea value={form.excerpt} onChange={e=>setField('excerpt',e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-rose-500/40 resize-none"/></div>
            <div><label className="text-xs text-white/40 uppercase tracking-wide mb-1 block">Content (WYSIWYG placeholder)</label>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 min-h-64 text-white/30 text-sm flex items-center justify-center">
                TipTap / CKEditor 5 will be integrated here for rich text editing.
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {[['category','Category'],['tags','Tags (comma separated)'],['targetKeyword','Target Keyword'],['metaTitle','Meta Title'],['metaDescription','Meta Description']].map(([k,l])=>(
              <div key={k}><label className="text-xs text-white/40 uppercase tracking-wide mb-1 block">{l}</label>
                <input value={form[k as keyof typeof form]} onChange={e=>setField(k,e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-rose-500/40"/></div>
            ))}
            <div><label className="text-xs text-white/40 uppercase tracking-wide mb-1 block">Publish Status</label>
              <select value={form.publishStatus} onChange={e=>setField('publishStatus',e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none">
                {['draft','scheduled','published'].map(s=><option key={s} value={s} className="bg-[#1D1D26]">{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
