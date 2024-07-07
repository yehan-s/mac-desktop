<template>
  <div
    class="flex flex-col w-80 h-[500px] space-y-4 overflow-hidden bg-center bg-cover rounded-b-md p-[32px]"
    :style="{ backgroundImage }"
  >
    <div class="mt-[32px] mb-[12px] flex-center">
      <img
        :src="chatIcon"
        class="bg-white rounded-full"
        width="80px"
        height="80px"
        alt="qqavatar"
      />
    </div>

    <div class="h-[42px] flex text-black font-black">
      <div class="h-full w-[60px] bg-white flex-center"></div>
      <input
        type="text"
        placeholder="Username"
        class="h-full w-[130px] text-lg focus:outline-none"
        v-model="username"
      />
      <div class="h-full w-[60px] bg-white"></div>
    </div>
    <div class="h-[42px] flex text-black font-bold">
      <div class="h-full w-[60px] bg-white flex-center"></div>
      <input
        type="password"
        placeholder="Password"
        class="h-full w-[130px] text-lg focus:outline-none"
        v-model="password"
        @keydown.enter="loginHandler"
      />
      <div class="h-full w-[60px] bg-white"></div>
    </div>
    <div class="text-[12px] flex justify-start items-center text-[#999]">
      <div
      
        class="flex-center w-4 h-4 border-[1px] mr-1 border-[#b2c1cb] rounded-full text-white"
        :class="check ? 'bg-[#0099ff]' : ''"
        @click="toggleCheck"
      >
        {{ check ? "√" : "" }}
      </div>
      已阅读并同意
      <span class="text-primary hover:cursor-pointer">服务协议</span>
      和
      <span class="text-primary hover:cursor-pointer">QQ隐私保护指引</span>
    </div>
    <div>
      <button
        @click="loginHandler"
        class="rounded-lg w-[256px] h-[38px] text-white cursor-pointer"
        :class="username && password ? 'bg-[#0099ff]' : 'bg-[#a7dbfe]'"
      >
        Log In / Sign Up
      </button>
    </div>
    <div class="w-full h-auto pt-[20px] flex-center">
      <span class="text-xs text-primary hover:cursor-pointer">扫码登录</span>
      <span class="mx-2">|</span>
      <span class="text-xs text-primary hover:cursor-pointer">更多选项</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { LoginData } from "~/api/user/types.ts";
// @ts-ignore
import { loginForClient, findUserInfoByUsername } from "~/api/user/index.ts";
import socket from "~/utils/socket";
import { useUserStore } from "~/store/user";
import { useChatListStore } from "~/store/chatList";
import { useChatStore } from "~/store/chat demo";
const userStore = useUserStore();
const chatListStore = useChatListStore();
const chatStore = useChatStore();

let username = ref("yehan");
let password = ref("123");
const check = ref(false);

const backgroundImage = "url(img/ui/loginbg.png)";
const chatIcon = "img/icons/turbochat.png";

// const userStore = useUserStore();

const toggleCheck = () => {
  check.value = !check.value;
};

const loginHandler = async () => {
  let loginData: LoginData = {
    username: username.value,
    password: password.value,
  };
  console.log(loginData);
  let res = await loginForClient(loginData);
  // console.log("res", res);
  // console.log("他的类型是", typeof res);
  if (res) {
    // 让请求头获取到
    const tokenTemp: string = res.access_token as string;
    // console.log("tokenTemp", typeof tokenTemp);
    const token = useCookie("token");
    token.value = tokenTemp;
    userStore.access_token = res.access_token;
  }

  // if (userStore.login) {
  let userInfo = await findUserInfoByUsername(username.value);
  // try {
  // } catch (error) {
  //   console.error("获取用户信息失败", error);
  //   return;
  // }
  // console.log("我想获取到信息", userInfo);
  if (userInfo) {
    userStore.saveUserInfo(userInfo);
    chatStore.setSenderId(userInfo.id);
  }
  // }
  // 记得删掉
  chatStore.connectHandler();

  // console.log("login的时候", userStore.friendGroups);
  // 获取好友分组的信息
  chatListStore.getFGItem(userStore.friendGroups);
  chatListStore.getGroupItem(userStore.groupChats);
  // 放在最后等到信息获取到再跳转
  userStore.login = true;
  // 获取群聊分组的信息
  // chatListStore.getGroupItem(userStore.groupChats);
  // alert("这是登录按钮");

  //   if (!check.value) return;a
  //   try {
  //     const res = await Login({ username: username.value, password: password.value });
  //     const data = res.data as LoginData;
  //     userStore.setUserInfo(data.userInfo);
  //     localStorage.setItem('token', data.token);
  //     localStorage.setItem('userId', data.userInfo.id);
  //     if (userStore.userInfo.username) {p
  //       // Assuming closeApp and openApp are similar functions in the Vue store
  //       // closeApp('login');
  //       // openApp('qq');
  //     }
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // console.log(username.value);
  // console.log("loginHandler", username.value, password.value);
};
onMounted(() => {});
</script>

<style scoped>
/* Add your styles here */
</style>
