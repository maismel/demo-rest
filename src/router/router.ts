import { createRouter, createWebHashHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import EmployeesView from "../views/EmployeesView.vue";
import LoginView from "../views/LoginView.vue";
import EmployeeModal from "../components/EmployeeModal.vue";
import { useAuthStore } from "../stores/authStore";
import { RouteName } from "./route-names";

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: RouteName.Employees,
        component: EmployeesView,
        children: [
          {
            path: ":id",
            name: RouteName.EmployeeDetail,
            component: EmployeeModal,
            props: true,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: RouteName.Login,
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHashHistory("/demo-rest/"),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.name === RouteName.Login && authStore.isAuth) {
    return { name: RouteName.Employees };
  }

  if (to.meta.requiresAuth && !authStore.isAuth) {
    return { name: RouteName.Login };
  }
});

export default router;
