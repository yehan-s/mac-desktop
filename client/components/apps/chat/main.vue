<template>
  <div class="flex h-[600px] w-[900px] backdrop-blur-sm">
    <SiderBar />
    <ChatList />
    <ChatWindow v-if="chatStore.currentChat.sendMessage.room" />
    <div class="flex-1 flex-center bg-[#f6f6f6] dark:bg-[#1c1c1c]" v-else>
      认识新朋友，<br />
      有 Chat 就够了
    </div>
  </div>
</template>

<script setup lang="ts">
import SiderBar from "./siderbar/index.vue";
import ChatList from "./chatList/index.vue";
import ChatWindow from "./chatWindow/index.vue";
import { useThemeStore } from "~/store/theme";
import { useUserStore } from "~/store/user";
import { useChatStore } from "~/store/chat";
const themeStore = useThemeStore();
const userStore = useUserStore();
const chatStore = useChatStore();
const flag = true;
const bg = themeStore.dark ? "bg-[#1a1a1a]" : "bg-[#f2f2f2]";
const src = themeStore.dark ? "/qq/logo/qq_dark.svg" : "/qq/logo/qq_.svg";
</script>

<style>
.one {
  background: red !important;
}
.two {
  background: blue !important;
  /* height: 700px; */
}
.three {
  background: green !important;
}
</style>
