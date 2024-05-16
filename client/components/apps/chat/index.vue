<template>
  <div class="w-full">
    <!-- <SideBar :dark="dark" /> -->
    <!-- <ChatList /> -->
    <!-- <div v-if="flag" class="flex-1 flex-center"> -->
    <!-- <ChatWindw :messages="messages" @updateMessages="updateMessages" /> -->
    <!-- </div> -->
    <!-- <div v-else class="flex-1 flex-center">
        <img :src="src" alt="123" class="w-[140px] h-[140px]" />
      </div> -->

    <Login v-if="!userStore.login" />
    <Main v-else></Main>
  </div>
</template>

<script setup>
//   import { ref, onMounted, onUnmounted } from 'vue';
//   import { useUserStore } from '@/store';
//   import { useThemeStore } from '@/store';
//   import { socket } from '@/lib';
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
import Login from "./login.vue";
import Main from "./main.vue";

//   const userInfo = useUserStore(s => s.userInfo);
//   const messages = ref<Message[]>([]);

const dark = ref(false);
const flag = ref(true);
const src = dark.value ? "/qq/logo/qq_dark.svg" : "/qq/logo/qq_.svg";

//   const updateMessages = (newMessages: Message[]) => {
//     messages.value = newMessages;
//   };

//   onMounted(() => {
//     socket.connect();
//     socket.on('connect', () => {
//       // console.log('connect');
//     });

//     socket.on('getMessages', (data) => {
//       if (data) {
//         updateMessages(data);
//       }
//     });

//     socket.on('disconnect', () => {
//       // do something
//     });
//   });

//   onUnmounted(() => {
//     socket.disconnect();
//   });
</script>
