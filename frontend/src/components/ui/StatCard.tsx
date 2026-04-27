interface Props { label: string; value: string | number; change?: number; icon?: React.ReactNode; }
export function StatCard({ label, value, change, icon }: Props) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm text-white/50">{label}</p>
        {icon && <span className="text-white/30">{icon}</span>}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {change !== undefined && (
        <p className={`text-xs mt-1 font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </p>
      )}
    </div>
  );
}
