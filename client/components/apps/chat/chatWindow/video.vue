<template>
  <div>
    <Dialog
      v-model:visible="chatStore.videoIsOpen"
      modal
      :pt="persets.dialog"
      :draggable="true"
      :closable="true"
      header="视频通话"
      :style="{ width: '25rem' }"
    >
      <!-- <template #header>
        <div class="inline-flex items-center justify-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <span class="font-bold white-space-nowrap">Amy Elsner</span>
        </div>
        
      </template> -->
      <!-- INITIAL | RECEIVE -->
      <div v-if="chatStore.callStatus != CallStatus.CALLING">
        <!-- 发起方 -->
        <div
          class="flex-center flex-col h-64 gap-4"
          v-if="chatStore.callStatus === CallStatus.INITIATE"
        >
          <div class="avatar">
            <div class="w-32 rounded">
              <img :src="chatStore.currentChat.privateObject.avatar" />
            </div>
          </div>
          <div>
            对{{ chatStore.currentChat.privateObject.nickname }}发起视频通话
          </div>
          <div ref="timeRef">00:00:00</div>
          <img
            class="w-8 h-8"
            :src="CallIcons.REJECT"
            alt=""
            @click="chatStore.closeVideo"
          />
        </div>
        <!-- 接收方 -->
        <div class="flex-center flex-col h-64 gap-4" v-else>
          <div class="avatar">
            <div class="w-32 rounded">
              <img :src="chatStore.receiveVideoInfo.avatar" />
            </div>
          </div>
          <div>{{ chatStore.receiveVideoInfo.nickname }}发起的视频通话</div>
          <div class="flex justify-around">
            <img
              class="w-8 h-8 mr-14"
              :src="CallIcons.ACCEPT"
              alt=""
              @click="chatStore.acceptVideoCall"
            />
            <img
              class="w-8 h-8"
              :src="CallIcons.REJECT"
              alt=""
              @click="chatStore.closeVideo"
            />
          </div>
        </div>
      </div>

      <!-- CALLING -->
      <div v-else class="relative">
        <video
          class="w-96"
          ref="otherVideoRef"
          id="local-from-remote"
          autoplay
        ></video>
        <video
          ref="myVideoRef"
          id="local"
          autoplay
          class="w-24 absolute right-0 top-0 z-50"
        ></video>
        <!-- {{ countTime }} -->
        <div
          ref="timeRef"
          class="absolute bottom-14 left-[50%] -translate-x-[50%]"
        >
          00:00:00
        </div>
        <img
          class="w-8 h-8 absolute bottom-4 left-[50%] -translate-x-[50%]"
          :src="CallIcons.REJECT"
          alt=""
          @click="chatStore.closeVideo"
        />
      </div>

      <template #footer> </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import persets from "~/config/persets";
import { CallIcons } from "~/public/chat";
import { CallStatus } from "~/types/video";
import { useThemeStore } from "~/store/theme";
import { useChatStore } from "~/store/chat";
import { useUserStore } from "~/store/user";
const themeStore = useThemeStore();
const chatStore = useChatStore();
const userStore = useUserStore();
const textColor = computed(() =>
  themeStore.dark ? "text-[#fff]" : "text-[#000]"
);
let currentTime = ref(0);
let timer: any;
const timeRef = ref(null);
let startTime: number, endTime: number, pausedTime: number;
let running = false,
  paused = false;

// 更新最新的时间
function updateTimerDisplay(time: number) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor(time % 60);
  // 不取整，保留的是毫秒
  // let seconds = time % 60;
  if (timeRef.value) {
    (timeRef.value as HTMLElement).textContent =
      `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
}
// 开始计时
function startTimer() {
  if (!running) {
    startTime = Date.now() - 0;
    running = true;
    paused = false;
    // 浏览器的requestAnimationFrame方法，它是专门为动画提供的API，可以保持最佳的绘制性能
    // 通过递归调用，每次调用都会在浏览器下一次重绘之前调用
    // 每秒60次，但是不保证每次都是60次
    requestAnimationFrame(animateTimer);
  }
}
// 暂停计时
function pauseTimer() {
  if (running && !paused) {
    // pausedTime = Date.now() - startTime;
    currentTime.value = 0;
    running = false;
    paused = true;
  }
}
function animateTimer() {
  if (running) {
    currentTime.value = Date.now() - startTime;
    // 除以1000，是因为currentTime是毫秒，而我们需要的是秒
    updateTimerDisplay(currentTime.value / 1000); // 将毫秒转换为秒
    requestAnimationFrame(animateTimer);
  }
}

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

// 监测对话框的开启
watch(
  () => chatStore.videoIsOpen,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        // 发起通话开始计时，超过则进行处理
        if (chatStore.callStatus === CallStatus.INITIATE) {
          console.log("开启通话计时");
          startTimer();
        }
        chatStore.myVideoRef = myVideoRef.value;
        chatStore.otherVideoRef = otherVideoRef.value;
        console.log("检测一下", chatStore.myVideoRef);
        console.log("检测一下", chatStore.receiveVideoInfo);
      });
    }
  },
  { deep: true }
);

// 监测通话状态
watch(
  () => chatStore.callStatus,
  (newVal, oldVal) => {
    console.log("进入callStatus检测", newVal);
    // 进入通话
    if (newVal === CallStatus.CALLING) {
      nextTick(() => {
        chatStore.myVideoRef = myVideoRef.value;
        chatStore.otherVideoRef = otherVideoRef.value;
        console.log("检测一下", chatStore.myVideoRef);
        // 双方重新开始计时
        // 如果是请求方，需要先清空之前的计时
        if (oldVal === CallStatus.INITIATE) {
          pauseTimer();
        }
        startTimer();
      });
    }
    // 监测到CLOSED就会触发
    if (newVal === CallStatus.CLOSED) {
      pauseTimer();
      // 通话结束
      if (oldVal === CallStatus.CALLING) {
        console.log(timeRef.value);
        if (timeRef.value) {
          console.log((timeRef.value as HTMLElement).textContent);
          if (chatStore.myInfo.room) {
            chatStore.sendPrivateMessage(
              ("通话时长:" +
                (timeRef.value as HTMLElement).textContent) as string
            );
          }
        }
      }
    }
  },
  { deep: true }
);

// 监测通话计时
// 通话超时，进行处理
watch(
  currentTime,
  (newVal) => {
    // 超时 关闭对话框 关闭定时
    if (chatStore.callStatus === CallStatus.INITIATE && newVal > 5000) {
      // window.alert("通话超时");
      useNuxtApp().$toast.add({
        severity: "warn",
        detail: "通话超时",
        life: 3000,
      });
      chatStore.closeVideo();
      pauseTimer();
    }
  },
  {
    deep: true,
  }
);

let visible = ref(false);

const myVideoRef = ref(null);
const otherVideoRef = ref(null);
</script>
