<template>
  <!-- TODO: 虚拟列表 -->
  <!-- TODO: 滚动动画有bug，此处取消了scroll-smooth -->
  <div
    class="chatlist overflow-y-scroll overflow-hidden border-t dark:text-white dark:border-[#232323] border-[#e9e9e9]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    ref="chatMessageRef"
  >
    <div class="flex flex-col w-full px-2">
      <div class="text-right">
        <!-- <button
          @click="addMessage"
          class="hover:bg-gray-100 active:bg-gray-200 rounded-full inline-flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-700"
        >
          <div class="w-4 h-4 flex items-center">＋</div>
        </button> -->
      </div>

      <!-- 消息冒泡 -->
      <template v-for="item in chatStore.allMessage" class="my-2">
        <!-- 根据消息的发送者是不是对方，从而决定冒泡在屏幕左右 -->
        <div
          class="chat"
          :class="{
            'chat-start': getPosition(item),
            'chat-end': !getPosition(item),
          }"
        >
          <!-- 头像 -->
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                :src="getAvatar(item)"
              />
            </div>
          </div>
          <!-- 头部 名字和时间  -->
          <div class="chat-header">
            {{ getName(item) }}
            <time class="text-xs opacity-50">{{ item.created_at }}</time>
          </div>
          <!-- 内容 -->
          <div
            class="chat-bubble dark:bg-[#2c2c2c] bg-[#d9d9d9] dark:text-white"
          >
            {{ item.content }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import socket from "~/utils/socket";
import { useThemeStore } from "~/store/theme";
import { ref, reactive } from "vue";
import { useChatStore } from "~/store/chat";
import { useUserStore } from "~/store/user";
const themeStore = useThemeStore();
const chatStore = useChatStore();
const userStore = useUserStore();

const props = defineProps({
  messages: {
    type: Array,
    default: [
      {
        id: 1,
        userId: "yehan",
        roomId: "turboroom",
        content: "Your mom said it's time to come home",
        type: "text",
        createAt: new Date(),
      },
    ],
  },
  setMessages: {
    type: Function,
    default: () => {
      console.log("chatMessage,setMessages");
    },
  },
});

const darkBorder = "border-[#232323]";
const lightBorder = "border-[#e9e9e9]";

//  const bg = dark ? 'bg-[#1a1a1a]' : 'bg-[#f2f2f2]'
const darkBg = "bg-[#1a1a1a]";
const lightBg = "bg-[#f2f2f2]";

// 传入chat仓库中进行控制
const chatMessageRef = ref<HTMLDivElement | null>(null);

// 第一次点击时scrollHeight = clientHeight，只有onUpdated才是正确的scrollHeight
// 但是这里着用一次
const init = true;
onUpdated(() => {
  if (init) {
    chatMessageRef.value?.scrollTo({
      top: (chatMessageRef.value!.scrollTop =
        chatMessageRef.value!.scrollHeight -
        chatMessageRef.value!.clientHeight),
      behavior: "instant",
    });
  }
});

const border = computed(() =>
  themeStore.dark ? "border-[#232323]" : "border-[#e9e9e9]"
);

// 获取信息位置
// 判断发送者是不是对方
// 对方的消息判为true，放在左侧
const getPosition = (item: any): boolean => {
  return item.sender_id !== userStore.id;
};

// 获取头像
// 如果是私聊就用保存在仓库的头像，如果是群聊则用allMessage中存储的
// 只有群聊才会把头像存在allMessage中
const getAvatar = (item: any): string => {
  if (item.type === "private") {
    return item.sender_id === chatStore.currentChat.privateObject.id
      ? chatStore.currentChat.privateObject.avatar
      : userStore.avatar;
  } else {
    return item.avatar;
  }
};

// 获取昵称
const getName = (item: any): string => {
  if (item.type === "private") {
    return item.sender_id === chatStore.currentChat.privateObject.id
      ? chatStore.currentChat.privateObject.nickname
      : userStore.nickname;
  } else {
    return item.nickname;
  }
};

const lastChangedIndex = ref(0);

const imgSrc = "chat/icon/qqavatar.svg";
const addMessage = () => {
  console.log("chatMessage,addMessage");
  // const index = Math.floor(Math.random() * props.messages.length * 100);
  // const newId = props.messages.length
  //   ? Math.max(...props.messages.map((m, n) => n)) + 1
  //   : 1;
  // const newMessage = {
  //   id: newId,
  //   userId: "ljq0226",
  //   roomId: "turboroom",
  //   content: `Your mom said it's ${index} time to come home`,
  //   type: "text",
  //   createAt: new Date(),
  // };

  // lastChangedIndex.value = index;
  // props.setMessages([
  //   ...props.messages.slice(0, index),
  //   newMessage,
  //   ...props.messages.slice(index),
  // ]);
};

const removeMessage = (e: any, message: any) => {
  console.log("chatMessage,removeMessage");
  // e.preventDefault();
  // lastChangedIndex.value = props.messages.indexOf(message);
  // props.setMessages((messages) =>
  //   messages.filter((m) => m.id !== message.id)
  // );
};

const animatingMessages = ref(props.messages.slice(lastChangedIndex.value));

const onMouseEnter = (event: MouseEvent) => {
  // console.log(event.currentTarget);
  (event.currentTarget as HTMLElement).classList.remove("chatlist");
  (event.currentTarget as HTMLElement).classList.add("chatlist_");
};
const onMouseLeave = (event: MouseEvent) => {
  // console.log("leave");
  (event.currentTarget as HTMLElement).classList.remove("chatlist_");
  (event.currentTarget as HTMLElement).classList.add("chatlist");
};
</script>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: opacity 0.2s;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
}
</style>
