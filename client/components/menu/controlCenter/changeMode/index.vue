<template>
  <div
    class="flex p-3 py-4 rounded-[13px] h-16 border shadow"
    :class="bg"
    @click="themeStore.setDark(!themeStore.dark)"
  >
    <div
      class="flex justify-center items-center w-8 h-8 text-center rounded-full"
      :class="[themeStore.dark ? 'bg-primary' : 'bg-gray-200']"
    >
      <Moon v-show="themeStore.dark" :size="16" />
      <Sun v-show="!themeStore.dark" :size="16" color="black" />
    </div>
    <div
      class="space-y-1 leading-3 ml-1 flex justify-center items-center"
      :class="[themeStore.dark ? 'text-white' : 'text-black']"
    >
      {{ themeStore.dark ? "Dark Mode" : "Light Mode" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import { useThemeStore } from "~/store/theme";
const themeStore = useThemeStore();

let bg = computed(() => {
  return themeStore.dark ? "bg-[#2d3440]/90 border-gray-500" : "bg-white/50";
});
</script>

<style scoped></style>
