<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue", "confirm"]);

const close = () => emit("update:modelValue", false);
const confirm = () => emit("confirm");
</script>

<template>
  <el-dialog
    title="Confirm Logout"
    :model-value="modelValue"
    width="400px"
    @close="close"
  >
    <p>Are you sure you want to logout?</p>
    <template #footer>
      <el-button @click="close">Cancel</el-button>
      <el-button type="primary" @click="confirm">Logout</el-button>
    </template>
  </el-dialog>
</template>
