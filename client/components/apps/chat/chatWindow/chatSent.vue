<!-- 发送消息下侧表情  -->
<!-- 这里高度只限定180 -->
<template>
  <div class="h-[180px] flex flex-col">
    <div class="flex h-[40px] space-x-2 border-t" :class="[border]">
      <Icon name="smail" desc="表情" />
      <!-- <Icon name="sc" desc="截图" /> -->
      <Icon name="file" desc="文件" />
      <Icon name="img" desc="照片" />
      <!-- <Icon name="voice" desc="语音输入" /> -->
      <div class="flex-1"></div>
      <Icon name="phone" desc="语音通话" />
      <Icon
        name="video"
        desc="视频通话"
        @click="
          chatStore.videoHandler({
            id: userStore.id,
            nickname: userStore.nickname,
            avatar: userStore.avatar,
          })
        "
      />
      <!-- <Icon name="record" desc="历史记录" /> -->
    </div>
    <div class="flex-1">
      <textarea
        name=""
        id=""
        class="w-full h-full px-3 py-2 overflow-y-scroll resize-none focus:outline-none focus:shadow-outline chatlist overflow-hidden scroll-smooth"
        :class="[bg]"
        v-model="message"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @keydown.enter.prevent="sendMessage"
        @change="changeMessage"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "~/types/message.d.ts";
import Icon from "./icon.vue";
import socket from "~/utils/socket";
import { useThemeStore } from "~/store/theme";
import { useChatStore } from "~/store/chat";
import { useUserStore } from "~/store/user";
const themeStore = useThemeStore();
const chatStore = useChatStore();
const userStore = useUserStore();

interface Message1 {
  id: number;
  userId: string;
  roomId: string;
  content: string;
  type: string;
  createAt: Date;
}

const border = computed(() =>
  themeStore.dark ? "border-[#232323]" : "border-[#e0e0e0]"
);
const bg = computed(() => (themeStore.dark ? "bg-red-100" : "bg-gray-500"));

let message = ref<string>("");

const sendMessage = (e: KeyboardEvent) => {
  const target = e.target as HTMLTextAreaElement;
  console.log("sendMessage " + target.value);
  let data = target.value.replace(/\r?\n|\r/g, "");

  chatStore.sendPrivateMessage(data);

  target.value = "";

  // socket.emit("demo", data);

  // 创建一个消息
  // let tempChat: Partial<Message> = {
  //   userId: "3c33f19c-b5be-4fd4-b9e7-6b5882c4a078",
  //   content: data,
  //   roomId: "TurboRoom",
  // };
  // socket.emit("createMessage", tempChat);
};
const changeMessage = (e: any) => {
  console.log("changeMessage " + e.currentTarget);
};

const onMouseEnter = (event: MouseEvent) => {
  (event.currentTarget as HTMLElement).classList.remove("chatlist");
  (event.currentTarget as HTMLElement).classList.add("chatlist_");
};
const onMouseLeave = (event: MouseEvent) => {
  (event.currentTarget as HTMLElement).classList.remove("chatlist_");
  (event.currentTarget as HTMLElement).classList.add("chatlist");
};

// socket.on('events', (data) => {
//   console.log('onEvents',data) // { msg1: '测试1', msg2: '测试2' }
// });

// socket.on("disconnect", (reason) => {
//   console.log("断开连接", reason);
// });

// onMounted(() => {
//   socket.connect();
// }),
</script>

<style scoped></style>
