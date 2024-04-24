<!-- 群公告 -->
<template>
  <div class="border-b h-[200px]" :class="[border]">
    <header class="flex p-1">
      <div>群公告</div>
      <div class="flex-1"></div>
      <div class="mr-2">🔍</div>
    </header>
    <div class="text-sm px-1">The Group Owner is to lazy to say nothing!</div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "~/store/theme";
const themeStore = useThemeStore();
let border = computed(() =>
  themeStore.dark ? "border-[#232323]" : "border-[#e9e9e9]"
);
</script>

<style scoped></style>
