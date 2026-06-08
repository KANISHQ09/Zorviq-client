import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zorviq AI Website Builder",
    short_name: "Zorviq",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#060606",
    theme_color: "#7C3AED",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
