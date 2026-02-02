<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import LogoutModal from "./LogoutModal.vue";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const logoutDialogVisible = ref(false);

const handleLogout = () => {
  authStore.logout();
  router.push({ name: "login" });
};
</script>

<template>
  <div class="sidebar">
    <p>RESTAURANT CRM</p>
    <div class="divider"></div>
    <el-menu router :default-active="$route.path">
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <p>Employees</p>
      </el-menu-item>
      <el-menu-item index="" @click="logoutDialogVisible = true">
        <el-icon><UserFilled /></el-icon>
        <p>Logout</p>
      </el-menu-item>
    </el-menu>
  </div>
  <LogoutModal v-model="logoutDialogVisible" @confirm="handleLogout" />
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 24px;
  background: var(--el-fill-color-lighter);
}

.divider {
  width: 100%;
  height: 1px;
  background: #000;
}

.el-menu {
  --el-menu-bg-color: var(--el-fill-color-lighter);
  border-right: none;
  width: 100%;
}

.el-menu-item {
  margin: 4px 0px;
  border-radius: 8px;
  background: var(--el-bg-color);
}

.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-8);
}

.el-menu-item:hover {
  background-color: var(--el-color-primary-light-9);
}

</style>
