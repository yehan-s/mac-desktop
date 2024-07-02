<template>
  <div>
    <div class="h-6"></div>
    <header class="flex-center dark:text-black">
      <div class="text-base ml-4 font-black dark:text-[#fff] text-[#000]">
        {{
          chatStore.currentChat.privateObject.nickname
            ? chatStore.currentChat.privateObject.nickname
            : chatStore.currentChat.groupObject?.nickname
        }}
      </div>
      <div class="flex-1"></div>
      <div class="flex mr-2 space-x-2">
        <!-- <Icon name="screen" desc="屏幕共享" />
        <Icon name="friend" desc="邀请进群" />  -->
        <Icon name="more" desc="更多" @click="groupInfoHandler(true)" />
      </div>
    </header>
  </div>
  <Dialog
    v-model:visible="showGroupInfo"
    modal
    :pt="persets.dialog"
    :draggable="true"
    :closable="false"
  >
    <template #header>
      <div class="w-full flex justify-between items-center">
        <div class="font-bold">群成员</div>

        <div>
          <button
            class="btn btn-ghost btn-sm px-0"
            @click="groupInfoHandler(false)"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </template>
    <template #default>
      <div class="grid grid-cols-6 gap-4 overflow-y-auto h-72 py-4">
        <div
          v-for="item in chatStore.currentChat.groupObject.members"
          :key="item.id"
          class="w-full h-[65px] rounded-full flex items-center flex-col justify-between"
        >
          <img class="w-10 h-10 rounded-s" :src="item.avatar" alt="" />
          <div class="">{{ item.nickname }}</div>
        </div>
        <!-- 添加 -->
        <div
          class="w-full h-[65px] rounded-full flex items-center flex-col justify-between"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 48 48"
            class="scale-[1.18] -translate-y-[2px]"
          >
            <path
              stroke-linejoin="bevel"
              stroke-linecap="round"
              stroke-width="1"
              stroke="#333"
              d="M24 32V16M42 27v-6M6 27v-6M14 6H8a2 2 0 0 0-2 2v6M34 6h6a2 2 0 0 1 2 2v6M34 42h6a2 2 0 0 0 2-2v-6M14 42H8a2 2 0 0 1-2-2v-6M27 6h-6M32 24H16M27 42h-6"
              data-follow-stroke="#333"
            />
          </svg>
          <div class="">添加</div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import persets from "~/config/persets";
import Icon from "./icon.vue";
import Video from "./video.vue";
import type { User } from "~/types/user";
import { useThemeStore } from "~/store/theme";
import { useChatStore } from "~/store/chat";
import { useUserStore } from "~/store/user";
import GroupMembers from "./groupMembers.vue";
const themeStore = useThemeStore();
const chatStore = useChatStore();
const userStore = useUserStore();
// const textColor = computed(() =>
//   themeStore.dark ? "text-[#fff]" : "text-[#000]"
// );

const showGroupInfo = ref(false);
const groupInfoHandler = (value: boolean) => {
  showGroupInfo.value = value;
};

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
