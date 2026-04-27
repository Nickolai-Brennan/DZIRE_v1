import React, { useState, useMemo } from 'react';
import { PositionCard } from '../components/positions/PositionCard';
import { PositionQuickViewModal } from '../components/positions/PositionQuickViewModal';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterChips } from '../components/ui/FilterChips';
import { mockPositions } from '../data/mockPositions';
import type { Position } from '../data/types';
import { track } from '../utils/track';

const FILTERS = ['All', 'Partner', 'Advanced', 'Beginner'];

export const PositionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [quickViewPosition, setQuickViewPosition] = useState<Position | null>(null);

  const filtered = useMemo(() => {
    return mockPositions.filter(p => {
      const matchSearch = !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchFilter = activeFilter === 'All' || p.category === activeFilter ||
        (activeFilter === 'Beginner' && p.difficulty <= 3);
      return matchSearch && matchFilter;
    });
  }, [searchQuery, activeFilter]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q) track('search_query', { query: q, context: 'positions' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 sm:px-6 text-center mb-12">
        <p className="text-primary text-sm uppercase tracking-widest mb-3">Explore</p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-4">Position Guides</h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto mb-8">
          Comprehensive guides to intimate positions. Find what works for your comfort, energy, and connection.
        </p>
        <div className="max-w-lg mx-auto">
          <SearchBar value={searchQuery} onChange={handleSearch} placeholder="Search positions..." />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8">
          <FilterChips filters={FILTERS} active={activeFilter} onChange={setActiveFilter} />
        </div>

        {/* Results count */}
        <p className="text-sm text-textMuted mb-6">{filtered.length} positions found</p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filtered.map((position) => (
              <PositionCard
                key={position.id}
                position={position}
                onQuickView={setQuickViewPosition}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-textMuted">
            <p className="text-2xl font-bold mb-2">No positions found</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <PositionQuickViewModal
        position={quickViewPosition}
        onClose={() => setQuickViewPosition(null)}
      />
    </div>
  );
};
