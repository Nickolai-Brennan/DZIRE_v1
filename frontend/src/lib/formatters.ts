export function formatScore(score: number): string { return `${score}/10`; }
export function formatPercent(n: number): string { return `${n.toFixed(1)}%`; }
export function formatNumber(n: number): string { return n.toLocaleString(); }
export function scoreColor(score: number): string {
  if (score >= 9) return 'text-yellow-400';
  if (score >= 7) return 'text-green-400';
  if (score >= 5) return 'text-blue-400';
  return 'text-red-400';
}
export function scoreBarColor(score: number): string {
  if (score >= 9) return 'bg-yellow-400';
  if (score >= 7) return 'bg-green-400';
  if (score >= 5) return 'bg-blue-400';
  return 'bg-red-400';
}
export function truncate(str: string, maxLen: number): string {
  return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
}
