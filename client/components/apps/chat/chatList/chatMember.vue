<template>
  <div
    class="flex w-full p-2 h-[70px]"
    :class="[themeStore.dark ? 'hover:bg-white/10' : 'hover:bg-[#f5f5f5]']"
  >
    <div class="p-2 rounded-full">
      <img
        src="https://turbomac-1309372570.cos.ap-shanghai.myqcloud.com/avatar/turbo.png"
        alt="qq"
        width="50"
        height="50"
      />
    </div>
    <div class="flex flex-col w-full">
      <div class="flex">
        <div class="flex-1" :class="[themeStore.dark ? '' : 'text-black']">
          TurboRoom
        </div>
        <div class="flex-1 h-full"></div>
        <div>date</div>
      </div>
      <p :class="[themeStore.dark ? '' : 'text-gray-400']">last message</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();
</script>

<style scoped></style>
