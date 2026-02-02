import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types/user";
import { getUsersApi } from "../api/users";

export const useUserStore = defineStore("user", () => {

  const allUsers = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await getUsersApi();
      allUsers.value = data;
    } catch (err: any) {
      error.value = err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  };

  return { allUsers, loading, error, fetchUsers };
});
