<template>
  <div ref="menuRef" class="absolute text-black rounded-md w-48 cursor-pointer font-md bg-white/70 top-7">
    <ul class="p-1">
      <li class="appleMenuItem">About This Mac</li>
      <div class="menuDivider"></div>
      <li class="appleMenuItem">Systeam Prefrences...</li>
      <li class="appleMenuItem">Apple Store...</li>
      <div class="menuDivider"></div>
      <li class="appleMenuItem">Recent Items</li>
      <div class="menuDivider"></div>
      <li class="appleMenuItem">Force Quit...</li>
      <div class="menuDivider"></div>
      <li class="appleMenuItem">Sleep</li>
      <li class="appleMenuItem">Restart...</li>
      <li class="appleMenuItem">Shut Down...</li>
      <div class="menuDivider"></div>
      <li class="appleMenuItem">Lock Screen</li>
      <li class="appleMenuItem">Log Out...</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useControlStore } from '@/store/control';
import { useClickOutside } from '@/utils/useClickOutside';

let controlStore = useControlStore();
const menuRef = useClickOutside(() => {
  controlStore.appleMenuSwitch(false);
});
</script>

<style scoped></style>
