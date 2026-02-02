import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "../types/user";
import { fetchUserData, loginAPI } from "../api/auth";

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuth = computed(() => !!accessToken.value);

  const login = async (username: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { accessToken: at, refreshToken: rt } = await loginAPI(
        username,
        password,
      );

      accessToken.value = at;
      refreshToken.value = rt;

      localStorage.setItem("accessToken", at);
      localStorage.setItem("refreshToken", rt);

      currentUser.value = await fetchUserData(at);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        error.value = (err as { message: string }).message;
      } else {
        error.value = "Login failed";
      }
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const initAuth = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    accessToken.value = token;

    try {
      currentUser.value = await fetchUserData(token);
    } catch {
      logout();
    }
  };

  const logout = () => {
    currentUser.value = null;
    accessToken.value = null;
    refreshToken.value = null;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return {
    currentUser,
    accessToken,
    refreshToken,
    isAuth,
    isLoading,
    error,
    login,
    initAuth,
    logout,
  };
});
