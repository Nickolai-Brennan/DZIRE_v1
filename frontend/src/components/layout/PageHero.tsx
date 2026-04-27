interface Props { title: string; subtitle?: string; eyebrow?: string; children?: React.ReactNode; }
export function PageHero({ title, subtitle, eyebrow, children }: Props) {
  return (
    <section className="py-16 sm:py-24 text-center px-4">
      {eyebrow && <p className="text-rose-500 text-sm font-semibold uppercase tracking-widest mb-3">{eyebrow}</p>}
      <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 leading-tight">{title}</h1>
      {subtitle && <p className="text-lg text-white/50 max-w-2xl mx-auto">{subtitle}</p>}
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}
