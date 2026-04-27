import { useState, useMemo } from 'react';
export function useFilters<T>(items: T[], searchFn: (item: T, query: string) => boolean, filterFn?: (item: T, filters: string[]) => boolean) {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const toggleFilter = (f: string) => setActiveFilters(prev => prev.includes(f) ? prev.filter(x=>x!==f) : [...prev,f]);
  const clearFilters = () => { setQuery(''); setActiveFilters([]); };
  const filtered = useMemo(() => {
    let result = items;
    if (query) result = result.filter(i => searchFn(i, query.toLowerCase()));
    if (activeFilters.length && filterFn) result = result.filter(i => filterFn(i, activeFilters));
    return result;
  }, [items, query, activeFilters, searchFn, filterFn]);
  return { query, setQuery, activeFilters, toggleFilter, clearFilters, filtered };
}
