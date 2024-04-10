<template>
  <div class="flex p-2 space-x-2 h-1/3" @click="changeScreen">
    <div
      class="w-[2rem] h-[2rem] rounded-full flex items-center justify-center"
      :class="[isFull ? 'bg-primary' : 'bg-gray-200']"
    >
      <Expand :size="16" :color="isFull ? 'white' : 'black'" />
    </div>
    <div className="space-y-1 leading-3">
      <p>Bluetooth</p>
      <p>{{ switchText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Expand } from "lucide-vue-next";
import { useControlStore } from "@/store/control";
const controlStore = useControlStore();
const switchText = computed(() => (isFull ? "On" : "Off"));

let isFull = ref(false)
const changeScreen = () => {
  if(!isFull.value) {
    document.documentElement.requestFullscreen()
    isFull.value = !isFull.value
  } else {
    document.exitFullscreen()
    isFull.value = !isFull.value
  }
}
</script>

<style scoped></style>
