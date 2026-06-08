import type { ReactNode } from "react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Log In to Zorviq | AI Website Builder",
  description: "Log in to Zorviq to manage AI-generated websites, projects, previews, and no-code landing page drafts.",
  path: "/login",
  noIndex: true,
});

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
