import React from 'react';
import { Link } from 'react-router-dom';
import { mockDolls } from '../data/mockDolls';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const DzireDollsPage: React.FC = () => {
  const featuredDolls = mockDolls.filter(d => d.isFeatured);
  const otherDolls = mockDolls.filter(d => !d.isFeatured);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 sm:px-6 text-center mb-12">
        <p className="text-primary text-sm uppercase tracking-widest mb-3">The Collective</p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-4">DZIRE Dolls</h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto">
          Meet our curated collective of creators, educators, and pleasure advocates.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">Featured Dolls</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDolls.map(doll => (
              <Link key={doll.id} to={`/dzire-dolls/${doll.slug}`}>
                <Card hover className="overflow-hidden">
                  <div className="relative">
                    <img src={doll.image} alt={doll.name} className="w-full aspect-[3/4] object-cover" />
                    {doll.isSponsored && (
                      <Badge variant="trophy" className="absolute top-3 left-3">Sponsored</Badge>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-textPrimary mb-1">{doll.name}</h3>
                    <p className="text-sm text-textMuted mb-3">{doll.tagline}</p>
                    <div className="flex flex-wrap gap-2">
                      {doll.vibeTags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="category">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* All Dolls */}
        {otherDolls.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-textPrimary mb-6">More Creators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherDolls.map(doll => (
                <Link key={doll.id} to={`/dzire-dolls/${doll.slug}`}>
                  <Card hover className="overflow-hidden">
                    <img src={doll.image} alt={doll.name} className="w-full aspect-[3/4] object-cover" />
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-textPrimary mb-1">{doll.name}</h3>
                      <p className="text-sm text-textMuted mb-3">{doll.tagline}</p>
                      <div className="flex flex-wrap gap-2">
                        {doll.vibeTags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="category">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
