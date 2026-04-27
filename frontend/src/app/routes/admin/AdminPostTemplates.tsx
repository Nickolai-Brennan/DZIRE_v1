import { AdminLayout } from '@/components/layout/AdminLayout';
import { Plus, Edit2, FileText } from 'lucide-react';
const TEMPLATES = [
  { title:'Profile Spotlight', desc:'Structured creator/doll profile feature with interview sections, media placements, and platform links.', fields:['Hero Image','Creator Bio','Tagline','Vibe Tags','Spotlight Interview','Gallery Teaser','Platform Links','Featured Products'] },
  { title:'Longform Essay / Cover Story', desc:'Premium editorial cover story with pull quotes, author byline, and SEO optimization.', fields:['Headline','Author','Featured Image','Pull Quote','Body Content','Related Links','Newsletter CTA'] },
  { title:'General Article', desc:'Standard editorial article with categories, tags, and flexible body.', fields:['Title','Subtitle','Category','Tags','Body','Related Articles','SEO Fields'] },
  { title:'Toy / Product Review', desc:'Structured product review with score breakdown, pros/cons, and affiliate CTA.', fields:['Product Name','Category','Score Breakdown','Pros','Cons','Best For','Affiliate Link','Related Reviews'] },
  { title:'Position Guide', desc:'Comprehensive intimate position guide with scoring, tips, and compatibility notes.', fields:['Position Title','Category','Score Breakdown','Keywords','Tags','Related Positions','Product Recommendations'] },
  { title:'Sex Secrets / Tips', desc:'Editorial tips and advice format with numbered list, quotes, and expert notes.', fields:['Headline','Intro','Tips List','Expert Quote','Related Content','Newsletter CTA'] },
  { title:'Dictionary Term', desc:'Structured term definition with pronunciation, expanded definition, and related content.', fields:['Term','Pronunciation','Category','Short Definition','Expanded Definition','Related Terms','Related Positions'] },
];
export function AdminPostTemplates() {
  return (
    <AdminLayout title="Post Templates">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map(t=>(
          <div key={t.title} className="glass-card p-5 flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <FileText className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5"/>
              <h3 className="font-bold text-white">{t.title}</h3>
            </div>
            <p className="text-sm text-white/50 mb-4 flex-1">{t.desc}</p>
            <div className="mb-4">
              <p className="text-xs text-white/30 mb-2">Fields included:</p>
              <div className="flex flex-wrap gap-1">{t.fields.slice(0,4).map(f=><span key={f} className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-white/40 rounded-full">{f}</span>)}
                {t.fields.length>4 && <span className="text-xs text-white/30">+{t.fields.length-4} more</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-rose-500 hover:bg-rose-400 text-white text-sm font-semibold rounded-lg transition-colors"><Plus className="w-3.5 h-3.5"/>Use Template</button>
              <button className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 text-sm rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5"/></button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
