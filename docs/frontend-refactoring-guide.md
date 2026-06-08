# Frontend Refactoring Strategy

This guide is tailored to the current Zorviq client:

- Next.js `16.2.6` App Router under `src/app`
- Current API logic is centralized in `src/lib/api.ts`
- Auth token/user are currently stored in `localStorage`
- Protected routes currently guard themselves after client render
- `axios` and `@tanstack/react-query` are not installed yet

The goal is an incremental migration. Add the new architecture first, keep `src/lib/api.ts` backward compatible, then move one route at a time.

## Target File Structure

Keep existing folders and add only the new architecture folders:

```txt
src/
  app/
    providers.tsx
    layout.tsx
    dashboard/
      loading.tsx
      page.tsx
    chat/
      loading.tsx
      page.tsx
  lib/
    api.ts                    # compatibility exports during migration
    http/
      axios.ts                # framework-agnostic HTTP client
      auth-token.ts           # token helpers for client fallback
      errors.ts
  services/
    auth.service.ts
    projects.service.ts
    generation.service.ts
  react-query-config/
    query-client.ts
    query-keys.ts
    mutations/
      use-auth-mutations.ts
      use-project-mutations.ts
    queries/
      use-auth-queries.ts
      use-project-queries.ts
  shared/
    components/
      button.tsx
      input.tsx
      textarea.tsx
      field.tsx
      modal.tsx
      skeleton.tsx
      spinner.tsx
      error-message.tsx
    layouts/
      auth-card.tsx
proxy.ts                     # Next 16 route-level auth guard
```

## 1. Install Dependencies

```bash
npm install axios @tanstack/react-query
```

Optional for development:

```bash
npm install -D @tanstack/react-query-devtools
```

## 2. Axios API Layer

Create a reusable axios layer that owns base URL, credentials, headers, refresh behavior, and error normalization.

```ts
// src/lib/http/auth-token.ts
const TOKEN_KEY = "zorviq_token";
const USER_KEY = "zorviq_user";

export type StoredUser = {
  _id: string;
  email: string;
  fullname: string;
  contact?: string;
  verified?: boolean;
};

export const authToken = {
  get() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  set(token?: string, user?: StoredUser) {
    if (typeof window === "undefined") return;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser(): StoredUser | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StoredUser;
    } catch {
      return null;
    }
  },
  clear() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
```

```ts
// src/lib/http/errors.ts
export class ApiError extends Error {
  status?: number;
  payload?: unknown;

  constructor(message: string, status?: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export const getApiErrorMessage = (payload: unknown, fallback: string) => {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    if (typeof record.message === "string") return record.message;
    if (typeof record.error === "string") return record.error;
  }
  return fallback;
};
```

```ts
// src/lib/http/axios.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { authToken } from "./auth-token";
import { ApiError, getApiErrorMessage } from "./errors";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data: T;
};

type RetryConfig = AxiosRequestConfig & { _retry?: boolean };

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = authToken.get();
  const headers = config.headers as Record<string, string>;
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;

    const canRefresh =
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      original.url !== "/api/auth/refresh";

    if (canRefresh) {
      original._retry = true;

      try {
        // Prefer httpOnly refresh cookies. If backend supports this,
        // no token needs to be readable by JavaScript.
        await axiosInstance.post("/api/auth/refresh");
        return axiosInstance(original);
      } catch {
        authToken.clear();
      }
    }

    const payload = error.response?.data;
    const message = getApiErrorMessage(payload, error.message || "Request failed");
    throw new ApiError(message, error.response?.status, payload);
  },
);

export const apiClient = {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await axiosInstance.get<ApiEnvelope<T>>(url, config);
    return response.data.data;
  },
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await axiosInstance.post<ApiEnvelope<T>>(url, data, config);
    return response.data.data;
  },
  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    const response = await axiosInstance.patch<ApiEnvelope<T>>(url, data, config);
    return response.data.data;
  },
  async delete<T = void>(url: string, config?: AxiosRequestConfig) {
    const response = await axiosInstance.delete<ApiEnvelope<T>>(url, config);
    return response.data.data;
  },
};
```

Best practices:

- Keep this layer framework-agnostic: no React hooks, no router, no component imports.
- Use `withCredentials: true` so httpOnly cookie auth works.
- Use `params` through axios config for dynamic query strings: `apiClient.get("/api/projects", { params: { page } })`.
- Keep `localStorage` token support only as a transition fallback. The secure target is backend-set httpOnly cookies.

## 3. API Services

