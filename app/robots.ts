import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const site = "https://tminhvu.xyz";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site}/sitemap.xml`,
  };
}
