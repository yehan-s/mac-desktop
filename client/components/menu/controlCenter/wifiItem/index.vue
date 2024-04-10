<template>
  <div class="flex p-2 space-x-2 h-1/3" @click="switchWifi">
    <div
      class="w-[2rem] h-[2rem] rounded-full flex items-center justify-center"
      :class="[controlStore.wifi ? 'bg-primary' : 'bg-gray-200']"
    >
      <Wifi :size="16" :color="controlStore.wifi ? 'white' : 'black'" />
    </div>
    <div className="space-y-1 leading-3">
      <p>Wi-Fi</p>
      <p>{{ switchText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Wifi } from "lucide-vue-next";
import { useControlStore } from "@/store/control";
const controlStore = useControlStore();
const switchText = computed(() => (controlStore.wifi ? "On" : "Off"));
const switchWifi = () => controlStore.wifiSwitch(!controlStore.wifi);
</script>

<style scoped></style>
