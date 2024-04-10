<template>
  <div
    ref="menuRef"
    class="absolute p-3 rounded-[13px] w-80  top-7 -left-44 flex flex-col shadow"
    :class="[themeStore.dark ? 'bg-[#1a2133]/90 ' : 'bg-white/40']"
  >
    <div class="flex w-full">
      <!-- 左侧 -->
      <div
        class="flex flex-col rounded-[13px] border shadow w-40 h-36"
        :class="[bg, themeStore.dark ? 'text-white' : 'text-black']"
      >
        <WifiItem />
        <BluetoothItem />
        <FullScreenItem />
      </div>
      <!-- 右侧 -->
      <div class="flex flex-col justify-between ml-3 w-72  h-36">
        <!-- 日夜模式 -->
        <ChangeMode />
        <!-- 护眼模式 -->
        <div class="flex">
          <EyeMode />
        </div>
      </div>
    </div>
    <!-- Display -->
    <BrightnessSlider />
    <!-- 声音 -->
    <SoundSlider />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import WifiItem from "./wifiItem/index.vue";
import BluetoothItem from "./bluetoothItem/index.vue";
import FullScreenItem from "./fullScreenItem/index.vue";
import EyeMode from "./eyeMode/index.vue";
import ChangeMode from "./changeMode/index.vue";
import BrightnessSlider from "./brightnessSlider/index.vue";
import SoundSlider from "./soundSlider/index.vue";
import { useThemeStore } from "~/store/theme";
import { useControlStore } from "~/store/control";
import { useClickOutside } from "#imports";

const themeStore = useThemeStore();
const controlStore = useControlStore();
let { dark } = storeToRefs(themeStore);

let bg = computed(() => {
  return dark.value ? "bg-[#2d3440]/90 border-gray-500" : "bg-white/50";
});

// click outside
const menuRef = useClickOutside(() => {
  controlStore.controlCenterSwitch(false);
});
</script>

<style scoped></style>
