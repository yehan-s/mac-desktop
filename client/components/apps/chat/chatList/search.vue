<template>
  <div class="flex w-full p-2 px-4 rounded-lg h-[44px]">
    <div
      class="flex w-full"
      :class="[themeStore.dark ? 'bg-[#1e1e1e]' : 'bg-[#f5f5f5]']"
    >
      <div class="w-[24px] flex-center">
        <img :src="searchImg" height="15" alt="qqavater" />
      </div>

      <div class="flex-1 flex-center mr-2">
        <input
          class="focus:outline-none"
          :class="[
            themeStore.dark ? 'bg-[#1e1e1e] text-[#e9e9e9]' : 'bg-[#f5f5f5]',
          ]"
          type="text"
          placeholder="Search"
        />
      </div>

      <!-- <div
        class="w-[24px]"
        :class="[themeStore.dark ? 'bg-[#1e1e1e]' : 'bg-white']"
      ></div> -->
      <div class="w-[24px] flex-center">
        <img :src="addImg" width="15" height="15" alt="qqavater" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();
const searchImg = "chat/chatlist/search.svg";
const addImg = "chat/chatlist/add.svg";
</script>

<style scoped></style>
