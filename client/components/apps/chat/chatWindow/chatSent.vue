<!-- 发送消息下侧表情  -->
<!-- 这里高度只限定180 -->
<template>
  <div class="h-[180px] flex flex-col">
    <div class="flex h-[40px] space-x-2 border-t" :class="[border]">
      <Icon name="smail" desc="表情" />
      <Icon name="sc" desc="截图" />
      <Icon name="file" desc="文件" />
      <Icon name="img" desc="照片" />
      <Icon name="voice" desc="语音输入" />
      <div class="flex-1"></div>
      <Icon name="record" desc="历史记录" />
    </div>
    <div class="flex-1">
      <textarea
        name=""
        id=""
        class="w-full h-full px-3 py-2 overflow-y-scroll resize-none focus:outline-none focus:shadow-outline chatlist overflow-x:hidden scroll-smooth"
        :class="[bg]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @keyDown.enter="sendMessage"
        @change="changeMessage"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "./icon.vue";
import { useThemeStore } from "~/store/theme";
const themeStore = useThemeStore();

const border = computed(() =>
  themeStore.dark ? "border-[#232323]" : "border-[#e0e0e0]"
);
const bg = computed(() => (themeStore.dark ? "bg-red-100" : "bg-gray-500"));

const sendMessage = (e: any) => {
  console.log("sendMessage " + e.currentTarget);
};
const changeMessage = (e: any) => {
  console.log("changeMessage " + e.currentTarget);
};

const onMouseEnter = (event: MouseEvent) => {
  (event.currentTarget as HTMLElement).classList.remove("chatlist");
  (event.currentTarget as HTMLElement).classList.add("chatlist_");
};
const onMouseLeave = (event: MouseEvent) => {
  (event.currentTarget as HTMLElement).classList.remove("chatlist_");
  (event.currentTarget as HTMLElement).classList.add("chatlist");
};
</script>

<style scoped></style>
