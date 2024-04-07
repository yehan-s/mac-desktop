<template>
  <div
    class="w-screen h-screen overflow-hidden bg-center bg-cover"
    :style="backgroundStyle"
  >
    <Topbar />
    <!-- <Launchpad /> -->
    <ClientOnly>
      <Dock />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// import Dock from "primevue/dock";
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();

// Nuxt 不加前缀默认取public下
const wallpapers = {
  day: "img/ui/wallpaper-day.jpg",
  night: "img/ui/wallpaper-night.jpg",
};

const backgroundStyle = computed(() => {
  const imageUrl = themeStore.dark ? wallpapers.night : wallpapers.day;
  const filterValue = `brightness(${themeStore.brightness * 0.7 + 50}%)`;
  return {
    backgroundImage: `url(${imageUrl})`,
    filter: filterValue,
  };
});
</script>

<style scoped></style>
