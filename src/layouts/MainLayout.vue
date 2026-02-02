<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { ElContainer, ElMain } from "element-plus";
import Sidebar from "../components/Sidebar.vue";

const isMobile = ref(window.innerWidth < 768);

const onResize = () => {
  isMobile.value = window.innerWidth < 768;
};

const drawerOpen = ref(false);

onMounted(() => window.addEventListener("resize", onResize));
onUnmounted(() => window.removeEventListener("resize", onResize));
</script>

<template>
  <el-header height="40px" v-if="isMobile">
    <el-button
      v-if="isMobile"
      icon="Menu"
      @click="drawerOpen = true"
      circle
      class="burger-btn"
    />
  </el-header>

  <el-container class="layout">
    <el-aside width="260px" v-if="!isMobile"><Sidebar /></el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
  <el-drawer
    v-model="drawerOpen"
    direction="ltr"
    size="260px"
    :with-header="false"
  >
    <Sidebar />
  </el-drawer>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  width: 100%;
}

.el-header {
  background: var(--el-fill-color-lighter);
}

.burger-btn {
  margin-top: 5px;
}

.el-drawer__body {
  padding: 0 !important;
}

</style>
