import type { ReactNode } from "react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Sign Up for Zorviq | Free AI Website Builder",
  description: "Create a free Zorviq account and start building no-code websites, landing pages, portfolios, and SaaS pages with AI.",
  path: "/signup",
  keywords: ["free AI website builder", "create website with AI"],
});

export default function SignupLayout({ children }: { children: ReactNode }) {
  return children;
}
