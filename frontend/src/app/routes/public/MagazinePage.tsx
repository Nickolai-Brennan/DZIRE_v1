import { PublicLayout } from '@/components/layout/PublicLayout';
import { PageHero } from '@/components/layout/PageHero';
import { mockMagazineIssues } from '@/data/mockMagazine';
import { usePageTracking } from '@/hooks/usePageTracking';
import { BookOpen } from 'lucide-react';
export function MagazinePage() {
  usePageTracking('magazine');
  const featured = mockMagazineIssues.find(i=>i.isFeatured) || mockMagazineIssues[0];
  const issues = mockMagazineIssues.filter(i=>!i.isFeatured);
  return (
    <PublicLayout>
      <PageHero eyebrow="DZIRE Publication" title="The Magazine" subtitle="Monthly editorial issues featuring creator spotlights, product guides, fiction, and lifestyle content."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* Featured issue */}
        <div className="glass-card border border-rose-500/20 overflow-hidden mb-16 flex flex-col sm:flex-row">
          <img src={featured.coverPlaceholder} alt={featured.title} className="w-full sm:w-64 object-cover"/>
          <div className="p-8 flex flex-col justify-center">
            <p className="text-rose-500 text-xs font-bold uppercase tracking-widest mb-2">Featured Launch Issue</p>
            <h2 className="text-3xl font-black text-white mb-2">{featured.title}</h2>
            <p className="text-xl text-white/40 italic mb-6">"{featured.subtitle}"</p>
            <ul className="space-y-2 mb-8">{featured.tableOfContents.map(t=><li key={t} className="flex items-center gap-2 text-sm text-white/60"><BookOpen className="w-3 h-3 text-rose-500"/>{t}</li>)}</ul>
            <button className="self-start px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-lg transition-colors">Read Issue</button>
          </div>
        </div>
        <h2 className="text-2xl font-black text-white mb-6">All Issues</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map(issue=>(
            <div key={issue.id} className="glass-card overflow-hidden flex flex-col sm:flex-row">
              <img src={issue.coverPlaceholder} alt={issue.title} className="w-full sm:w-32 object-cover aspect-[3/4] sm:aspect-auto"/>
              <div className="p-4">
                <h3 className="font-bold text-white mb-1">{issue.title}</h3>
                <p className="text-xs text-white/40 italic mb-3">"{issue.subtitle}"</p>
                <button className="text-sm text-rose-400 hover:text-rose-300 font-semibold transition-colors">Read Issue →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
