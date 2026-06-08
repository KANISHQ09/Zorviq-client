"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { createQueryClient } from "@/react-query-config/query-client";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
