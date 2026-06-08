import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error: unknown) => {
          const status =
            error && typeof error === "object" && "status" in error
              ? Number((error as { status?: number }).status)
              : undefined;

          if (status && status >= 400 && status < 500) return false;
          return failureCount < 2;
        },
        staleTime: 60_000,
      },
      mutations: {
        retry: false,
      },
    },
  });