Services translate backend routes into domain functions. Components should not know raw endpoint paths.

```ts
// src/services/auth.service.ts
import { apiClient } from "@/lib/http/axios";
import { authToken } from "@/lib/http/auth-token";

export type ApiUser = {
  _id: string;
  email: string;
  fullname: string;
  contact?: string;
  verified?: boolean;
};

type AuthPayload = {
  token?: string;
  user: ApiUser;
};

export const authService = {
  async login(email: string, password: string) {
    const result = await apiClient.post<AuthPayload>("/api/auth/login", { email, password });
    authToken.set(result.token, result.user);
    return result.user;
  },
  async register(payload: {
    fullname: string;
    email: string;
    contact?: string;
    password: string;
  }) {
    const result = await apiClient.post<{ user: ApiUser }>("/api/auth/register", payload);
    return result.user;
  },
  async me() {
    const result = await apiClient.get<{ user: ApiUser }>("/api/auth/get-me");
    authToken.set(undefined, result.user);
    return result.user;
  },
  async logout() {
    try {
      await apiClient.post("/api/auth/logout");
    } finally {
      authToken.clear();
    }
  },
};
```

```ts
// src/services/projects.service.ts
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
```

```ts
// src/services/generation.service.ts
import { apiClient, API_BASE_URL } from "@/lib/http/axios";

export const generationService = {
  enqueue(projectId: string, prompt: string) {
    return apiClient.post<{
      jobId: string;
      status: "queued" | "done";
      cached: boolean;
      code?: string;
      queuePosition?: number;
      estimatedWaitSeconds?: number;
    }>("/api/generate", { projectId, prompt });
  },
  status(jobId: string) {
    return apiClient.get<{ status: string; output?: string | null }>(
      `/api/generate/status/${jobId}`,
    );
  },
  streamUrl(jobId: string) {
    return `${API_BASE_URL}/api/generate/stream/${jobId}`;
  },
};
```

## 4. React Query Setup

React Query should own server state: profile, project lists, project details, mutations, optimistic updates, and invalidation.

```ts
// src/react-query-config/query-client.ts
import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error: unknown) => {
          const status = typeof error === "object" && error && "status" in error
            ? Number((error as { status?: number }).status)
            : undefined;
          if (status && status >= 400 && status < 500) return false;
          return failureCount < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
```

```ts
// src/react-query-config/query-keys.ts
export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  projects: {
    all: ["projects"] as const,
    list: () => ["projects", "list"] as const,
    detail: (id: string) => ["projects", "detail", id] as const,
  },
  generation: {
    status: (jobId: string) => ["generation", "status", jobId] as const,
  },
};
```

```tsx
// src/app/providers.tsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { createQueryClient } from "@/react-query-config/query-client";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

```tsx
// src/app/layout.tsx
import { AppProviders } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
```

Keep the provider as small as possible. Next App Router pages and layouts are Server Components by default, and the Next docs recommend moving `"use client"` boundaries down to reduce JavaScript sent to the browser.

## 5. Query Hooks and Cache Invalidation

```ts
// src/react-query-config/queries/use-auth-queries.ts
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { queryKeys } from "../query-keys";

export const useCurrentUser = () =>
  useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.me,
    staleTime: 5 * 60_000,
  });
```

```ts
// src/react-query-config/queries/use-project-queries.ts
import { useQuery } from "@tanstack/react-query";
import { projectsService } from "@/services/projects.service";
import { queryKeys } from "../query-keys";

export const useProjects = () =>
  useQuery({
    queryKey: queryKeys.projects.list(),
    queryFn: projectsService.list,
  });

export const useProject = (id?: string | null) =>
  useQuery({
    queryKey: id ? queryKeys.projects.detail(id) : ["projects", "detail", "missing"],
    queryFn: () => projectsService.get(id as string),
    enabled: Boolean(id),
  });
```

```ts
// src/react-query-config/mutations/use-project-mutations.ts
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
    onSuccess: (project) => {
      queryClient.setQueryData(queryKeys.projects.detail(project._id), project);
      queryClient.setQueryData<Project[]>(queryKeys.projects.list(), (current = []) =>
        current.map((item) => (item._id === project._id ? project : item)),
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
```

```ts
// src/react-query-config/mutations/use-auth-mutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { queryKeys } from "../query-keys";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me, user);
      router.replace("/dashboard");
    },
  });
};

