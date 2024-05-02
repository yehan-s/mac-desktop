<template>
  <div
    class="chatlist overflow-y-scroll overflow-hidden scroll-smooth border-t"
    :class="[border]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="flex flex-col w-full">
      <div class="text-right">
        <button
          @click="addMessage"
          class="hover:bg-gray-100 active:bg-gray-200 rounded-full inline-flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-700"
        >
          <div class="w-4 h-4 flex items-center">＋</div>
        </button>
      </div>

      <ul class="w-full mt-4">
        <!-- <transition-group name="message" tag="div"> -->
        <li
          v-for="message in message2"
          :key="message.id"
          :id="`message-${message.id}`"
          class="p-[3px] flex"
        >
          <div class="my-2 rounded-full">
            <img :src="imgSrc" width="30" height="30" alt="qq" />
          </div>
          <div class="flex flex-col">
            <p>{{ message.userId }}</p>
            <button
              @click="removeMessage($event, message)"
              :class="[
                true ? 'bg-blue-500 ml-auto' : 'bg-gray-500 mr-auto',
                'px-3 py-1',
                'bg-blue-500',
                'text-white',
                'text-left',
                'rounded-full',
                'select-none',
              ]"
              style="-webkit-tap-highlight-color: transparent"
            >
              {{ message.content }}
            </button>
          </div>
        </li>
        <!-- </transition-group> -->
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { define } from 'vue';
// import type  Message  from '~/types/message.d.ts';
// @ts-ignore
import type { Message } from "~/tpyes/index.ts";
import { useThemeStore } from "~/store/theme";
import { ref, reactive } from "vue";
// import type { Message } from './message';
// import type {haha} from './types'
const themeStore = useThemeStore();
// let yhh:haha={
//   name:'yehan'
// }
// interface Message{
//   id:number
//   userId:string
//   roomId:string
//   content:string
//   type:string
//   createAt :Date
// }

let props = defineProps({
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

// let mes =  ref([
//   {
//     id: 2,
//     userId: "jinshu",
//     roomId: "turboroom",
//     content: "Your mom said it's time to come home",
//     type: "text",
//     createAt: new Date(),
//   },
// ]),
let message2 = ref<Message[]>([
  {
    id: 2,
    userId: "jinshu",
    roomId: "turboroom",
    content: "Your mom said it's time to come home",
    type: "text",
    createAt: new Date(),
  },
  {
    id: 3,
    userId: "yh",
    roomId: "turboroom",
    content: "i kown",
    type: "text",
    createAt: new Date(),
  },
  {
    id: 3,
    userId: "yh",
    roomId: "turboroom",
    content: "i kown",
    type: "text",
    createAt: new Date(),
  },
  {
    id: 3,
    userId: "yh",
    roomId: "turboroom",
    content: "i kown",
    type: "text",
    createAt: new Date(),
  },
  {
    id: 3,
    userId: "yh",
    roomId: "turboroom",
    content: "i kown",
    type: "text",
    createAt: new Date(),
  },
  {
    id: 3,
    userId: "yh",
    roomId: "turboroom",
    content: "i kown",
    type: "text",
    createAt: new Date(),
  },
]);

const border = computed(() =>
  themeStore.dark ? "border-[#232323]" : "border-[#e9e9e9]"
);

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

const removeMessage = (e, message) => {
  console.log("chatMessage,removeMessage");
  // e.preventDefault();
  // lastChangedIndex.value = props.messages.indexOf(message);
  // props.setMessages((messages) =>
  //   messages.filter((m) => m.id !== message.id)
  // );
};

const animatingMessages = ref(props.messages.slice(lastChangedIndex.value));

const onMouseEnter = (event: MouseEvent) => {
  console.log(event.currentTarget);
  (event.currentTarget as HTMLElement).classList.remove("chatlist");
  (event.currentTarget as HTMLElement).classList.add("chatlist_");
};
const onMouseLeave = (event: MouseEvent) => {
  console.log("leave");
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
./types
