<template>
  <div class="absolute rounded-xl w-52 h-52" v-draggable="options">
    <!-- bg-transparent -->
    <div
      class="absolute z-50 flex w-full h-7 window-header rounded-t-xl bg-red-300"
    >
      <TrafficHeader />
    </div>
    <div class="relative w-full h-full bg-green-200">hellp yehan!</div>
  </div>
</template>

<script setup lang="ts">
import TrafficHeader from "@/components/window/trafficLight.vue";
import { vDraggable, type DragOptions } from "@neodrag/vue";

const options: DragOptions = {
  bounds: { bottom: -500, top: 32, left: -600, right: -600 },
  handle: ".window-header",
  cancel: ".traffic-lights",
  // disabled: !!max,
};
</script>

<style scoped></style>
