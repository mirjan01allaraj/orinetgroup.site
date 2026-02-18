import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://orientgroup.al/";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/invest",
    "/news",
    "/contact",
  ];

  // SQ + EN variants (you use ?lang=en)
  const urls = routes.flatMap((path) => [
    { url: `${baseUrl}${path}`, lastModified: new Date() },
    { url: `${baseUrl}${path}?lang=en`, lastModified: new Date() },
  ]);

  return urls;
}
