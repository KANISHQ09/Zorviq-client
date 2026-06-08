import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Project, projectsService } from "@/services/projects.service";
import { queryKeys } from "../query-keys";

export const useProjects = () =>
  useQuery({
    queryKey: queryKeys.projects.list(),
    queryFn: projectsService.list,
  });

export const useProject = (id?: string | null) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: id ? queryKeys.projects.detail(id) : ["projects", "detail", "missing"],
    queryFn: () => projectsService.get(id as string),
    enabled: Boolean(id),
    initialData: () => {
      if (!id) return undefined;
      return queryClient
        .getQueryData<Project[]>(queryKeys.projects.list())
        ?.find((project) => project._id === id);
    },
    refetchOnMount: "always",
    staleTime: 0,
  });
};
