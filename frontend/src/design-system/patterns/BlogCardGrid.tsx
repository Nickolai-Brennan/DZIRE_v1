import React from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime?: string;
  imageUrl?: string;
  isVip?: boolean;
  isSponsored?: boolean;
}

interface BlogCardGridProps {
  posts: BlogPost[];
  columns?: 2 | 3 | 4;
  onPostClick?: (post: BlogPost) => void;
  className?: string;
}

export const BlogCardGrid: React.FC<BlogCardGridProps> = ({
  posts,
  columns = 3,
  onPostClick,
  className = '',
}) => {
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6 ${className}`}>
      {posts.map((post) => (
        <article
          key={post.id}
          onClick={() => onPostClick?.(post)}
          className={`bg-surface rounded-2xl border border-white/8 overflow-hidden ${
            onPostClick ? 'cursor-pointer hover:bg-surfaceAlt hover:border-white/12 transition-all duration-300' : ''
          }`}
        >
          {post.imageUrl && (
            <div className="aspect-[4/3] bg-surfaceAlt overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-accent">{post.category}</span>
              {post.isVip && (
                <span className="px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 text-xs border border-purple-500/40">
                  VIP
                </span>
              )}
              {post.isSponsored && (
                <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs border border-yellow-400/40">
                  Sponsored
                </span>
              )}
            </div>

            <h2 className="text-base font-bold text-textPrimary leading-snug mb-2 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-sm text-textMuted line-clamp-2 mb-4">{post.excerpt}</p>

            <div className="flex items-center justify-between text-xs text-textMuted">
              <span>{post.author}</span>
              <div className="flex items-center gap-2">
                <span>{post.date}</span>
                {post.readTime && <span>· {post.readTime}</span>}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
