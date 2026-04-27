import { AdminLayout } from '@/components/layout/AdminLayout';
import { mockDolls } from '@/data/mockDolls';
import { Plus, Edit2, Star, BarChart2 } from 'lucide-react';
export function AdminDolls() {
  return (
    <AdminLayout title="DZIRE Dolls Admin">
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white text-sm font-semibold rounded-lg transition-colors"><Plus className="w-4 h-4"/>Create Profile</button>
      </div>
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="border-b border-white/10">{['Creator','Sponsored','Featured','Profile Views','Platforms','Actions'].map(h=><th key={h} className="text-left px-4 py-3 text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody>{mockDolls.map(d=>(
            <tr key={d.id} className="border-b border-white/5 hover:bg-white/3">
              <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={d.image} alt={d.name} className="w-8 h-8 rounded-full object-cover"/><span className="text-white font-medium">{d.name}</span></div></td>
              <td className="px-4 py-3">{d.isSponsored ? <Star className="w-4 h-4 text-yellow-400"/> : <span className="text-white/20">—</span>}</td>
              <td className="px-4 py-3">{d.isFeatured ? <span className="text-xs text-rose-400 font-semibold">Yes</span> : <span className="text-white/20">—</span>}</td>
              <td className="px-4 py-3 text-white/60">{(Math.floor(Math.random()*5000)+1000).toLocaleString()}</td>
              <td className="px-4 py-3 text-white/60">{d.platforms.length}</td>
              <td className="px-4 py-3"><div className="flex items-center gap-2">
                <button className="text-white/40 hover:text-white" aria-label="Edit"><Edit2 className="w-3.5 h-3.5"/></button>
                <button className="text-white/40 hover:text-white" aria-label="Stats"><BarChart2 className="w-3.5 h-3.5"/></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
