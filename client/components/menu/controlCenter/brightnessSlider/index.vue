<template>
  <div class="flex flex-col p-2 my-2 rounded-[13px] bg-white/50">
    <div class="flex w-full slider">
      <div
        class="flex items-center justify-center bg-gray-100 border-gray-300 rounded-l-full w-7 h-7"
      >
        <Sun :size="16" color="black" />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        :value="themeStore.brightness"
        @input="
          (e: Event) =>
            themeStore.setBrightness((e.target as HTMLInputElement).value)
        "
        class="range rounded-l-none range-lg h-7 [--range-shdw:#f3f4f6] "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sun } from "lucide-vue-next";
import { useThemeStore } from "@/store/theme";
let themeStore = useThemeStore();
</script>

<style scoped></style>
