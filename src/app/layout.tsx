import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zorviq — AI Website Builder | Build Stunning Websites in Seconds",
  description:
    "Zorviq is the AI-powered website builder that turns your ideas into stunning websites in seconds. No code. No limits. Just pure creation.",
  keywords: [
    "AI website builder",
    "no-code",
    "website generator",
    "AI design",
    "Zorviq",
  ],
  openGraph: {
    title: "Zorviq — AI Website Builder",
    description:
      "Build stunning websites with AI in seconds. Describe your idea and watch it come to life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
