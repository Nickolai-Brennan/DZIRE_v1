import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockPositions } from '../data/mockPositions';
import { mockStories } from '../data/mockStories';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SaveToPlaylistButton } from '../components/ui/SaveToPlaylistButton';
import { track } from '../utils/track';

export const TagResultsPage: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();

  const results = useMemo(() => {
    if (!tag) return { positions: [], stories: [] };
    const t = tag.toLowerCase();
    const positions = mockPositions.filter(p =>
      p.keywords.some(k => k.toLowerCase().includes(t)) ||
      p.category.toLowerCase().includes(t) ||
      p.title.toLowerCase().includes(t)
    );
    const stories = mockStories.filter(s =>
      s.tags.some(st => st.toLowerCase().includes(t)) ||
      s.category.toLowerCase().includes(t)
    );
    return { positions, stories };
  }, [tag]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-textMuted hover:text-textPrimary text-sm transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />Back
        </Link>

        <div className="mb-10">
          <p className="text-primary text-sm uppercase tracking-widest mb-2">Tag</p>
          <h1 className="text-4xl font-black text-textPrimary">#{tag}</h1>
          <p className="text-textMuted mt-2">
            {results.positions.length + results.stories.length} results
          </p>
        </div>

        {results.positions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-textPrimary mb-5">Positions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.positions.map(p => (
                <div key={p.id} className="relative">
                  <Link
                    to={`/positions/${p.slug}`}
                    onClick={() => track('tag_results_view', { tag, id: p.id })}
                  >
                    <Card hover className="overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full aspect-video object-cover" />
                      <div className="p-4">
                        <Badge variant="category" className="mb-2">{p.category}</Badge>
                        <h3 className="font-bold text-textPrimary text-sm">{p.title}</h3>
                      </div>
                    </Card>
                  </Link>
                  <div className="absolute top-2 right-2">
                    <SaveToPlaylistButton
                      item={{ id: p.id, type: 'position', title: p.title, slug: p.slug, image: p.image }}
                      label=""
                      className="!p-1.5 !rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.stories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-textPrimary mb-5">Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {results.stories.map(s => (
                <Link
                  key={s.id}
                  to={`/stories/${s.slug}`}
                  onClick={() => track('tag_results_view', { tag, id: s.id })}
                >
                  <Card hover className="overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full aspect-video object-cover" />
                    <div className="p-4">
                      <Badge variant="category" className="mb-2">{s.category}</Badge>
                      <h3 className="font-bold text-textPrimary text-sm">{s.title}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.positions.length === 0 && results.stories.length === 0 && (
          <div className="text-center py-20 text-textMuted">
            <p className="text-2xl font-bold mb-2">No results for #{tag}</p>
            <p>Try a different tag or browse all positions.</p>
          </div>
        )}
      </div>
    </div>
  );
};
