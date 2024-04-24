<template>
  <div>
    <div class="h-6"></div>
    <header class="flex-center">
      <div class="text-base ml-4 font-black" :class="[textColor]">
        Group Title
      </div>
      <div class="flex-1"></div>
      <div class="flex mr-2 space-x-2">
        <Icon name="apps" desc="应用中心" />
        <Icon name="phone" desc="语音通话" />
        <Icon name="video" desc="视频通话" />
        <Icon name="screen" desc="屏幕共享" />
        <Icon name="friend" desc="邀请进群" />
        <Icon name="more" desc="更多" />
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import Icon from "./icon.vue";
import { useThemeStore } from "~/store/theme";
const themeStore = useThemeStore();
const textColor = computed(() =>
  themeStore.dark ? "text-[#fff]" : "text-[#000]"
);
</script>

<style scoped></style>
