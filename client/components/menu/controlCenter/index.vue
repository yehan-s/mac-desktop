<template>
  <div
    ref="menuRef"
    class="absolute p-3 rounded-[13px] w-80 h-96 top-7 -left-44 flex flex-col shadow"
    :class="[themeStore.dark ? 'bg-[#1a2133]/90 ' : 'bg-white/40']"
  >
    <div class="flex w-full">
      <!-- left -->
      <div
        class="flex mr-3 rounded-[13px] border shadow w-40 h-36"
        :class="[dark ? 'bg-[#2d3440]/90 border-gray-500' : 'bg-white/50']"
      ></div>
      <!-- right -->
      <div class="flex flex-col w-40 shadow h-36">
        <!-- Change Mode -->
        <div
          class="flex p-3 py-4 rounded-[13px] h-16 border shadow"
          :class="[dark ? 'bg-[#2d3440]/90 border-gray-500' : 'bg-white/50']"
          @click="themeStore.setDark(!themeStore.dark)"
        >
          <!-- Icon -->
          <div
            class="w-8 h-8 py-[5px] text-center border rounded-full flex justify-center items-center"
            :class="[dark ? 'bg-primary' : 'bg-gray-200']"
          >
            <Moon v-show="dark" theme="filled" size="16" fill="#fff" />
            <SunOne v-show="!dark" theme="outline" size="16" fill="#000000" />
          </div>
          <h2
            class="align-middle py-[5px] pl-2 font-medium"
            :class="[dark ? 'text-white' : 'text-black']"
          >
            {{ dark ? "Dark Mode" : "Light Mode" }}
          </h2>
        </div>
        <div class="flex h-16">
          <div></div>
          <h2>keyboard</h2>
        </div>
      </div>
    </div>
    <!-- Display -->
    <div class="flex flex-col p-2 my-2 rounded-[13px] bg-white/50">
      <div class="flex w-full slider">
        <div
          class="flex items-center justify-center bg-gray-100 border-gray-300 rounded-l-full w-7 h-7"
        >
          <SunOne theme="outline" size="12" fill="#000" />
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
          class="range rounded-l-none range-lg h-full [--range-shdw:#fff]"
        />
      </div>
    </div>
    <!-- Sound -->
    <div class="flex flex-col p-2 my-2 rounded-[13px] bg-white/50">
      <div class="flex w-full slider">
        <div
          class="flex items-center justify-center bg-gray-100 border-gray-300 rounded-l-full w-7 h-7"
        >
          <Headset theme="outline" size="12" fill="#000" />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          :value="themeStore.sound"
          @input="
            (e: Event) =>
              themeStore.setSound((e.target as HTMLInputElement).value)
          "
          class="range rounded-l-none range-lg h-full [--range-shdw:#fff]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Moon, SunOne, Headset } from "@icon-park/vue-next";
import { useThemeStore } from "~/store/theme";
import { useControlStore } from "~/store/control";
import { useClickOutside } from "#imports";

const themeStore = useThemeStore();
const controlStore = useControlStore();
let { dark } = storeToRefs(themeStore);

// click outside
const menuRef = useClickOutside(() => {
  controlStore.controlCenterSwitch(false);
});
</script>

<style scoped></style>
