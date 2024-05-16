<template>
  <div
    class="flex w-full p-2 h-[70px]"
    :class="[themeStore.dark ? 'hover:bg-white/10' : 'hover:bg-[#f5f5f5]']"
  >
    <div class="p-2 rounded-full">
      <img
        src="https://turbomac-1309372570.cos.ap-shanghai.myqcloud.com/avatar/turbo.png"
        alt="qq"
        width="50"
        height="50"
      />
    </div>
    <div class="flex flex-col w-full">
      <div class="flex">
        <div class="flex-1" :class="[themeStore.dark ? '' : 'text-black']">
          {{ props.name }}
        </div>
        <div class="flex-1 h-full"></div>
        <div>date</div>
      </div>
      <p :class="[themeStore.dark ? '' : 'text-gray-400']">last message</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/theme";
import { findLastMessage } from "~/api/message";
const themeStore = useThemeStore();
import { useUserStore } from "~/store/user";
const userStore = useUserStore();

// 需要 username, avatar, lastMessage, date, room
interface chatListItem {
  nickname: string;
  avatar: string;
  lastMessage?: string;
  date?: Date;
  room?: string;
}
let chatListItem: chatListItem = {} as chatListItem;
let chatList: chatListItem[] = [];
let friendsList: any[] = [];
// 获取一个好友列表
userStore.friendGroups.forEach((item: any) => {
  item.friends.forEach((friend: any) => {
    friendsList.push(friend);
  });
});
console.log("friendsList", friendsList);

const getLMToChatList = async () => {
  for (let item of friendsList) {
    chatListItem.nickname = item.user.nickname;
    chatListItem.avatar = item.user.avatar;
    let MessageTemp = await findLastMessage(item.room);
    // item.lastMessage = MessageTemp.content;
    chatListItem.lastMessage = MessageTemp.content;
    chatListItem.date = MessageTemp.created_at;
    chatListItem.room = MessageTemp.room;
    console.log("在这呢看看", MessageTemp);
    chatList.push(chatListItem);
  }
};

let props = defineProps<{
  name: string;
  // avatar: string;
  // lastMessage: string;
  // date: string;
}>();

onMounted(() => {
  console.log("进入了onm");
  getLMToChatList();
});
</script>

<style scoped></style>
