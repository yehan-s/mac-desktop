<template>
  <div>
    <TransitionGroup>
      <Transition v-for="item in appStore.showApps" :key="item">
        <Window :appName="item" />
      </Transition>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import Window from "~/components/window/window.vue";

import { useAppStore } from "~/store/app";
const appStore = useAppStore();
appStore.showApps.push('mdDoc')
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
