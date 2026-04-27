import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterChips } from '../components/ui/FilterChips';
import { DictionaryTermCard } from '../components/dictionary/DictionaryTermCard';
import { NewsletterForm } from '../components/ui/NewsletterForm';
import { mockDictionary } from '../data/mockDictionary';
import { track } from '../utils/track';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const DictionaryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockDictionary.map(t => t.category)))];
  const featuredTerms = mockDictionary.filter(t => t.isFeatured);

  const filtered = useMemo(() => {
    return mockDictionary.filter(t => {
      const matchSearch = !searchQuery || t.term.toLowerCase().includes(searchQuery.toLowerCase()) || t.shortDef.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLetter = activeLetter === 'All' || t.term.toUpperCase().startsWith(activeLetter);
      const matchCat = activeCategory === 'All' || t.category === activeCategory;
      return matchSearch && matchLetter && matchCat;
    });
  }, [searchQuery, activeLetter, activeCategory]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q) track('search_query', { query: q, context: 'dictionary' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 sm:px-6 text-center mb-12">
        <p className="text-primary text-sm uppercase tracking-widest mb-3">DZIRE Dictionary</p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-4">Sex & Intimacy Glossary</h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto mb-8">Clear, judgment-free definitions for the language of pleasure and connection.</p>
        <div className="max-w-lg mx-auto">
          <SearchBar value={searchQuery} onChange={handleSearch} placeholder="Search any term..." />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="mb-6">
          <FilterChips filters={categories} active={activeCategory} onChange={(cat) => { setActiveCategory(cat); setActiveLetter('All'); }} />
        </div>

        {/* Alphabet Navigation */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-1 mb-10">
            {['All', ...ALPHABET].map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                  activeLetter === letter
                    ? 'bg-primary text-white'
                    : 'bg-surface text-textMuted hover:text-textPrimary hover:bg-surfaceAlt border border-white/10'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        )}

        {/* Featured Terms */}
        {!searchQuery && activeCategory === 'All' && activeLetter === 'All' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-textPrimary mb-6">Featured Terms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredTerms.map((term) => (
                <DictionaryTermCard key={term.id} term={term} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Terms */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">
            {searchQuery ? `Results for "${searchQuery}"` : activeLetter !== 'All' ? `Terms starting with "${activeLetter}"` : 'All Terms'}
            <span className="text-base font-normal text-textMuted ml-3">({filtered.length})</span>
          </h2>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((term) => (
                <DictionaryTermCard key={term.id} term={term} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-textMuted">
              <p className="text-2xl font-bold mb-2">No terms found</p>
              <p>Try a different search or browse all terms.</p>
            </div>
          )}
        </section>

        {/* Newsletter */}
        <NewsletterForm />
        <div className="mb-12" />
      </div>
    </div>
  );
};
