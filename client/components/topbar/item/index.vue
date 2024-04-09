<template>
  <div
    class="px-1  rounded w-full h-full flex items-center hover:bg-gray-400"
    @click.stop="switchMenu"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useControlStore } from "~/store/control";
const controlStore = useControlStore();

// 获取props 第一个值是要触发的事件名，第二值是带入的参数
const props = defineProps({
  mo: String,
  value: Boolean,
});

const switchMenu = () => {
  console.log(props.mo, props.value);
  // 如果传入了mo则是一个菜单开关
  if (props.mo) {
    controlStore[props.mo](!props.value);
    // console.log(props.mo);
    console.log(controlStore.showWifiMenu, props.value);
  }
};
</script>

<style scoped></style>
