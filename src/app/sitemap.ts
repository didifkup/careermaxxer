import type { MetadataRoute } from "next";
import { getCategories } from "@/content/learn";

const BASE_URL = "https://careermaxxer.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/worlds`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/arena`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/leaderboard`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const categories = getCategories();
  const learnCategoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/learn/${cat.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Articles: getAllArticles() from @/content/learnArticles — dynamic import to avoid metadata-route bundle issues
  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const { getAllArticles } = await import("@/content/learnArticles");
    const articles = getAllArticles();
    articleEntries = articles.map((a) => ({
      url: `${BASE_URL}/learn/${a.categoryId}/${a.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // ignore
  }

  return [...staticPages, ...learnCategoryEntries, ...articleEntries];
}
