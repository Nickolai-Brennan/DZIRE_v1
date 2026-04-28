import React from 'react';

interface SocialEmbed {
  id: string;
  platform: 'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'other';
  embedUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
  author?: string;
}

interface SocialEmbedWallProps {
  embeds: SocialEmbed[];
  columns?: 2 | 3 | 4;
  title?: string;
  className?: string;
}

const platformLabel: Record<SocialEmbed['platform'], string> = {
  twitter: '𝕏',
  instagram: 'IG',
  tiktok: 'TT',
  youtube: 'YT',
  other: '◈',
};

export const SocialEmbedWall: React.FC<SocialEmbedWallProps> = ({
  embeds,
  columns = 3,
  title,
  className = '',
}) => {
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <section className={`py-12 px-4 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-textPrimary mb-6 text-center">{title}</h2>
      )}

      <div className={`max-w-7xl mx-auto grid grid-cols-1 ${colClass} gap-5`}>
        {embeds.map((embed) => (
          <div
            key={embed.id}
            className="bg-surface rounded-2xl border border-white/8 overflow-hidden flex flex-col"
          >
            {embed.thumbnailUrl ? (
              <div className="aspect-square bg-surfaceAlt overflow-hidden">
                <img
                  src={embed.thumbnailUrl}
                  alt={embed.caption ?? embed.platform}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-surfaceAlt flex items-center justify-center">
                <span className="text-4xl text-textMuted">{platformLabel[embed.platform]}</span>
              </div>
            )}

            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-primary uppercase">{embed.platform}</span>
                {embed.author && <span className="text-xs text-textMuted">@{embed.author}</span>}
              </div>
              {embed.caption && (
                <p className="text-sm text-textMuted line-clamp-2">{embed.caption}</p>
              )}
              {embed.embedUrl && (
                <a
                  href={embed.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-primary hover:underline"
                >
                  View post →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
