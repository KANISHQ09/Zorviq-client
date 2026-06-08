import { apiClient } from "@/lib/http/axios";

export type Project = {
  _id: string;
  name: string;
  currentCode?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export const projectsService = {
  list() {
    return apiClient.get<Project[]>("/api/projects");
  },
  get(id: string) {
    return apiClient.get<Project>(`/api/projects/${id}`);
  },
  create(payload: { name: string; currentCode?: string | null }) {
    return apiClient.post<Project>("/api/projects", payload);
  },
  update(id: string, payload: Partial<Pick<Project, "name" | "currentCode">>) {
    return apiClient.patch<Project>(`/api/projects/${id}`, payload);
  },
  delete(id: string) {
    return apiClient.delete(`/api/projects/${id}`);
  },
};
