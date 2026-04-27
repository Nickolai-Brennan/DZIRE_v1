import type { Story } from "./types";

export const mockStories: Story[] = [
  {
    id: "story-1",
    title: "Midnight in Paris",
    slug: "midnight-in-paris",
    excerpt:
      "A chance encounter in a quiet Parisian café leads to an unforgettable night of connection, desire, and discovery.",
    category: "Romance",
    author: "Isabella Rose",
    publishDate: "2024-01-10",
    readingTime: 15,
    image: "https://placehold.co/800x500/09090B/F8FAFC?text=Midnight+Paris",
    tags: ["romance", "paris", "connection", "sensual"],
  },
  {
    id: "story-2",
    title: "The Art of Patience",
    slug: "art-of-patience",
    excerpt:
      "Two longtime friends discover that the slow burn of anticipation can be more intoxicating than they ever imagined.",
    category: "Slow Burn",
    author: "Marcus Stone",
    publishDate: "2024-01-18",
    readingTime: 12,
    image: "https://placehold.co/800x500/09090B/F8FAFC?text=Art+of+Patience",
    tags: ["slow-burn", "anticipation", "friends-to-lovers", "tension"],
  },
  {
    id: "story-3",
    title: "Desert Heat",
    slug: "desert-heat",
    excerpt:
      "A spontaneous road trip through the Southwest becomes a journey of self-discovery and unexpected passion.",
    category: "Adventure",
    author: "Dakota Rivers",
    publishDate: "2024-02-05",
    readingTime: 18,
    image: "https://placehold.co/800x500/09090B/F8FAFC?text=Desert+Heat",
    tags: ["adventure", "road-trip", "spontaneous", "passion"],
  },
  {
    id: "story-4",
    title: "Behind Closed Doors",
    slug: "behind-closed-doors",
    excerpt:
      "What happens when a professional boundary blurs during late nights at the office? A story of temptation and tension.",
    category: "Forbidden",
    author: "Victoria Lane",
    publishDate: "2024-02-12",
    readingTime: 14,
    image:
      "https://placehold.co/800x500/09090B/F8FAFC?text=Behind+Closed+Doors",
    tags: ["forbidden", "office", "tension", "professional"],
  },
];
