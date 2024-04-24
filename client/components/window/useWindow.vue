<template>
  <div>
    <Window v-for="item in appStore.showApps" :appName="item" />
  </div>
</template>

<script setup lang="ts">
import Window from "~/components/window/window.vue";

import { useAppStore } from "~/store/app";
const appStore = useAppStore();
</script>

<style scoped></style>
