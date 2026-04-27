import type { MagazineIssue } from '@/types/content';
export const mockMagazineIssues: MagazineIssue[] = [
  { id:'1',slug:'vol-1',title:'DZIRE Monthly — Vol. 1',subtitle:'Desire, Redefined',coverPlaceholder:'https://placehold.co/300x400/1D1D26/E11D48?text=DZIRE+Vol.1',publishedAt:'2024-12-01',tableOfContents:['Featured: Aria Luxe Interview','Position Guide: Classic Collection','Review: Luxe Vibrance Pro','Story: Midnight Rendezvous'],isFeatured:true},
  { id:'2',slug:'vol-2',title:'DZIRE Monthly — Vol. 2',subtitle:'The Anatomy of Connection',coverPlaceholder:'https://placehold.co/300x400/1D1D26/F5C451?text=DZIRE+Vol.2',publishedAt:'2025-01-01',tableOfContents:['Featured: Celeste Voss on Education','Top 10 Products of 2025','Wellness Guide: Mindful Intimacy','Story: The Art of Longing'],isFeatured:false},
  { id:'3',slug:'vol-3',title:'DZIRE Monthly — Vol. 3',subtitle:'The Bold & The Beautiful',coverPlaceholder:'https://placehold.co/300x400/1D1D26/A1A1AA?text=DZIRE+Vol.3',publishedAt:'2025-02-01',tableOfContents:['Cover: Nova Sterling','Advanced Guide: Elevated Positions','Review: Obsidian Luxury Wand','Fiction Contest Winner'],isFeatured:false},
];
