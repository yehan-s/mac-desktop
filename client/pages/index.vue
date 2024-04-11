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
import Wallpapers from "@/utils/wallpapers";
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();

const backgroundStyle = computed(() => {
  // const imageUrl = themeStore.dark ? Wallpapers.NIGHT : Wallpapers.DAY;
  const imageUrl = Wallpapers.GITHUB;
  const filterValue = `brightness(${themeStore.brightness * 0.7 + 50}%)`;
  return {
    backgroundImage: `url(${imageUrl})`,
    filter: filterValue,
  };
});
</script>

<style scoped></style>
