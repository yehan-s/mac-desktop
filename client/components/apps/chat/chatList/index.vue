<!-- 消息列表-->
<template>
  <!-- 宽度250px -->
  <div
    class="w-[250px] h-full flex flex-col select-none"
    :class="[themeStore.dark ? 'bg-[#262626] ' : 'bg-red-200']"
  >
    <!-- 距顶高度 -->
    <div class="w-full h-7 flex"></div>
    <Search />
    <!-- 聊天存放列表 -->
    <div
      class="w-full flex-1 overflow-y-scroll scroll-smooth"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <!-- 聊天消息列表 -->
      <div v-if="chatListStore.listType === 'message'">
        <template v-for="item in chatListStore.chatList" :key="item.room">
          <ChatMember
            :class="{ [itemBg]: isItemActive === item.room }"
            :name="item.nickname"
            :avatar="item.avatar"
            :lastMessage="item.lastMessage!"
            :date="item.date!"
            :unread="item.unread!"
            @click="chatMemberHandler(item)"
          />
        </template>
      </div>
      <!-- 好友 群组列表 -->
      <div
        v-if="
          chatListStore.listType === 'friend' ||
          chatListStore.listType === 'group'
        "
      >
        <!-- 分组菜单 -->
        <TabMenu :model="tabMenuItems" :pt="persets.tabmenu" />
        <!-- 分组列表 -->
        <PanelMenu
          :model="
            chatListStore.listType === 'group'
              ? chatListStore.groupChatList
              : chatListStore.friendGroupList
          "
          multiple
          class="w-full"
          :pt="persets.panelmenu"
        >
          <template #item="{ item }">
            <div
              class="flex items-center p-4 cursor-pointer"
              @click="groupItemsHandler(item)"
            >
              <div v-show="item.avatar" class="avatar mr-4">
                <div class="w-8 rounded-xl">
                  <img :src="item.avatar" />
                </div>
              </div>
              <div :class="{ 'font-bold': item.prop === 'title' }">
                {{ item.label }}
              </div>
            </div>
          </template>
        </PanelMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { findLastMessage, findMessage } from "~/api/message";
import socket from "~/utils/socket";
import PanelMenu from "primevue/panelmenu";
import ChatMember from "./chatMember.vue";
import Search from "./search.vue";
import { useThemeStore } from "@/store/theme";
import { useUserStore } from "~/store/user";
import { useChatListStore } from "@/store/chatList";
import { useChatStore } from "@/store/chat";
import type { MenuItem } from "primevue/menuitem";
import type { Message } from "~/types";
const themeStore = useThemeStore();
const userStore = useUserStore();
const chatListStore = useChatListStore();
const chatStore = useChatStore();

// 移入带有滚动条的元素中时，对滚动条进行样式调整
// 已经隐藏滚动条
const onMouseEnter = (event: MouseEvent) => {
  // console.log(event);
  (event.currentTarget as HTMLElement).classList.remove("chatlist");
  (event.currentTarget as HTMLElement).classList.add("chatlist_");
};
const onMouseLeave = (event: MouseEvent) => {
  (event.currentTarget as HTMLElement).classList.remove("chatlist_");
  (event.currentTarget as HTMLElement).classList.add("chatlist");
};

// 点击消息item高亮
let itemBg = computed(() => {
  return themeStore.dark ? "bg-white/10" : "bg-[#f5f5f5]";
});
const getItemBgColor = () => {
  return "bg-blue-200";
};
let isItemActive = ref<string>("");
const setActive = (room: string) => {
  isItemActive.value = room;
};

const expandedKeys = ref({
  // 渲染出来的值
  // "0": true,
  // "0_1": true,
  // "0_1_0": true,
  // "0_1_1": true,
  // "0_2": true,
  // "1": true,
  // "1_0": true,
  // "1_1": true,
  // "1_2": true,
  // "2": true,
  // "2_0": true,
  // "2_1": true,
  // "2_2": true,
});

const groupItems = ref([
  {
    label: "这是一个吃瓜群",
    avatar: "https://avatars.githubusercontent.com/u/44036559?v=4",
  },
]);