export const useRegister = () =>
  useMutation({
    mutationFn: (payload: {
      fullname: string;
      email: string;
      contact?: string;
      password: string;
    }) => authService.register(payload),
  });

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
      router.replace("/login");
    },
  });
};
```

Cache rules:

- Project list: `staleTime` 1 minute, update cache directly after create/update/delete.
- Current user: `staleTime` 5 minutes, clear entire query cache on logout.
- Generation status: poll only while a job is active, stop when done.
- Avoid manual `useEffect` fetches for server state. Use `useQuery`.
- Prefer `setQueryData` after mutations when the backend returns the updated entity; use `invalidateQueries` when the backend changes related resources you did not receive.

## 6. Shared Components

Start with repeated primitives found in login/signup/dashboard: field, input, button, error message, spinner, modal, skeleton.

```tsx
// src/shared/components/button.tsx
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isLoading?: boolean;
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  isLoading,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx("ui-button", `ui-button--${variant}`, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="ui-spinner" aria-hidden /> : icon}
      <span>{children}</span>
    </button>
  );
}
```

```tsx
// src/shared/components/input.tsx
import { InputHTMLAttributes, useId } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={clsx("ui-field", className)}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && <p id={errorId}>{error}</p>}
    </div>
  );
}
```

```tsx
// src/shared/components/skeleton.tsx
import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("ui-skeleton", className)} aria-hidden />;
}
```

Shared component rules:

- Keep props consistent: `isLoading`, `error`, `variant`, `disabled`, `children`.
- Components should not fetch data.
- Components should not know app routes unless they are layout/navigation components.
- Use native accessibility: labels, `aria-invalid`, `aria-describedby`, focus states.
- Move repeated CSS into `globals.css` or component-specific CSS modules once the visual system stabilizes.

## 7. Authentication System

For Next 16, use `proxy.ts` for route-level redirects before protected routes render. The local Next docs note that `middleware` is deprecated in favor of `proxy`.

Secure target:

- Backend sets httpOnly `access_token` and `refresh_token` cookies on login/refresh.
- Axios sends cookies with `withCredentials: true`.
- `proxy.ts` checks for a session cookie before rendering protected routes.
- Client code uses `useCurrentUser()` for actual user data and cache state.

```ts
// proxy.ts
import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "access_token";
const protectedRoutes = ["/dashboard", "/chat"];
const publicAuthRoutes = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(AUTH_COOKIE)?.value);
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isPublicAuth = publicAuthRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicAuth && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/chat/:path*", "/login", "/signup"],
};
```

Transition fallback if backend cannot set cookies yet:

- Keep `authToken` in `localStorage` for API calls.
- Add a lightweight client `AuthBoundary` around protected pages to prevent unauthorized use after hydration.
- Do not treat this as the final security model because `proxy.ts` cannot read `localStorage`.

```tsx
// src/shared/layouts/auth-boundary.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/react-query-config/queries/use-auth-queries";

export function AuthBoundary({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (isError) router.replace("/login");
  }, [isError, router]);

  if (isLoading) return <div className="loading-screen">Loading...</div>;
  if (!user) return null;

  return children;
}
```

## 8. Migrating Existing API Calls

Keep `src/lib/api.ts` as a compatibility facade first:

```ts
// src/lib/api.ts
export { API_BASE_URL } from "@/lib/http/axios";
export { authToken as authStore } from "@/lib/http/auth-token";
export type { ApiUser } from "@/services/auth.service";
export type { Project } from "@/services/projects.service";

import { authService } from "@/services/auth.service";
import { projectsService } from "@/services/projects.service";
import { generationService } from "@/services/generation.service";

export const loginUser = authService.login;
export const registerUser = authService.register;
export const getMe = authService.me;
export const logoutUser = authService.logout;

export const listProjects = projectsService.list;
export const getProject = projectsService.get;
export const deleteProject = projectsService.delete;
export const updateProject = projectsService.update;
export const createProject = (name: string, currentCode: string | null = null) =>
  projectsService.create({ name, currentCode });

export const enqueueGeneration = generationService.enqueue;
export const getGenerationStatus = generationService.status;
```

Then migrate pages:

1. `login/page.tsx`: replace manual `isSubmitting` and `loginUser` with `useLogin`.
2. `signup/page.tsx`: replace duplicated inputs/buttons with shared `Input` and `Button`.
3. `dashboard/page.tsx`: replace `useEffect` data loading with `useCurrentUser`, `useProjects`, `useCreateProject`, `useUpdateProject`, `useDeleteProject`.
4. `chat/page.tsx`: use `useProject(queryProjectId)` for project details and `useUpdateProject` after generation finishes.
5. Remove old `useEffect` fetch and local `projects` state once React Query owns that data.

Example dashboard migration:

```tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/react-query-config/queries/use-auth-queries";
import { useProjects } from "@/react-query-config/queries/use-project-queries";
import {
  useCreateProject,
  useDeleteProject,
  useUpdateProject,
} from "@/react-query-config/mutations/use-project-mutations";
import { useLogout } from "@/react-query-config/mutations/use-auth-mutations";

