import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://alpsolar.pk";
  const currentDate = new Date().toISOString();

  const routes = [
    "",
    "/solar-systems",
    "/packages",
    "/products",
    "/projects",
    "/solar-calculator",
    "/about",
    "/contact",
    "/net-metering",
    "/faq",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
