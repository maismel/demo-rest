import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import { useAuthStore } from "./stores/authStore";


const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const authStore = useAuthStore();
await authStore.initAuth();

app.mount("#app");
