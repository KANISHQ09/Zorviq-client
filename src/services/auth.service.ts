import { authToken } from "@/lib/http/auth-token";
import { apiClient } from "@/lib/http/axios";

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
    const result = await apiClient.post<AuthPayload>("/api/auth/login", {
      email,
      password,
    });
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
