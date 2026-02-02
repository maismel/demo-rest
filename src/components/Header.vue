<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { RouteName } from "../router/route-names";

const authStore = useAuthStore();
const router = useRouter();

const { currentUser } = storeToRefs(authStore);

const viewUser = () => {
  if (!currentUser.value) return;

  router.push({
    name: RouteName.EmployeeDetail  ,
    params: { id: currentUser.value.id },
  });
};
</script>

<template>
  <div class="header">
    <el-icon><Notification /></el-icon>
    <el-button link class="user-info" @click="viewUser">
      <el-icon><User /></el-icon>
      <span>{{ currentUser?.username }}</span>
    </el-button>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 3px;
  color: #000;
}
</style>
