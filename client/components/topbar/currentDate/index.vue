<template>
  <div :class="[themeStore.dark ? '' : 'text-black']">
    {{ dayjs(date).locale("en").format("MMMD ddd HH:mm") }}
    <!-- <NuxtTime
      :datetime="date"
      second="numeric"
      month="long"
      day="numeric"
    /> -->
  </div>
</template>

<script setup lang="ts">
import dayjs from "@/utils/dayjs";
import { useThemeStore } from "@/store/theme";
let date = ref(new Date());
const themeStore = useThemeStore();

onMounted(() => {
  setInterval(() => {
    date.value = new Date();
  }, 50000);
});
</script>

<style scoped></style>
