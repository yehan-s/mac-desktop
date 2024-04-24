<template>
  <div class="w-[66px] h-full flex flex-col select-none">
    <!-- 顶部空余 h-7 -->
    <div class="w-full h-7"></div>
    <div class="flex-center ">
      <img :src="props.avatar" width="20px" alt="qqlogo" height="20px" />
      <div
        class="flex-center font-black"
        :class="[!themeStore.dark ? 'text-black' : '']"
      >
        QQ
      </div>
    </div>
    <div class="my-4 flex-center">
      <img
        src="https://turbomac-1309372570.cos.ap-shanghai.myqcloud.com/avatar/avatar1.png"
        width="35px"
        alt="qqavatar"
        height="35px"
      />
    </div>
    <div class="flex flex-col h-[160px] p-3 space-y-2 ">
      <TopIcon name="chat" />
      <TopIcon name="people" />
      <TopIcon name="qqspace" />
    </div>
    <div class="flex-1 w-full"></div>
    <div class="flex flex-col h-[160px] p-3 space-y-2 mb-3 ">
      <BottomIcon name="email" />
      <BottomIcon name="collect" />
      <BottomIcon name="menu" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopIcon from "./topIcon.vue";
import BottomIcon from "./bottomIcon.vue";
// @ts-ignore
import { useThemeStore } from "~/store/theme";
const themeStore = useThemeStore();

let props = defineProps({
  avatar: String,
});
let bg = themeStore.dark ? "bg-[#262626] " : "bg-[#e4e4e5]";
</script>

<style scoped></style>
