import { blogSeedPosts, getBlogSeedPostBySlug } from "../../shared/blog/index.js";

export type BlogTable = {
  headers: string[];
  rows: string[][];
};

export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  table?: BlogTable;
};

export type BlogFaq = {
  q: string;
  a: string;
};

export type BlogPost = {
  slug: string;
  href: string;
  title: string;
  category: string;
  description: string;
  meta: string;
  coverImage?: string;
  heroSummary: string;
  heroPoints: string[];
  quickAnswer: string;
  keyTakeaways: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  relatedLinks: {
    label: string;
    href: string;
    description: string;
  }[];
};

export const blogPosts: BlogPost[] = blogSeedPosts;

export function getBlogPostBySlug(slug: string) {
  return (getBlogSeedPostBySlug(slug) as BlogPost | null) ?? null;
}
