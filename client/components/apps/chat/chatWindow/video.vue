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
      我的本地视频：<video ref="myVideoRef" id="local" autoplay></video>
      远程连接拿到我的本地视频<video
        ref="otherVideoRef"
        id="local-from-remote"
        autoplay
      ></video>
      <template #footer>
        <Button
          label="Cancel"
          text
          severity="secondary"
          @click="visible = false"
          autofocus
        />
        <Button
          label="Save"
          outlined
          severity="secondary"
          @click="visible = false"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import persets from "~/config/persets";
import { useThemeStore } from "~/store/theme";
import { useChatStore } from "~/store/chat";
const themeStore = useThemeStore();
const chatStore = useChatStore();
const textColor = computed(() =>
  themeStore.dark ? "text-[#fff]" : "text-[#000]"
);

// 视频开关
const videoHandler = () => {
  chatStore.videoIsOpen = true;
  // 等待dom渲染完成 再进行初始化
  nextTick(() => {
    chatStore.myVideoRef = myVideoRef.value;
    chatStore.otherVideoRef = otherVideoRef.value;
    // chatStore.initStream();
    chatStore.requestVideoCall();
    // chatStore.initSocket();
  });
};
// 后续被动打开音视频
watch(
  () => chatStore.videoIsOpen,
  (newVal) => {
    console.log("进入watch", newVal);
    if (newVal) {
      nextTick(() => {
        chatStore.myVideoRef = myVideoRef.value;
        chatStore.otherVideoRef = otherVideoRef.value;
        console.log("检测一下", chatStore.myVideoRef);
      });
    }
  },
  { deep: true }
);

let visible = ref(false);

const myVideoRef = ref(null);
const otherVideoRef = ref(null);
</script>