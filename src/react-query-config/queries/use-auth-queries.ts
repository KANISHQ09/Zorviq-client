import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { queryKeys } from "../query-keys";

export const useCurrentUser = () =>
  useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.me,
    staleTime: 5 * 60_000,
  });
