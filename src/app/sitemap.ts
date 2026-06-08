import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteUrl("/templates/img1.jpg"),
        absoluteUrl("/templates/img5.jpg"),
        absoluteUrl("/templates/img4.jpg"),
      ],
    },
    {
      url: absoluteUrl("/signup"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
