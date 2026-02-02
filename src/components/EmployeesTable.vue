<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore";
import type { User } from "../types/user";
import { RouteName } from "../router/route-names";

const router = useRouter();
const userStore = useUserStore();

const { allUsers, loading } = storeToRefs(userStore);

const currentPage = ref(1);
const pageSize = ref(10);

const paginatedUsers = computed<User[]>(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return allUsers.value.slice(start, end);
});

const formatName = (user: User) => {
  return `${user.firstName} ${user.lastName}`;
};

const viewUser = (id: number) => {
  router.push({ name: RouteName.EmployeeDetail, params: { id } });
};
</script>

<template>
  <div>
    <el-table :data="paginatedUsers" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" sortable />
      <el-table-column label="Name" :formatter="formatName" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="age" label="Age" width="80" sortable />
      <el-table-column label="Actions" width="120">
        <template #default="{ row }: { row: User }">
          <el-button type="primary" size="small" @click="viewUser(row.id)">
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <router-view />

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="userStore.allUsers.length"
        :page-size="pageSize"
        v-model:current-page="currentPage"
      />
    </div>
  </div>
</template>

<style scoped>
.el-table {
  --el-table-tr-bg-color: var(--el-fill-color-lighter);
  --el-table-header-bg-color: var(--el-fill-color-lighter);
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  height: 50px;
}
</style>
