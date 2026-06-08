import type { ReactNode } from "react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Website Chat Editor | Zorviq",
  description: "Use Zorviq's AI chat editor to generate, preview, revise, and download website code for active projects.",
  path: "/chat",
  noIndex: true,
});

export default function ChatLayout({ children }: { children: ReactNode }) {
  return children;
}
