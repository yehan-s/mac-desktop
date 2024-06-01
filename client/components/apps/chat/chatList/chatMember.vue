<template>
  <div
    class="flex w-full p-2 h-[70px]"
    :class="[themeStore.dark ? 'hover:bg-white/10' : 'hover:bg-[#f5f5f5]']"
  >
    <div class="p-2 rounded-full indicator">
      <span
        v-show="props.unread > 0"
        class="indicator-item badge badge-secondary"
        >{{ props.unread }}</span
      >
      <img :src="props.avatar" alt="qq" width="50" height="50" />
    </div>

    <div class="flex flex-col w-full">
      <div class="flex">
        <div class="flex-1" :class="[themeStore.dark ? '' : 'text-black']">
          {{ props.name }}
        </div>
        <div class="flex-1 h-full"></div>
        <div :class="[themeStore.dark ? '' : 'text-gray-400']">
          {{ props.date }}
        </div>
      </div>
      <!-- 单行省略 -->
      <div
        class="overflow-hidden text-ellipsis whitespace-nowrap max-w-44"
        :class="[themeStore.dark ? '' : 'text-gray-400']"
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
