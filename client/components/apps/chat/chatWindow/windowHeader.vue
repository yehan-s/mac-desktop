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
        <Icon name="video" desc="视频通话" @click="chatStore.videoHandler" />
        <Icon name="screen" desc="屏幕共享" />
        <Icon name="friend" desc="邀请进群" />
        <Icon name="more" desc="更多" />
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import persets from "~/config/persets";
import Icon from "./icon.vue";
import Video from "./video.vue";
import { useThemeStore } from "~/store/theme";
import { useChatStore } from "~/store/chat";
const themeStore = useThemeStore();
const chatStore = useChatStore();
const textColor = computed(() =>
  themeStore.dark ? "text-[#fff]" : "text-[#000]"
);

// 视频开关
// const videoHandler = () => {
//   chatStore.videoIsOpen = true;
//   // 等待dom渲染完成 再进行初始化
//   nextTick(() => {
//     chatStore.myVideoRef = myVideoRef.value;
//     chatStore.otherVideoRef = otherVideoRef.value;
//     // chatStore.initStream();
//     chatStore.requestVideoCall();
//     // chatStore.initSocket();
//   });
// };
// // 后续被动打开音视频
// watch(
//   () => chatStore.videoIsOpen,
//   (newVal) => {
//     console.log("进入watch", newVal);
//     if (newVal) {
//       nextTick(() => {
//         chatStore.myVideoRef = myVideoRef.value;
//         chatStore.otherVideoRef = otherVideoRef.value;
//         console.log("检测一下", chatStore.myVideoRef);
//       });
//     }
//   },
//   { deep: true }
// );

// let visible = ref(false);

// const myVideoRef = ref(null);
// const otherVideoRef = ref(null);
</script>

<style scoped></style>
