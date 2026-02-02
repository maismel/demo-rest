import type { User } from "../types/user";
import { API_URL } from "./config";
import { checkResponse } from "./helpers";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const loginAPI = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  return checkResponse<LoginResponse>(res);
};

export const fetchUserData = async (token: string): Promise<User> => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse<User>(res);
};
