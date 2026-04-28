import type { MagazineIssue } from "./types";

export const mockMagazine: MagazineIssue[] = [
  {
    id: "mag-1",
    title: "DZIRE Launch Issue",
    slug: "dzire-launch-issue",
    issueNumber: 1,
    coverDate: "May 2026",
    articles: ["art-1", "art-2", "art-3", "art-4", "art-5"],
    coverImage: "https://placehold.co/600x800/09090B/F8FAFC?text=DZIRE+Issue+1",
  },
  {
    id: "mag-2",
    title: "Summer Desire",
    slug: "summer-desire",
    issueNumber: 2,
    coverDate: "June 2026",
    articles: ["art-2", "art-3"],
    coverImage: "https://placehold.co/600x800/15151C/F8FAFC?text=DZIRE+Issue+2",
  },
];
