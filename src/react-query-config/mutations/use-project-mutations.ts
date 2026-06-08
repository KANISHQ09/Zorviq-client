import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsService, Project } from "@/services/projects.service";
import { queryKeys } from "../query-keys";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string; currentCode?: string | null }) =>
      projectsService.create(payload),
    onSuccess: (project) => {
      queryClient.setQueryData<Project[]>(queryKeys.projects.list(), (current = []) => [
        project,
        ...current,
      ]);
      queryClient.setQueryData(queryKeys.projects.detail(project._id), project);
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Pick<Project, "name" | "currentCode">>;
    }) => projectsService.update(id, payload),
    onSuccess: (project, variables) => {
      const projectId = project._id || variables.id;
      const cachedProject = queryClient.getQueryData<Project>(queryKeys.projects.detail(projectId));
      const mergedProject = {
        ...cachedProject,
        ...project,
        _id: projectId,
        ...variables.payload,
      };

      queryClient.setQueryData(queryKeys.projects.detail(projectId), mergedProject);
      queryClient.setQueryData<Project[]>(queryKeys.projects.list(), (current = []) =>
        current.map((item) =>
          item._id === projectId ? { ...item, ...mergedProject } : item,
        ),
      );
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsService.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.projects.detail(id) });
      queryClient.setQueryData<Project[]>(queryKeys.projects.list(), (current = []) =>
        current.filter((item) => item._id !== id),
      );
    },
  });
};
