import { Link } from 'react-router-dom';
import type { Story } from '@/data/types';
import { BookOpen } from 'lucide-react';
interface Props { story: Story; }
export function StoryCard({ story }: Props) {
  return (
    <div className="glass-card overflow-hidden flex flex-col">
      <div className="aspect-video bg-[#1D1D26] relative">
        <img src={story.image} alt={story.title} className="w-full h-full object-cover opacity-80"/>
        <div className="absolute top-2 left-2 text-xs px-2 py-1 bg-black/60 text-white/70 rounded-full">{story.category}</div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-1">{story.title}</h3>
        <p className="text-sm text-white/40 mb-2">by {story.author}</p>
        <p className="text-sm text-white/50 mb-4 flex-1">{story.excerpt}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-white/40 text-xs"><BookOpen className="w-3 h-3"/>{story.readingTime} min read</div>
          <div className="flex flex-wrap gap-1">{story.tags.slice(0,2).map(t=><span key={t} className="text-xs px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/40 rounded-full">{t}</span>)}</div>
        </div>
        <Link to={`/stories/${story.slug}`} className="text-center py-2 bg-rose-500 hover:bg-rose-400 text-white text-sm font-semibold rounded-lg transition-colors">Read Story</Link>
      </div>
    </div>
  );
}
