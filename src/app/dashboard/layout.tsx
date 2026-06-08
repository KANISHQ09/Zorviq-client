import type { ReactNode } from "react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Project Dashboard | Zorviq AI Website Builder",
  description: "Manage Zorviq projects, drafts, generated website code, and AI website builder workspace activity.",
  path: "/dashboard",
  noIndex: true,
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return children;
}
