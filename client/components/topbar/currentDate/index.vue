<template>
  <div :class="[themeStore.dark ? '' : 'text-black']">
    {{ dayjs(date).locale("en").format("MMMD ddd HH:mm") }}
  </div>
</template>

<script setup lang="ts">
import dayjs from "@/utils/dayjs";
import { useThemeStore } from "@/store/theme";
let date = ref(new Date());
const themeStore = useThemeStore();
</script>

<style scoped></style>
