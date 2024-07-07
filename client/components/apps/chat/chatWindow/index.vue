<template>
  <div class="flex flex-col flex-1 select-none bg-[#f2f2f2] dark:bg-[#1a1a1a]">
    <!-- 窗口头部 -->
    <WindowHeader />
    <div class="flex flex-1">
      <div class="flex flex-col flex-1 overflow-hidden" >
        <!-- 消息显示区 -->
        <ChatMessage class="h-[350px]" />
        <!-- <ChatMessage  /> -->
        <!-- 消息发送区 -->
        <ChatSent class="h-[180px]" />
      </div>
      <!-- <div
        v-if="chatStore.currentChat.sendMessage.type === 'group'"
        class="flex flex-col w-[177px] border"
        :class="[border]"
      > -->
      <!-- 群公告 -->
      <!-- <GroupAnnouncement /> -->
      <!-- 群成员 -->
      <!-- <GroupMembers /> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatMessage from "./chatMessage.vue";
import ChatSent from "./chatSent.vue";
import GroupAnnouncement from "./groupAnnouncement.vue";
import GroupMembers from "./groupMembers.vue";
import WindowHeader from "./windowHeader.vue";

import { useThemeStore } from "~/store/theme";
import { useChatStore } from "~/store/chat demo";
const themeStore = useThemeStore();
const chatStore = useChatStore();

const bg = computed(() => (themeStore.dark ? "bg-green-200" : "bg-red-600"));
const border = computed(() =>
  themeStore.dark ? "border-[#232323]" : "border-[#e9e9e9]"
);

// let bg = themeStore.dark ? "bg-green-200" : "bg-red-600";
// let border = themeStore.dark ? "border-[#232323]" : "border-[#e9e9e9]";
</script>

<style scoped></style>
