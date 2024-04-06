<template>
  <div
    ref="menuRef"
    class="absolute w-56 h-10 px-4 rounded-md -left-28 top-7"
    :class="[dark ? 'bg-black/40 text-white/80' : 'bg-white/80 text-black']"
  >
    <label class="cursor-pointer label">
      <span class="font-medium">Wi-Fi</span>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        :checked="controlStore.wifi"
        @click="controlStore.wifiSwitch(!controlStore.wifi)"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/theme";
import { useControlStore } from "@/store/control";
import { useClickOutside } from "@/utils/useClickOutside";

const themeStore = useThemeStore();
const controlStore = useControlStore();
let { dark } = storeToRefs(themeStore);

// click outside
const menuRef =  useClickOutside(() => {
  controlStore.wifiMenuSwitch(false);
});
</script>

<style scoped></style>
