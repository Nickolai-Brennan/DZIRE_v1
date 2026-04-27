import { Search, X } from 'lucide-react';
interface Props { value: string; onChange: (v: string) => void; placeholder?: string; className?: string; }
export function SearchBar({ value, onChange, placeholder='Search...', className='' }: Props) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 w-4 h-4 text-white/40" />
      <input
        type="search" value={value} onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-8 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50 text-sm"
        aria-label={placeholder}
      />
      {value && <button onClick={()=>onChange('')} className="absolute right-3 text-white/40 hover:text-white" aria-label="Clear search"><X className="w-4 h-4"/></button>}
    </div>
  );
}
