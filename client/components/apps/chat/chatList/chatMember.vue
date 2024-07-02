<template>
  <div
    class="flex w-full p-2 h-[70px] hover:bg-[#f5f5f5] dark:hover:bg-white/10"
  >
    <!-- 左侧头像以及未读 -->
    <div class="p-2 rounded-full indicator">
      <!-- 未读的badge -->
      <span
        v-show="props.unread > 0"
        class="indicator-item badge badge-secondary"
        >{{ props.unread }}</span
      >
      <img :src="props.avatar" alt="qq" width="50" height="50" />
    </div>
    <!-- 右侧上 名字和日期 -->
    <div class="flex flex-col w-full">
      <div class="flex">
        <div class="flex-1 dark:text-gray-400 text-black">
          {{ props.name }}
        </div>
        <div class="flex-1 h-full"></div>
        <div class="dark:text-[#5e5e5e]">
          {{ props.date }}
        </div>
      </div>
      <!-- 单行省略 -->
      <!-- 右侧下 消息内容 -->
      <div
        class="dark:text-[#5e5e5e] text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-44"
      >
        {{ props.lastMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "~/store/theme";
const themeStore = useThemeStore();

let props = defineProps<{
  name: string;
  avatar: string;
  lastMessage: string;
  date: string;
  unread: number;
}>();

// onMounted(() => {

// });
</script>

<style scoped></style>
