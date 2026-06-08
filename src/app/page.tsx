import HomeExperience from "@/components/HomeExperience";
import { createMetadata, jsonLd, siteConfig } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Website Builder | Create No-Code Websites Fast | Zorviq",
  description: siteConfig.description,
  path: "/",
  keywords: ["AI website builder", "AI landing page generator", "prompt to website"],
});

export default function Home() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Zorviq AI Website Builder",
    description: siteConfig.description,
    url: siteConfig.url,
    primaryImageOfPage: `${siteConfig.url}/opengraph-image`,
    mainEntity: {
      "@id": `${siteConfig.url}/#software`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeJsonLd) }}
      />
      <HomeExperience />
    </>
  );
}
