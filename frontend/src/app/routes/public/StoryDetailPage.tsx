import { mockStories } from '@/data/mockStories';
import { StoryCard } from '@/components/cards/StoryCard';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { usePageTracking } from '@/hooks/usePageTracking';
import { BookOpen } from 'lucide-react';
interface Props { slug: string; }
export function StoryDetailPage({ slug }: Props) {
  usePageTracking(`story-${slug}`);
  const story = mockStories.find(s => s.slug === slug) || mockStories[0];
  const related = mockStories.filter(s => s.id !== story.id).slice(0,3);
  const author = { name: story.author, bio:'A DZIRE contributing author specializing in romantic and literary fiction.' };
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <span className="text-xs text-rose-500 uppercase tracking-widest font-semibold">{story.category}</span>
      <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-3">{story.title}</h1>
      <div className="flex items-center gap-4 mb-8 text-sm text-white/40">
        <span>by {story.author}</span>
        <div className="flex items-center gap-1"><BookOpen className="w-3 h-3"/>{story.readingTime} min read</div>
      </div>
      <img src={story.image} alt={story.title} className="w-full rounded-xl mb-10 aspect-video object-cover"/>
      <div className="prose prose-invert max-w-none mb-12 text-white/70 leading-relaxed text-lg">
        <p>{story.excerpt}</p>
        <p className="mt-6 text-white/40 italic">[Full story content would appear here in a production environment]</p>
      </div>
      <div className="glass-card p-6 mb-12 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-rose-500/20 flex items-center justify-center text-2xl flex-shrink-0">✍️</div>
        <div>
          <p className="font-bold text-white">{author.name}</p>
          <p className="text-sm text-white/50">{author.bio}</p>
        </div>
      </div>
      <div className="max-w-xl mx-auto text-center mb-12">
        <h3 className="text-2xl font-black text-white mb-3">Enjoy DZIRE Stories?</h3>
        <NewsletterForm compact/>
      </div>
      {related.length > 0 && <><h2 className="text-2xl font-black text-white mb-6">More Stories</h2><div className="grid sm:grid-cols-3 gap-4">{related.map(s=><StoryCard key={s.id} story={s}/>)}</div></>}
    </div>
  );
}
