/**
 * Learn articles registry. Add article types and content here when ready.
 * Sitemap (app/sitemap.ts) calls getAllArticles() to include /learn/[categoryId]/[slug] URLs.
 */

export type LearnArticle = {
  categoryId: string;
  slug: string;
};

/** Returns all articles for sitemap. Replace with real data when articles exist. */
export function getAllArticles(): LearnArticle[] {
  return [];
}