export default function DashboardPage() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: projects = [], isLoading: areProjectsLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const logout = useLogout();

  const isLoading = isUserLoading || areProjectsLoading;
  const stats = useMemo(() => ({
    total: projects.length,
    generated: projects.filter((project) => Boolean(project.currentCode)).length,
    drafts: projects.filter((project) => !project.currentCode).length,
  }), [projects]);

  async function handleCreate(name: string) {
    const project = await createProject.mutateAsync({ name });
    router.push(`/chat?id=${project._id}`);
  }

  // Render existing UI, driven by query data instead of manual fetch state.
}
```

## 9. Adding a New Protected Page

Checklist:

1. Add route under `src/app`, for example `src/app/settings/page.tsx`.
2. Add route to `protectedRoutes` and `matcher` in `proxy.ts`.
3. Create service functions in `src/services/settings.service.ts`.
4. Add query keys in `src/react-query-config/query-keys.ts`.
5. Add hooks in `src/react-query-config/queries` and `mutations`.
6. Use shared components for inputs/buttons/loading/error states.
7. Add `src/app/settings/loading.tsx` with a skeleton.

Example query:

```ts
export const useSettings = () =>
  useQuery({
    queryKey: ["settings"],
    queryFn: settingsService.get,
    staleTime: 5 * 60_000,
  });
```

## 10. Performance Plan

Immediate wins:

- Remove full-page `"use client"` where possible. Keep route pages server-rendered and move interactive sections into smaller client components.
- Use React Query to dedupe dashboard `getMe` + `listProjects` calls across navigations.
- Add `loading.tsx` skeletons for `/dashboard` and `/chat`.
- Lazy load heavy visual components and browser-only libraries.

Next dynamic examples:

```tsx
import dynamic from "next/dynamic";

const WebsiteShowcase = dynamic(() => import("@/components/WebsiteShowcase"), {
  loading: () => <div className="showcase-skeleton" />,
});

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
  loading: () => <div className="hero-canvas-skeleton" />,
});
```

Use `ssr: false` only for client components that require browser APIs such as WebGL, `window`, or canvas measurement.

Render optimization:

- Do not mirror query data into local state unless the user is editing a draft.
- Use `useMemo` only for derived values that are expensive or passed to memoized children.
- Split large pages into stable child components: `DashboardSidebar`, `ProjectGrid`, `ProjectModal`, `ChatMessages`, `PreviewPanel`.
- Keep modal components lazy-loaded because they are not needed for first paint.
- Use stable query keys so React Query can reuse cached data.

Skeleton/loading:

```tsx
// src/app/dashboard/loading.tsx
import { Skeleton } from "@/shared/components/skeleton";

export default function DashboardLoading() {
  return (
    <main className="dashboard-loading">
      <Skeleton className="dashboard-loading__hero" />
      <Skeleton className="dashboard-loading__grid" />
    </main>
  );
}
```

## 11. Rollout Order

1. Install dependencies.
2. Add `lib/http`, `services`, `react-query-config`, `shared`.
3. Add `AppProviders` to `layout.tsx`.
4. Replace `src/lib/api.ts` with compatibility exports.
5. Migrate auth pages to `useLogin`, `useRegister`, shared inputs/buttons.
6. Migrate dashboard to React Query.
7. Migrate chat project loading/update calls to React Query; keep EventSource streaming as imperative logic.
8. Add `proxy.ts` once backend cookies are available. Until then, use `AuthBoundary` as a transition guard.
9. Add route `loading.tsx` files and lazy-load heavy visual components.
10. Remove deprecated manual fetch helpers after all imports move to services/hooks.

## 12. Team Rules

- Components call hooks, hooks call services, services call `apiClient`.
- No component should import `axiosInstance` directly.
- No new route should fetch protected data without a query key and hook.
- Mutations must update or invalidate relevant query keys.
- Auth logout must clear React Query cache.
- Shared UI components should be generic and app-themed, not page-specific.
- Avoid adding more `localStorage` auth usage. Prefer httpOnly cookies as soon as backend supports them.
