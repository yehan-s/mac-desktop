<template>
  <div class="flex w-full h-6">
    <span class="mr-2 text-red-400"
      >command not found:
      <span class="text-purple-400">{{ props.content }}</span></span
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ content: string }>();
</script>

<style scoped></style>
