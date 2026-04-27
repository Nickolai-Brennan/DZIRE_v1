/**
 * Design System — BlogCardGrid Pattern
 *
 * Responsive 3-column grid of article cards.
 */
import React from 'react';
import { Card, CardBody } from '../components/Card';
import { Badge } from '../components/Badge';

export interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime?: string;
  imageUrl?: string;
  href?: string;
  isVip?: boolean;
  isSponsored?: boolean;
}

export interface BlogCardGridProps {
  posts: BlogPost[];
  columns?: 2 | 3 | 4;
  onCardClick?: (post: BlogPost) => void;
}

export const BlogCardGrid: React.FC<BlogCardGridProps> = ({
  posts,
  columns = 3,
  onCardClick,
}) => {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center text-textMuted text-sm">
        No posts found.
      </div>
    );
  }

  return (
    <div className={`grid ${colClass} gap-6`} role="list" aria-label="Blog posts">
      {posts.map((post) => (
        <Card
          key={post.id}
          variant="default"
          interactive={!!onCardClick || !!post.href}
          onClick={() => onCardClick?.(post)}
          className="overflow-hidden"
        >
          {/* Thumbnail */}
          {post.imageUrl ? (
            <div className="aspect-[4/3] bg-surfaceAlt overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] bg-surfaceAlt flex items-center justify-center">
              <span className="text-textSubtle text-xs">No image</span>
            </div>
          )}

          <CardBody className="flex flex-col gap-2">
            {/* Badges row */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="category" size="sm">{post.category}</Badge>
              {post.isVip && <Badge variant="vip" size="sm">VIP</Badge>}
              {post.isSponsored && <Badge variant="sponsor" size="sm">Sponsored</Badge>}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-textPrimary line-clamp-2 leading-snug">
              {post.href ? (
                <a href={post.href} className="hover:text-accent transition-colors">
                  {post.title}
                </a>
              ) : (
                post.title
              )}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-textMuted line-clamp-2">{post.excerpt}</p>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-textSubtle mt-1">
              <span>{post.author}</span>
              <span className="flex items-center gap-2">
                {post.readTime && <span>{post.readTime}</span>}
                <span>{post.publishedAt}</span>
              </span>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
