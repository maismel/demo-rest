import type { User } from "../types/user";
import { API_URL } from "./config";
import { checkResponse } from "./helpers";

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export const getUsersApi = async () => {
  const res = await fetch(`${API_URL}/users`, {
    headers: { "Content-Type": "application/json" },
  });
  const data = await checkResponse<UsersResponse>(res);
  return data.users;
};
