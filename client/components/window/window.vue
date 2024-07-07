<template>
  <div
    ref="refWindow"
    v-show="isMinimize"
    class="absolute rounded-xl min-w-52 min-h-52"
    v-draggable="options"
    :class="{ 'w-full h-full': isMax, 'z-50': isFocus }"
    @mousedown="setFocus"
  >
    <!-- bg-transparent -->
    <div
      @dblclick="toggleMax"
      class="absolute z-30 flex w-full h-7 window-header rounded-t-xl bg-transparent"
    >
      <TrafficHeader
        class="z-10"
        :appName="props.appName"
        :isMax="isMax"
        @handleMax="handleMax"
        @handleMini="handleMini"
      />
    </div>
    <!-- 存放app -->
    <!-- 第一步存放在这，第二部docker栏设置 -->
    <div class="relative w-full h-full ">
      <Chat v-if="props.appName === 'turbochat'" />
      <Launchpad v-if="props.appName === 'launchpad'" />
      <Vsc v-if="props.appName === 'vsc'" />
      <Terminal v-if="props.appName === 'terminal'" />
      <AiChat v-if="props.appName === 'aichat'" />

      <!-- <ContentDoc
        v-if="props.appName === 'mdDoc'"
        class="prose rounded-xl p-2 dark:bg-[#202020] dark:text-[#cbc9c9] bg-[#faf7f5] text-[#333c4d]"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from "vue";
import TrafficHeader from "@/components/window/trafficLight.vue";
import Chat from "@/components/apps/chat/index.vue";
import Vsc from "@/components/apps/vsc/index.vue";
import Terminal from "@/components/apps/terminal/index.vue";
import AiChat from "@/components/apps/aichat/index.vue";
import { vDraggable, type DragOptions } from "@neodrag/vue";
import { useAppStore } from "~/store/app";

const appStore = useAppStore();

let props = defineProps({
  appName: String,
});

// 拖拽配置
let options: DragOptions = reactive({
  // position: { x: 0, y: 32 },
  // bounds: { bottom: -500, top: 32, left: -600, right: -600 },
  bounds: { bottom: -500, top: 0, left: -600, right: -600 },
  handle: ".window-header",
  cancel: ".traffic-lights",
  // disabled: !!max,
});

let refWindow = ref<HTMLElement | null>(null);
const setPosition = (x: number, y: number) => {
  if (refWindow.value) {
    refWindow.value.style.left = `${x}px`;
    refWindow.value.style.top = `${y}px`;
  } else {
    console.error("DOM 元素未挂载");
  }
};

let isMax = ref(false);
const handleMax = () => {
  isMax.value = true;
  const rect = refWindow.value!.getBoundingClientRect();
  const offsetLeft = rect.left + window.pageXOffset;
  const offsetTop = rect.top + window.pageYOffset;
  setPosition(-offsetLeft, -offsetTop);
};
const handleMini = () => {
  isMax.value = false;
};

const toggleMax = () => {
  if (isMax.value) {
    handleMini();
  } else {
    handleMax();
  }
};

const setFocus = () => {
  appStore.setFocus(props.appName);
  // console.log(props.appName);
};

// 监测最小化
let isMinimize = computed(() => {
  return !appStore.minimizeApps.includes(props.appName);
});
// 监测是否聚焦
let isFocus = computed(() => {
  return appStore.focus === props.appName;
});
</script>

<style scoped></style>
