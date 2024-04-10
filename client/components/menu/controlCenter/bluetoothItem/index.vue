<template>
    <div class="flex p-2 space-x-2 h-1/3" @click="changeBluetooth">
      <div
        class="w-[2rem] h-[2rem] rounded-full flex items-center justify-center"
        :class="[isBluetooth ? 'bg-primary' : 'bg-gray-200']"
      >
        <Bluetooth :size="16" :color="isBluetooth ? 'white' : 'black'"/>
      </div>
      <div className="space-y-1 leading-3">
        <p>Bluetooth</p>
        <p>{{ switchText }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Bluetooth } from "lucide-vue-next";

  let isBluetooth = ref(false);
  const changeBluetooth = () => {
    isBluetooth.value = !isBluetooth.value;
  };

  const switchText = computed(() => (isBluetooth.value ? "On" : "Off"));

  </script>
  
  <style scoped></style>
  