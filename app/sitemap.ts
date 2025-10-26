import type { MetadataRoute } from "next";
import items from "@/data/contentItems.json";
const site = "https://tminhvu.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const anchors = (items as any[]).map((it) => ({
    url: `${site}#${it.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.3,
  }));

  return [
    {
      url: site,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site}/MinhVu_resume.pdf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...anchors,
  ];
}
