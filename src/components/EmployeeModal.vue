<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { RouteName } from "../router/route-names";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const dialogWidth = ref("500px");
const user = computed(() =>
  store.allUsers.find((u) => u.id === Number(route.params.id)),
);

const close = () => {
  router.push({ name: RouteName.Employees });
};

const updateWidth = () => {
  dialogWidth.value = window.innerWidth < 768 ? "90%" : "500px";
};

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});
onUnmounted(() => window.removeEventListener("resize", updateWidth));
</script>

<template>
  <el-dialog
    :model-value="!!user"
    title="User info"
    :width="dialogWidth"
    @close="close"
  >
    <template v-if="user">
      <div class="container">
        <div class="profile">
          <img :src="user.image" alt="" />
          <p>{{ user.firstName }} {{ user.lastName }}</p>
        </div>
        <div class="user-info">
          <p>Email: {{ user.email }}</p>
          <p>Username: {{ user.username }}</p>
          <p>Gender {{ user.gender }}</p>
          <p>Birth Date: {{ user.birthDate }}</p>
          <p>Company: {{ user.company.name }}</p>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
