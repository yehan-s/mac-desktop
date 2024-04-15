<template>
  <div
    class="w-screen h-screen overflow-hidden bg-center bg-cover"
    :style="backgroundStyle"
  >
    <Topbar />
    <!-- <Launchpad /> -->
    <ClientOnly>
      <!-- <appChat /> -->
      <!-- <Chat /> -->
    </ClientOnly>
    <UseWindow />
    <ClientOnly>
      <Dock />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// import Dock from "primevue/dock";
import Chat from "@/components/apps/chat/index.vue";
import trafficLight from "~/components/window/trafficLight.vue";
import window from "~/components/window/window.vue";
import UseWindow from "~/components/window/useWindow.vue";
import Wallpapers from "@/utils/wallpapers";
import { useThemeStore } from "~/store/theme";
import { useAppStore } from "~/store/app";
const themeStore = useThemeStore();
const appStore = useAppStore();

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
