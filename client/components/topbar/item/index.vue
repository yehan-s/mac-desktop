<template>
  <div class="px-1 pt-1 pb-1 rounded hover:bg-gray-400" @click.stop="switchMenu">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useControlStore } from "~/store/control";
const controlStore = useControlStore();

// 获取props
const props = defineProps({
  mo: String,
  value: Boolean,
});

const switchMenu = () => {
  console.log(props.mo,props.value);
  // 如果传入了mo则是一个菜单开关
  if (props.mo) {
    controlStore[props.mo](!props.value);
    // console.log(props.mo);
    console.log(controlStore.showWifiMenu,props.value);
  }
};
</script>

<style scoped></style>
