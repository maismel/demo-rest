<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import Header from "../components/Header.vue";
import StatCard from "../components/StatCard.vue";
import EmployeesTable from "../components/EmployeesTable.vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const { allUsers } = storeToRefs(userStore);

const maleUsers = computed(
  () => allUsers.value.filter(u => u.gender === 'male')
)

const femaleUsers = computed(
  () => allUsers.value.filter(u => u.gender === 'female')
)

onMounted(() => {
  userStore.fetchUsers();
});
</script>

<template>
  <div class="container">
    <Header></Header>
    <div class="cards-section">
      <h1 class="title">All Employees</h1>
      <div class="cards">
        <StatCard :users="allUsers" />
        <StatCard :users="maleUsers">
          <template #title>Male Employees</template>
        </StatCard>
        <StatCard :users="femaleUsers">
          <template #title>Female Employees</template>
        </StatCard>
      </div>
    </div>
    <EmployeesTable />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-weight: 600;
  font-size: 24px;
}

.cards-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cards {
  display: flex;
  gap: 8px;
  width: 100%;
  flex-wrap: wrap;
}
</style>
