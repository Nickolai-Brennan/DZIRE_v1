import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, BookOpen } from 'lucide-react';
import { mockMagazine } from '../data/mockMagazine';
import { mockArticles } from '../data/mockArticles';
import { Badge } from '../components/ui/Badge';
import { track } from '../utils/track';

export const MagazinePage: React.FC = () => {
  const latestIssue = mockMagazine[0];
  const issueArticles = mockArticles.filter(a => latestIssue.articles.includes(a.id));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surfaceAlt to-background py-16 px-4 sm:px-6 text-center mb-12">
        <p className="text-primary text-sm uppercase tracking-widest mb-3">Editorial</p>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary mb-4">DZIRE Magazine</h1>
        <p className="text-textMuted text-lg max-w-xl mx-auto">
          Long-form articles, guides, culture pieces, and creator spotlights.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Issues */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">Issues</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
            {mockMagazine.map(issue => (
              <button
                key={issue.id}
                onClick={() => track('magazine_issue_click', { issueId: issue.id })}
                className="group text-left"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-3 border border-white/8 group-hover:border-primary/30 transition-all">
                  <img src={issue.coverImage} alt={issue.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="text-sm font-bold text-textPrimary">{issue.title}</p>
                <p className="text-xs text-textMuted">{issue.coverDate} · Issue #{issue.issueNumber}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-textPrimary">Latest Articles</h2>
          </div>

          {/* Featured Article */}
          {issueArticles[0] && (
            <Link
              to={`/search?q=${encodeURIComponent(issueArticles[0].title)}`}
              onClick={() => track('article_click', { articleId: issueArticles[0].id })}
              className="group block bg-surface rounded-2xl overflow-hidden border border-white/8 hover:border-primary/30 transition-all mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <img src={issueArticles[0].featuredImage} alt={issueArticles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge variant="category" className="mb-3 self-start">{issueArticles[0].category}</Badge>
                  <h3 className="text-2xl font-bold text-textPrimary mb-3 group-hover:text-primary transition-colors">
                    {issueArticles[0].title}
                  </h3>
                  <p className="text-textMuted leading-relaxed mb-4">{issueArticles[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-textMuted">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{issueArticles[0].author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{issueArticles[0].readingTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issueArticles.slice(1).map(article => (
              <Link
                key={article.id}
                to={`/search?q=${encodeURIComponent(article.title)}`}
                onClick={() => track('article_click', { articleId: article.id })}
                className="group bg-surface rounded-2xl overflow-hidden border border-white/8 hover:border-primary/30 transition-all hover:-translate-y-1 block"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="category">{article.category}</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-textPrimary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-textMuted mb-3 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-textMuted">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTime} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-textPrimary mb-6">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockArticles.map(article => (
              <Link
                key={article.id}
                to={`/search?q=${encodeURIComponent(article.title)}`}
                onClick={() => track('article_list_click', { articleId: article.id })}
                className="group flex gap-4 bg-surface rounded-xl p-4 border border-white/8 hover:border-primary/30 transition-all"
              >
                <img src={article.featuredImage} alt={article.title} className="w-24 h-16 object-cover rounded-lg flex-shrink-0" />
                <div className="min-w-0">
                  <Badge variant="category" className="mb-1 text-[10px]">{article.category}</Badge>
                  <h4 className="font-bold text-textPrimary text-sm group-hover:text-primary transition-colors line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-textMuted mt-1">{article.author} · {article.readingTime} min read</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
