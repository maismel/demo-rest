<script setup lang="ts">
import { computed } from "vue";
import type { User } from "../types/user";
const props = defineProps<{
  users: User[];
}>();

const usersQuantity = computed(() => props.users.length);
</script>

<template>
  <el-card shadow="hover" class="card">
    <template #header>
      <div class="title">
        <slot name="title">All employees</slot>
      </div>
    </template>
    <div class="info">
      <div class="quantity">
        {{ usersQuantity }}
      </div>
      <div class="divider"></div>
      <el-button> View </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  background: var(--el-fill-color-lighter);
  border: none;
}

.info {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
}

.divider {
  height: 1px;
  width: 100%;
  background: #000;
}
</style>
