<template>
  <div
    class="flex p-3 py-4 rounded-[13px] h-16 border shadow"
    @click="changeBrightness"
    :class="bg"
  >
    <div
      class="flex justify-center items-center w-8 h-8 text-center rounded-full"
      :class="[isEyeMode ? 'bg-primary' : 'bg-gray-200']"
    >
      <Eye v-show="false" :size="16" :color="isEyeMode ? 'white' : 'black'" />
      <EyeOff v-show="true" :size="16" :color="isEyeMode ? 'white' : 'black'" />
    </div>
    <div
      class="space-y-1 leading-3 ml-1 flex justify-center items-center"
      :class="[themeStore.dark ? 'text-white' : 'text-black']"
    >
      <p>Eye Protection</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";
import { useThemeStore } from "~/store/theme";
const themeStore = useThemeStore();
let isEyeMode = ref(false);

const changeBrightness = () => {
  if (!isEyeMode.value) {
    themeStore.brightness = themeStore.brightness / 2;
  } else {
    themeStore.brightness = themeStore.brightness * 2;
  }
  isEyeMode.value = !isEyeMode.value;
};

let bg = computed(() => {
  return themeStore.dark ? "bg-[#2d3440]/90 border-gray-500" : "bg-white/50";
});
</script>

<style scoped></style>
