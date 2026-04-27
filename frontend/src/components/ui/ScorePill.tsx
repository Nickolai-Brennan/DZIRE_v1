import { scoreColor } from '@/lib/formatters';
interface Props { score: number; label?: string; size?: 'sm'|'md'; }
export function ScorePill({ score, label, size='md' }: Props) {
  const sz = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-bold border ${sz} ${scoreColor(score)} border-white/10 bg-white/5`}>
      {score}<span className="text-white/40">/10</span>
      {label && <span className="text-white/50 font-normal ml-1">{label}</span>}
    </span>
  );
}
