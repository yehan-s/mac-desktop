<template>
  <div
    class="z-30 transform scale-110 w-full h-full fixed bg-center bg-cover"
    :style="{ backgroundImage: `url(${wallpapers.day})` }"
    :class="isShow"
  >
    <div class="absolute w-full h-full bg-gray-900/20 backdrop-blur-2xl">
      <!-- Search Input -->
      <div
        class="flex w-64 mx-auto mt-12 border rounded-md bg-gray-200/10 border-gray-200/30"
        @focus="setFocus(true)"
        @blur="setFocus(false)"
      >
        <div
          class="my-1 flex items-center justify-end"
          :class="[
            focus
              ? 'w-6 duration-200 bg-blue-300'
              : 'w-26 delay-250 bg-red-400',
          ]"
        >
          <span class="text-white">
            <Search :size="16" />
          </span>
        </div>
        <input
          class="flex-1 min-w-0 px-1 text-sm text-white bg-transparent outline-none"
          placeholder="Search"
          value=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { useLaunchpadStore } from "~/store/launchpad";

const launchpadStore = useLaunchpadStore();

let isShow = launchpadStore.show
  ? ""
  : "opacity-0 invisible transition-opacity duration-200";

const focus: Ref<boolean> = ref(false);
const setFocus = (value: boolean) => {
  focus.value = value;
};
// watchEffect(() => {
//   const clickDesktopHandle = () => {
//     launchpadStore.setShow(false);
//   };
//   document.addEventListener("click", clickDesktopHandle);
// });

const wallpapers = {
  day: "img/ui/wallpaper-day.jpg",
  night: "img/ui/wallpaper-night.jpg",
};

const wallpaper = ref(wallpapers.day);

// :style="backgroundImage:`url(${wallpapers.day})`"
</script>

<style scoped></style>
