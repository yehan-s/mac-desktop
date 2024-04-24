<template>
  <div
    class="flex flex-col w-full h-full space-y-4 overflow-hidden bg-center bg-cover rounded-b-md p-[32px]"
    :class="'bg-red-300'"
  >
    <!-- :style="{ backgroundImage: url('/img/ui/loginbg.png') }" -->
    <!-- 头像 -->
    <div class="mt-[32px] mb-[12px] flex-center">
      <img
        :src="img"
        class="bg-white rounded-full"
        width="80"
        height="80"
        alt="qqavatar"
      />
    </div>
    <!-- 账号框 -->
    <!-- <div class="h-[42px] flex text-black font-black">
      <div class="h-full w-[60px] bg-white flex-center"></div>
      <input
        type="text"
        placeholder="Username"
        class="h-full w-[130px] text-lg focus:outline-none"
        v-model="username"
      />
      <div class="h-full w-[60px] bg-white"></div>
    </div> -->
    <!-- 密码框 -->
    <!-- <div class="h-[42px] flex text-black font-bold">
      <div class="h-full w-[60px] bg-white flex-center"></div>
      <input
        type="password"
        placeholder="Password"
        class="h-full w-[130px] text-lg focus:outline-none"
        v-model="password"
        @keydown.enter="loginHandler"
      />
      <div class="h-full w-[60px] bg-white"></div>
    </div> -->
    <!-- 记住密码 -->
    <!-- <div class="text-[12px] flex justify-start items-center text-[#999]">
      <div
        class="flex-center w-4 h-4 border-[1px] mr-1 border-[#b2c1cb] rounded-full text-white"
        :class="{ 'bg-[#0099ff]': check }"
        @click="setCheck(!check)"
      >
        {{ check ? "√" : "" }}
      </div>
      已阅读并同意
      <span class="text-primary hover:cursor-pointer">服务协议</span>
      和
      <span class="text-primary hover:cursor-pointer">QQ隐私保护指引</span>
    </div> -->
    <!-- 登录按钮 -->
    <!-- <div>
      <button
        @click="loginHandler"
        class="rounded-lg w-[256px] h-[38px] text-white cursor-pointer"
        :class="{ 'bg-[#0099ff]': !!username && !!password }"
      >
        Log In / Sign Up
      </button>
    </div> -->
    <!-- 扫码登录 -->
    <!-- <div class="w-full h-auto pt-[20px] flex-center">
      <span class="text-xs text-primary hover:cursor-pointer">扫码登录</span>
      <span class="mx-2">|</span>
      <span class="text-xs text-primary hover:cursor-pointer">更多选项</span>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { useUserStore } from '@/store';
// import { Login } from 'api/login';
// import { useAppsStore } from '@/store';

const username = ref("");
const password = ref("");
const check = ref(true);
const img = "img/icons/launchpad.png";
// const setUserInfo = useUserStore(s => s.setUserInfo);
// const userInfo = useUserStore(s => s.userInfo);
// const [openApp, closeApp] = useAppsStore(s => [s.openApp, s.closeApp], shallow);

const loginHandler = async () => {
  alert("login");
  // try {
  //   const res = await Login({ username: username.value, password: password.value });
  //   const data = res.data as LoginData;
  //   // setUserInfo(data.userInfo);
  //   localStorage.setItem('token', data.token);
  //   localStorage.setItem('userId', data.userInfo.id);
  //   if (userInfo.username) {
  //     closeApp('login');
  //     openApp('qq');
  //   }
  // } catch (error) {
  //   // Handle error
  //   console.error('Login failed:', error);
  // }
};
</script>
