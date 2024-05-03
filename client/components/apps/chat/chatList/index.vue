<!-- 消息列表-->
<template>
  <div
    class="w-[250px] h-full flex flex-col select-none"
    :class="[themeStore.dark ? 'bg-[#262626] ' : 'bg-red-200']"
  >
    <!-- 距顶高度 -->
    <div class="w-full h-7 flex"></div>
    <Search />
    <div
      class="chatlist w-full flex-1 overflow-y-scroll  scroll-smooth"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <ChatMember />
      <ChatMember />
      <ChatMember />
      <ChatMember />
      <ChatMember />
      <ChatMember />
      <ChatMember />
      <ChatMember />
      <ChatMember />
      <ChatMember />
      <ChatMember />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatMember from "./chatMember.vue";
import Search from "./search.vue";
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();

const onMouseEnter = (event: MouseEvent) => {
  console.log(event);
  (event.currentTarget as HTMLElement).classList.remove("chatlist");
  (event.currentTarget as HTMLElement).classList.add("chatlist_");
};
const onMouseLeave = (event: MouseEvent) => {
  (event.currentTarget as HTMLElement).classList.remove("chatlist_");
  (event.currentTarget as HTMLElement).classList.add("chatlist");
};
</script>

<style scoped></style>
