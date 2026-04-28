import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import { mockStories } from "../data/mockStories";
import { mockPositions } from "../data/mockPositions";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { SaveToPlaylistButton } from "../components/ui/SaveToPlaylistButton";
import { track } from "../utils/track";

export const StoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const story = mockStories.find((s) => s.slug === slug);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-textPrimary">Story Not Found</h1>
        <Link to="/stories" className="text-primary hover:underline">
          Back to Stories
        </Link>
      </div>
    );
  }

  const relatedPositions = mockPositions.slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    track("article_share_click", { storySlug: slug });
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <Link
          to="/stories"
          className="flex items-center gap-2 text-textMuted hover:text-textPrimary text-sm transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stories
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/7]">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <Badge variant="category" className="mb-3">
              {story.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-textPrimary">
              {story.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 text-sm text-textMuted">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {story.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {story.readingTime} min read
            </span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-textMuted leading-relaxed mb-6">
            {story.excerpt}
          </p>
          <p className="text-textMuted leading-relaxed mb-6">
            {story.title} is a carefully crafted fantasy story exploring themes
            of connection, desire, and discovery. This story is intended for
            adult audiences and focuses on the emotional and sensual aspects of
            intimacy.
          </p>
          <p className="text-textMuted leading-relaxed mb-6">
            The characters in this story navigate their desires with awareness
            and consent, serving as a non-explicit exploration of how intimacy
            can deepen connection between partners. Each scene is designed to
            spark conversation and inspire couples to explore their own desires
            in healthy, communicative ways.
          </p>
          <p className="text-textMuted leading-relaxed mb-6">
            Through the narrative, readers will discover positions and
            techniques that might inspire their own intimate journeys — all
            grounded in mutual respect and open communication.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {story.tags.map((tag) => (
            <Link key={tag} to={`/tags/${tag}`}>
              <Badge
                variant="category"
                className="hover:border-primary/50 cursor-pointer"
              >
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Inspired By Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <h2 className="text-2xl font-bold text-textPrimary mb-6">
          Inspired By This Story
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedPositions.map((position) => (
            <div key={position.id} className="relative">
              <Link
                to={`/positions/${position.slug}`}
                onClick={() =>
                  track("related_content_click", {
                    from: "story",
                    positionId: position.id,
                  })
                }
              >
                <Card hover className="overflow-hidden">
                  <img
                    src={position.image}
                    alt={position.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-textPrimary text-sm mb-1">
                      {position.title}
                    </h3>
                    <p className="text-xs text-textMuted">
                      Intimacy: {position.intimacy}/10
                    </p>
                  </div>
                </Card>
              </Link>
              <div className="absolute top-2 right-2">
                <SaveToPlaylistButton
                  item={{
                    id: position.id,
                    type: "position",
                    title: position.title,
                    slug: position.slug,
                    image: position.image,
                  }}
                  label=""
                  className="!p-1.5 !rounded-lg text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
