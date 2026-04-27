interface Props { options: string[]; active: string[]; onToggle: (v: string) => void; }
export function FilterChips({ options, active, onToggle }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} onClick={() => onToggle(opt)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${active.includes(opt) ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'}`}
          aria-pressed={active.includes(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}
