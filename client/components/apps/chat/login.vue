<template>
  <div
    class="flex flex-col w-80 h-[500px] space-y-4 overflow-hidden bg-center bg-cover rounded-b-md p-[32px]"
    :style="{ backgroundImage }"
  >
    <div class="mt-[32px] mb-[12px] flex-center">
      <img
        :src="chatIcon"
        class="bg-white rounded-full"
        width="80"
        height="80"
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

<script setup>
import { ref } from "vue";
// import { useUserStore } from '@/store';
// import { Login } from 'api/login';

let username = ref("");
let password = ref("");
const check = ref(false);

const backgroundImage = "url(img/ui/loginbg.png)";
const chatIcon = "img/icons/qq.png";

// const userStore = useUserStore();

const setUsername = (value) => {
  //   username.value = value;
};

const setPassword = (value) => {
  //   password.value = value;
};

const toggleCheck = () => {
    check.value = !check.value;
};

const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     loginHandler();
  //   }
};

const loginHandler = async () => {
  //   if (!check.value) return;
  //   try {
  //     const res = await Login({ username: username.value, password: password.value });
  //     const data = res.data as LoginData;
  //     userStore.setUserInfo(data.userInfo);
  //     localStorage.setItem('token', data.token);
  //     localStorage.setItem('userId', data.userInfo.id);
  //     if (userStore.userInfo.username) {
  //       // Assuming closeApp and openApp are similar functions in the Vue store
  //       // closeApp('login');
  //       // openApp('qq');
  //     }
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  console.log(username.value);
  console.log("loginHandler", username.value, password.value);
};
</script>

<style scoped>
/* Add your styles here */
</style>
