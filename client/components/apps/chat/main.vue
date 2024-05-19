<template>
  <div class="flex h-[600px] w-[900px] backdrop-blur-sm">
    <SiderBar :avatar="userStore.avatar" />
    <ChatList />
    <ChatWindow />
    <!-- <div className="{`flex-1" flex-center ${bg}`}>
      <img className="w-[140px] h-[140px]" src="{src}" alt="123" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import SiderBar from "./siderbar/index.vue";
import ChatList from "./chatList/index.vue";
import ChatWindow from "./chatWindow/index.vue";
import { useThemeStore } from "~/store/theme";
import { useUserStore } from "~/store/user";
const themeStore = useThemeStore();
const userStore = useUserStore();
const flag = true;
const bg = themeStore.dark ? "bg-[#1a1a1a]" : "bg-[#f2f2f2]";
const src = themeStore.dark ? "/qq/logo/qq_dark.svg" : "/qq/logo/qq_.svg";

// onMounted(() => {
//   socket.connect();
//   socket.on("connect", () => {
//     console.log("连接成功");
//   });
//   // socket.emit("creatMessage",'哈哈')
//   socket.on("getMessages", (data) => {
//     if (data) {
//       console.log(data);
//     }
//   });
//   socket.on("disconnect", (reason) => {
//     console.log("断开连接", reason);
//   });
// });

// onUnmounted(() => {
//   socket.disconnect();
// });
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