// 好友和群聊切换
const tabMenuItems = ref([
  {
    label: "好友",
    command: () => {
      chatListStore.setListType("friend");
    },
  },
  {
    label: "群聊",
    command: () => {
      chatListStore.setListType("group");
    },
  },
]);

// 需要 username, avatar, lastMessage, date, room
interface chatListItem {
  type: string;
  nickname: string;
  avatar: string;
  lastMessage?: string;
  // 这里我们将时间戳转换为日期格式时，需要使用string类型
  date?: string;
  room?: string;
  receiver_id?: number;
}

// 点击消息列表item
const chatMemberHandler = async (item: chatListItem) => {
  if (item.type === "group") {
    chatStore.setGroupReceiver(item);
    // chatListStore.setListType("group");
  } else {
    chatStore.setReceiver(item.receiver_id as number);
  }
  // 设置房间号可以让右侧聊天窗口显示
  chatStore.setRoom(item.room as string);
  chatStore.setType(item.type as string);
  console.log("记得删除--------", item);
  // 点击item高亮
  setActive(item.room!);

  // 获取所有信息
  chatStore.getAllMessage(item.room as string);
  // 清空消息
  chatStore.clearUnread();
  chatListStore.getLMToChatList(userStore.id);

  setTimeout(() => {
    chatStore.scrollToBottom();
  }, 0);
};

// 点击分组列表item
const groupItemsHandler = (item: any) => {
  // 点击分组名不做处理
  if (item.prop) {
    return;
  }
  chatListStore.setListType("message");
  chatListStore.chatList.forEach((messageItem) => {
    // 只有群有room属性
    if (messageItem.room === item.room) {
      chatMemberHandler(messageItem as chatListItem);
      return;
    }
    // 跳转四疗效
    if (
      messageItem.receiver_id === item.id ||
      messageItem.sender_id === item.id
    ) {
      chatMemberHandler(messageItem as chatListItem);
    }
  });
  console.log("groupItemsHandler", item);
};

onMounted(() => {
  chatListStore.setFriendsList(userStore.friendGroups);
  chatListStore.getLMToChatList(userStore.id);
  // chatStore.scrollToBottom();

  // 监听新消息
  // 如果我们选中框有新消息，此时应该先把未读清空，发送方是统一都新增了未读
  socket.on("updateLastMessage", () => {
    chatStore.clearUnread();
    chatListStore.getLMToChatList(userStore.id);
  });
});

interface PanelMenuContext {
  item: any;
  index: number;
  active: boolean;
  focused: boolean;
  disabled: boolean;
}
interface PanelMenuState {
  d_activeIndex: number;
  id: string;
  activeItem: MenuItem[];
}

