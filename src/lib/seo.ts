import type { Metadata } from "next";

export const siteConfig = {
  name: "Zorviq",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://zorviq.com",
  description:
    "Build responsive websites from prompts with Zorviq, an AI website builder for no-code landing pages, portfolios, SaaS sites, and stores.",
  keywords: [
    "AI website builder",
    "no-code website builder",
    "AI landing page generator",
    "AI website generator",
    "prompt to website",
    "AI web design tool",
  ],
};

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "Zorviq AI website builder interface",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/twitter-image")],
    },
  };
}

export const jsonLd = (payload: unknown) =>
  JSON.stringify(payload).replace(/</g, "\\u003c");

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/favicon.ico"),
  sameAs: [],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${siteConfig.url}/#software`,
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteConfig.url,
  description: siteConfig.description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    category: "Free trial",
  },
};
