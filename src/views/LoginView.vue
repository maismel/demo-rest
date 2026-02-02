<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { useAuthStore } from "../stores/authStore";

interface RuleForm {
  username: string;
  password: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  username: "",
  password: "",
});

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
    { min: 2, max: 20, message: "Length should be 2 to 20", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input password", trigger: "blur" },
    { min: 2, max: 20, message: "Length should be 2 to 20", trigger: "blur" },
  ],
});

const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  if (!ruleFormRef.value) return;

  try {
    await ruleFormRef.value.validate();

    await authStore.login(ruleForm.username, ruleForm.password);
    router.replace("/");
  } catch (err) {
    console.error("Validation failed", err);
  }
};
</script>

<template>
  <div class="container">
    <el-form
      label-width="auto"
      label-position="top"
      style="max-width: 600px"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      @submit.prevent="handleSubmit"
    >
      <el-form-item label="Username" prop="username" required>
        <el-input v-model="ruleForm.username" />
      </el-form-item>

      <el-form-item label="Password" prop="password" required>
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>

      <el-button native-type="submit">Submit</el-button>
      <p v-if="authStore.error" class="login-error">{{ authStore.error }}</p>

    </el-form>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form {
  background: var(--el-fill-color-lighter);
  padding: 30px;
}

.login-error {
  color: red;
  margin-top: 20px;
  font-weight: 500;
  font-size: 12px;
}
</style>