const persets = ref({
  panelmenu: {
    panel: {
      class: "mb-1",
    },
    header: {
      class: [
        "rounded-md",
        "outline-none",
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",
      ],
    },
    headercontent: ({
      context,
      instance,
    }: {
      context: PanelMenuContext;
      instance: any;
    }) => {
      var _a, _b;
      return {
        class: [
          // Shape
          "rounded-t-md",
          {
            "rounded-br-md rounded-bl-md":
              !context.active ||
              ((_a = instance.activeItem) == null ? void 0 : _a.items) ===
                void 0,
            "rounded-br-0 rounded-bl-0":
              context.active &&
              ((_b = instance.activeItem) == null ? void 0 : _b.items) !==
                void 0,
          },
          // Color
          "border border-surface-200 dark:border-surface-700",
          "bg-surface-0 dark:bg-surface-800",
          "text-surface-600 dark:text-surface-0/80",
          { "text-surface-900 ark:text-surface-0": context.active },
          // Transition
          "transition duration-200 ease-in-out",
          "transition-shadow duration-200",
        ],
      };
    },
    headeraction: {
      class: [
        "relative",
        "font-semibold",
        "text-sm",
        "leading-none",
        "flex items-center",
        "px-3 py-2",
        "select-none cursor-pointer no-underline",
      ],
    },
    headerlabel: {
      class: "leading-none",
    },
    headerIcon: {
      class: "mr-2 text-sm",
    },
    submenuicon: {
      class: "ml-auto order-last text-sm",
    },
    menucontent: {
      class: [
        "py-1",
        "border border-t-0",
        "rounded-t-none rounded-br-md rounded-bl-md",
        "text-surface-700 dark:text-white/80",
        "bg-surface-0 dark:bg-surface-800",
        "border-surface-200 dark:border-surface-700",
      ],
    },
    menu: {
      class: ["outline-none", "m-0 p-0 list-none"],
    },
    content: {
      class: [
        "border-none rounded-none",
        "text-surface-700 dark:text-white/80",
        "transition-shadow duration-200",
      ],
    },
    action: ({ context }: { context: PanelMenuContext }) => ({
      class: [
        "relative",
        // Font
        "text-sm leading-none",
        // Flex & Alignments
        "flex items-center",
        // Spacing
        "py-2 px-3",
        // Color
        "text-surface-700 dark:text-white/80",
        // States
        "hover:bg-surface-100 dark:hover:bg-surface-700/80 hover:text-surface-700 dark:hover:text-white/80",
        {
          "bg-surface-200 text-surface-700 dark:text-white/80 dark:bg-surface-600/90":
            context.focused,
        },
        // Misc
        "cursor-pointer no-underline",
        "select-none overflow-hidden",
      ],
    }),
    icon: {
      class: "mr-2",
    },
    submenu: {
      class: "p-0 pl-4 m-0 list-none",
    },
    transition: {
      enterFromClass: "max-h-0",
      enterActiveClass:
        "overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]",
      enterToClass: "max-h-[1000px]",
      leaveFromClass: "max-h-[1000px]",
      leaveActiveClass:
        "overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]",
      leaveToClass: "max-h-0",
    },
  },
  tabmenu: {
    root: {
      class: "overflow-x-auto",
    },
    menu: {
      class: [
        "flex flex-1",
        "list-none",
        "p-0 m-0",
        "bg-surface-0 dark:bg-surface-800",
        "border-b border-surface-200 dark:border-surface-700",
        "text-surface-900 dark:text-surface-0/80",
        // "w-full",
        // 改变好友和群聊标题文字的位置
        "pl-8 justify-evenly items-center",
      ],
    },
    menuitem: {
      class: "mr-0",
    },
    action: ({
      context,
      state,
    }: {
      context: PanelMenuContext;
      state: PanelMenuState;
    }) => ({
      class: [
        "relative",
        // Font
        "font-medium",
        "text-md",
        // Flexbox and Alignment
        "flex items-center",
        // Spacing
        "py-4 px-3",
        "-mb-px",
        // Shape
        "border-b-2",
        "rounded-t-md",
        // Colors and Conditions
        {
          "border-surface-200 dark:border-surface-700":
            state.d_activeIndex !== context.index,
          "bg-surface-0 dark:bg-surface-800":
            state.d_activeIndex !== context.index,
          "text-surface-700 dark:text-surface-0/80":
            state.d_activeIndex !== context.index,
          "border-primary-500 dark:border-primary-400":
            state.d_activeIndex === context.index,
          "text-primary-500 dark:text-primary-400":
            state.d_activeIndex === context.index,
        },
        // States
        "focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset",
        "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        {
          "hover:bg-surface-0 dark:hover:bg-surface-800/80":
            state.d_activeIndex !== context.index,
          "hover:border-surface-400 dark:hover:border-surface-600":
            state.d_activeIndex !== context.index,
          "hover:text-surface-900 dark:hover:text-surface-0":
            state.d_activeIndex !== context.index,
        },
        // Transitions
        "transition-all duration-200",
        // Misc
        "cursor-pointer select-none text-decoration-none",
        "overflow-hidden",
        "user-select-none",
        "whitespace-nowrap",
      ],
    }),
    icon: {
      class: "mr-2",
    },
  },
});
</script>

<style scoped></style>
