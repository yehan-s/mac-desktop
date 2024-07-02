<template>
  <div class="flex w-full p-2 px-4 rounded-lg h-[44px]">
    <div class="flex w-full dark:bg-[#1e1e1e] bg-[#f5f5f5]">
      <div class="w-[24px] flex-center">
        <img :src="searchImg" height="15" alt="qqavater" />
      </div>

      <div class="flex-1 flex-center mr-2">
        <input
          class="focus:outline-none bg-[#f5f5f5] dark:bg-[#1e1e1e] dark:text-[#e9e9e9]"
          type="text"
          placeholder="Search"
        />
      </div>
      <!-- FIXME:影响样式，可以删 -->
      <div class="w-[12px] dark:bg-[#1e1e1e] 'bg-white'"></div>
      <div class="w-[24px] flex-center" @click="addDialog">
        <img :src="addImg" width="15" height="15" alt="qqavater" />
      </div>
    </div>
  </div>

  <!-- 添加框 -->
  <Dialog
    v-model:visible="visible"
    modal
    maximizable
    header="Search"
    :pt="persets.dialog"
    :draggable="true"
    :closable="true"
  >
    <!-- <template #header> </template> -->
    <template #default>
      <div class="flex p-2">
        <div
          class="mr-8"
          @click="changeSelect"
          :class="{ 'font-bold': selectText }"
        >
          找好友
        </div>
        <div @click="changeSelect" :class="{ 'font-bold': !selectText }">
          找群
        </div>
      </div>
      <div class="p-2 flex justify-between">
        <input
          class="w-4/5 p-2 rounded-lg"
          type="text"
          placeholder="Search"
          v-model="search"
        />
        <button class="btn" @click="searchHandler">查找</button>
      </div>

      <!-- 查找的好友的卡片 -->
      <div class="card card-side bg-base-100 shadow-xl" v-show="searchResult">
        <figure class="w-2/5">
          <img :src="searchResult?.avatar" alt="avatar" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {{ searchResult?.nickname || searchResult?.name }}
          </h2>
          <p>{{ searchResult?.username }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="addHandler">添加</button>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { User } from "@/types/index";
const searchImg = "chat/chatlist/search.svg";
const addImg = "chat/chatlist/add.svg";
import Dialog from "primevue/dialog";
import persets from "~/config/persets";
import { searchUser } from "@/api/search";
import { addFriend } from "~/api/add";
import { useThemeStore } from "@/store/theme";
import { useUserStore } from "@/store/user";
import { useChatListStore } from "~/store/chatList";
import type { AddFriendData } from "~/api/add/types";
import { findUserInfoByUsername } from "~/api/user";
import { addGroupMember, findGroupchat } from "~/api/message";
const themeStore = useThemeStore();
const userStore = useUserStore();
const chatListStore = useChatListStore();

let visible = ref(false);

const addDialog = () => {
  visible.value = true;
};

// true为找好友，false为找群
let selectText = ref(true);

const changeSelect = (e: MouseEvent) => {
  (e.target as HTMLElement).innerText === "找好友"
    ? (selectText.value = true)
    : (selectText.value = false);
  // selectText.value = !selectText.value;
};

let search = ref("");
// let searchResult = ref<User>();
let searchResult = ref();

const searchHandler = async () => {
  // 为true则查找好友，为false则查找群
  if (selectText.value) {
    console.log("selectText", selectText);
    searchResult.value = await searchUser(search.value);
  } else {
    searchResult.value = await findGroupchat(search.value);
  }
  console.log("result", searchResult.value);
  console.log("result111", typeof searchResult.value);
  if (searchResult.value) {
    console.log("有值");
  } else {
    console.log("无值");
  }
};

const addHandler = async () => {
  // 更新好友列表
  if (selectText.value) {
    const friend: AddFriendData = {
      user_id: userStore.id,
      friend_id: searchResult.value?.id!,
    };
    await addFriend(friend);
    if (userStore.login) {
      let userInfo = await findUserInfoByUsername(userStore.username);
      console.log("更新信息", userInfo);
      if (userInfo) {
        userStore.saveUserInfo(userInfo);
      }
    }
    chatListStore.getFGItem(userStore.friendGroups);
  } else {
    const group = {
      user_id: userStore.id,
      group_id: searchResult.value?.id!,
    };
    console.log("group", group);
    await addGroupMember(group);

    // 需要更新群组列表
  }
};

// dialog的预设
// const persets = reactive({
//   dialog: {
//     root: ({ state }) => ({
//       class: [
//         // top
//         "absolute",
//         "top-[20vh]",
//         // Shape
//         "rounded-lg",
//         "shadow-xl",
//         "border-0",
//         // Size
//         "max-h-[90vh]",
//         { "sm:w-full sm:max-w-lg": !state.maximized },
//         "m-0",
//         // Transitions
//         "transform",
//         "scale-100",
//         // Color
//         // "dark:border",
//         "bg-blue-50",
//         "dark:border-surface-700",
//         // Maximized State
//         {
//           "transition-none": state.maximized,
//           "transform-none": state.maximized,
//           "!w-screen": state.maximized,
//           "!h-screen": state.maximized,
//           "!max-h-full": state.maximized,
//           "!top-0": state.maximized,
//           "!left-0": state.maximized,
//         },
//       ],
//     }),
//     header: {
//       class: [
//         "flex items-center justify-between",
//         "shrink-0",
//         "p-6 pt-4",
//         "rounded-tl-lg",
//         "rounded-tr-lg",
//         "bg-surface-0 dark:bg-surface-800",
//         "text-surface-700 dark:text-surface-0/80",
//       ],
//     },
//     title: {
//       class: ["font-semibold text-base leading-6"],
//     },
//     icons: {
//       class: ["flex items-center"],
//     },
//     closeButton: {
//       class: [
//         "relative",
//         "flex items-center justify-center",
//         "mr-2",
//         "last:mr-0",
//         "w-6 h-6",
//         "border-0",
//         "rounded-full",
//         "text-surface-500",
//         "bg-transparent",
//         "transition duration-200 ease-in-out",
//         "hover:text-surface-700 dark:hover:text-white/80",
//         "hover:bg-surface-100 dark:hover:bg-surface-800/80",
//         "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
//         "focus:ring-primary-500 dark:focus:ring-primary-400",
//         "overflow-hidden",
//       ],
//     },
//     maximizablebutton: {
//       class: [
//         "relative",
//         "flex items-center justify-center",
//         "mr-2",
//         "last:mr-0",
//         "w-6 h-6",
//         "border-0",
//         "rounded-full",
//         "text-surface-500",
//         "bg-transparent",
//         "transition duration-200 ease-in-out",
//         "hover:text-surface-700 dark:hover:text-white/80",
//         "hover:bg-surface-100 dark:hover:bg-surface-800/80",
//         "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
//         "focus:ring-primary-500 dark:focus:ring-primary-400",
//         "overflow-hidden",
//       ],
//     },
//     closeButtonIcon: {
//       class: ["inline-block", "w-3", "h-3"],
//     },
//     maximizableicon: {
//       class: ["inline-block", "w-3", "h-3"],
//     },
//     content: ({ state, instance }) => ({
//       class: [
//         // Font
//         "text-sm",
//         // Spacing
//         "px-6",
//         "pb-3",
//         "pt-0",
//         // Shape
//         {
//           grow: state.maximized,
//           "rounded-bl-lg": !instance.$slots.footer,
//           "rounded-br-lg": !instance.$slots.footer,
//         },
//         // Colors
//         "bg-surface-0 dark:bg-surface-800",
//         "text-surface-600 dark:text-surface-0/70",
//         // Misc
//         "overflow-y-auto",
//       ],
//     }),
//     footer: {
//       class: [
//         "flex items-center justify-end",
//         "shrink-0",
//         "text-right",
//         "gap-3",
//         "px-6",
//         "py-3",
//         "border-t-0",
//         "rounded-b-lg",
//         "bg-surface-50 dark:bg-surface-700",
//         "text-surface-700 dark:text-surface-0/80",
//       ],
//     },
//     transition: ({ props }) =>
//       props.position === "top"
//         ? {
//             enterFromClass:
//               "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0 mask-active",
//             enterActiveClass: "transition-all duration-200 ease-out",
//             leaveActiveClass: "transition-all duration-200 ease-out",
//             leaveToClass:
//               "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0 mask-active",
//           }
//         : props.position === "bottom"
//           ? {
//               enterFromClass: "opacity-0 scale-75 translate-y-full mask-active",
//               enterActiveClass: "transition-all duration-200 ease-out",
//               leaveActiveClass: "transition-all duration-200 ease-out",
//               leaveToClass:
//                 "opacity-0 scale-75 translate-x-0 translate-y-full translate-z-0 mask-active",
//             }
//           : props.position === "left" ||
//               props.position === "topleft" ||
//               props.position === "bottomleft"
//             ? {
//                 enterFromClass:
//                   "opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0 mask-active",
//                 enterActiveClass: "transition-all duration-200 ease-out",
//                 leaveActiveClass: "transition-all duration-200 ease-out",
//                 leaveToClass:
//                   "opacity-0 scale-75  -translate-x-full translate-y-0 translate-z-0 mask-active",
//               }
//             : props.position === "right" ||
//                 props.position === "topright" ||
//                 props.position === "bottomright"
//               ? {
//                   enterFromClass:
//                     "opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0 mask-active",
//                   enterActiveClass: "transition-all duration-200 ease-out",
//                   leaveActiveClass: "transition-all duration-200 ease-out",
//                   leaveToClass:
//                     "opacity-0 scale-75 opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0 mask-active",
//                 }
//               : {
//                   enterFromClass: "opacity-0 scale-75 mask-active",
//                   enterActiveClass: "transition-all duration-200 ease-out",
//                   leaveActiveClass: "transition-all duration-200 ease-out",
//                   leaveToClass: "opacity-0 scale-75 mask-active",
//                 },
//   },
// });
</script>

<style scoped></style>
