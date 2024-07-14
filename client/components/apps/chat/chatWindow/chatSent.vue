<!-- 发送消息下侧表情  -->
<!-- 这里高度只限定180 -->
<template>
  <div class="h-[180px] flex flex-col">
    <div class="flex h-[40px] space-x-2 border-t relative" :class="[border]">
      <!-- 表情 -->
      <EmojiPanel
        class="absolute bottom-[40px] z-20 dark:border-[#232323] border-[#e0e0e0]"
        :dark="true"
        v-show="showEmojiPanel"
        @clickOutside="handleClickOutside"
      />
      <Icon name="smail" desc="表情" @click.stop="emojiPanelHandler(true)" />
      <!-- <Icon name="sc" desc="截图" /> -->
      <Icon name="file" desc="文件" />

      <Icon name="img" desc="照片" />
      <!-- 发送图片 -->
      <!-- 976.563 KB -->
      <FileUpload
        :pt="persets.fileupload"
        mode="basic"
        :auto="true"
        ref="fileupload"
        accept="image/*"
        :url="uploadUrl"
        :maxFileSize="1000000"
        @beforeSend="beforeSend($event)"
        @select="select"
        @upload="uploadImg"
        class="w-[32px] h-[32px] rounded-full bg-pink-500 absolute top-[8px] -left-[48px] z-10 opacity-0"
      >
      </FileUpload>
      <!-- 上传文件 -->
      <!-- 1024.00 MB -->
      <FileUpload
        :pt="persets.fileupload"
        mode="basic"
        :auto="true"
        ref="fileupload"
        :url="uploadUrl"
        :maxFileSize="1073741824"
        @beforeSend="beforeSend($event)"
        @select="select"
        @upload="uploadFile"
        class="w-[32px] h-[32px] rounded-full bg-pink-500 absolute top-[8px] -left-[140px] z-10 opacity-0"
      >
      </FileUpload>

      <!-- <Icon name="voice" desc="语音输入" /> -->
      <div class="flex-1"></div>
      <!-- <Icon name="phone" desc="语音通话" /> -->
      <Icon name="video" desc="视频通话" @click="videoHandler" />
      <!-- <Icon name="record" desc="历史记录" /> -->
    </div>
    <div class="flex-1">
      <textarea
        name=""
        id=""
        class="w-full h-full px-3 py-2 overflow-y-scroll resize-none focus:outline-none focus:shadow-outline chatlist overflow-hidden scroll-smooth dark:bg-[#1a1a1a] bg-[#f2f2f2] dark:text-white"
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
import { defineExpose } from "vue";
import persets from "~/config/persets";
import EmojiPanel from "./emojiList/index.vue";
import type { Message } from "~/types/message.d.ts";
import Icon from "./icon.vue";
import socket from "~/utils/socket";
import { useThemeStore } from "~/store/theme";
import { useChatStore } from "~/store/chat demo";
import { useUserStore } from "~/store/user";
import type { FileUploadBeforeSendEvent } from "primevue/fileupload";
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

//消息的处理
let message = ref<string>("");
const sendMessage = (e: KeyboardEvent) => {
  const target = e.target as HTMLTextAreaElement;
  console.log("sendMessage " + target.value);
  let data = target.value.replace(/\r?\n|\r/g, "");
  chatStore.sendPrivateMessage(data);
  target.value = "";
};

// Emoji的处理
const showEmojiPanel = ref(false);
const emojiBg = computed(() =>
  themeStore.dark ? "bg-[#060606]" : "bg-[#fcfcfc]"
);
const emojiPanelHandler = (value: boolean) => {
  showEmojiPanel.value = value;
};
// 把showEmojiPanel给子组件，让其可以关闭
defineExpose({ showEmojiPanel, message });
const handleClickOutside = () => {
  if (!showEmojiPanel.value) {
    return;
  }
  emojiPanelHandler(false);
};

const videoHandler = () => {
  if (chatStore.currentChat.privateObject.nickname) {
    chatStore.videoHandler({
      id: userStore.id,
      nickname: userStore.nickname,
      avatar: userStore.avatar,
    });
  } else {
    chatStore.groupVideoHandler({
      id: userStore.id,
      nickname: userStore.nickname,
      avatar: userStore.avatar,
    });
  }
};

const changeMessage = (e: any) => {
  console.log("changeMessage " + e.currentTarget);
};
// 上传文件

interface File {
  size: number;
  type: string;
  name: string;
  objectURL: string;
  fileObject: object;
}
let fileObject: any = null;

let file = reactive<File>({} as File);
const uploadUrl = `${useRuntimeConfig().public.apiBase}/img/get-sts-identity`;

// 给url的默认行为添加请求头
const beforeSend = ($event: FileUploadBeforeSendEvent) => {
  console.log("beforeSend", $event);
  const userAuth = useCookie("token");
  if (userAuth.value) {
    $event.xhr.setRequestHeader("Authorization", `Bearer ${userAuth.value}`);
  }
};
// 在select时候获取file对象
const select = ($event: any) => {
  console.log("选中文件时打印", $event);
  if ($event.files.length === 0) {
    useNuxtApp().$toast.add({
      severity: "warn",
      detail: "不可以文件夹或程序",
      life: 3000,
    });
    return;
  }
  // const fileTemp = $event.files[0];
  file = $event.files[0];
  console.log("文件的大小是", $event.files[0].size);
  // file.size = fileTemp.size;
  // file.type = fileTemp.type;
  // file.name = fileTemp.name;
  // file.objectURL = fileTemp.objectURL;

  // 假设 opt.file 是一个 Blob 对象
  // const blob = file.objectURL;

  // 将 Blob 对象转换为 File 对象
  // file.fileObject = new File([blob], file.name);

  // fileObject = $event.files[0];
};
// 有个autoFocus的提醒
const uploadImg = async ($event: any) => {
  console.log("上传图片", $event);
  let stsResult = $event.xhr.response;
  stsResult = JSON.parse(stsResult);
  if (stsResult.code !== 200)
    return useNuxtApp().$toast.add({
      severity: "warn",
      summary: "Warn",
      detail: "STS获取失败",
      life: 3000,
    });
  const path = await imgUpload({
    file,
    sts: stsResult.data.stsToken.Credentials,
  });

  // 发送图片消息
  chatStore.sendPrivateMessage(path, "image");

  return false;

  useNuxtApp().$toast.add({
    severity: "success",
    summary: "Success",
    detail: "文件上传中。。",
    life: 3000,
  });

  return false;
};

const uploadFile = async ($event: any) => {
  console.log("上传文件", $event);
  let stsResult = $event.xhr.response;
  stsResult = JSON.parse(stsResult);
  if (stsResult.code !== 200)
    return useNuxtApp().$toast.add({
      severity: "warn",
      summary: "Warn",
      detail: "STS获取失败",
      life: 3000,
    });
  console.log("上传文件吗", file);
  const { url, fileName } = await fileUpload({
    file,
    sts: stsResult.data.stsToken.Credentials,
  });

  // 发送图片小
  chatStore.sendPrivateMessage(fileName + "+" + url, "file");

  return false;

  useNuxtApp().$toast.add({
    severity: "success",
    summary: "Success",
    detail: "文件上传中。。",
    life: 3000,
  });

  return false;
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
