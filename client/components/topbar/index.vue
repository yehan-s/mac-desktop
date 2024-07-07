<template>
  <div>
    <div
      class="w-screen h-8 px-2 fixed top-0 text-sm dark:text-white dark:bg-gray-500/20 text-black bg-gray-100/30 backdrop-blur-2xl shadow transition flex justify-between"
    >
      <div class="flex justify-center w-[30px] items-center">
        <!-- icon -->
        <div
          class="relative rounded w-full h-full flex items-center hover:bg-gray-400"
        >
          <TopbarItem mo="appleMenuSwitch" :value="controlStore.showAppleMenu">
            <Image
              alt=""
              width="300"
              height="300"
              :src="`${dark ? '/img/icons/apple-white.png' : '/img/icons/apple-black.png'}`"
            />
          </TopbarItem>
          <MenuAppleMenu v-if="controlStore.showAppleMenu" />
        </div>
      </div>
      <!-- 空闲占用 -->
      <div class="flex-1"></div>
      <!-- 右侧图标列表 -->
      <div class="flex items-center justify-end h-full space-x-2">
        <!-- wifi -->
        <div class="relative">
          <TopbarItem mo="wifiMenuSwitch" :value="controlStore.showWifiMenu">
            <Wifi
              v-show="controlStore.wifi"
              :size="16"
              :color="`${dark ? '#fff' : '#000'}`"
            />
            <WifiOff
              v-show="controlStore.wifi === false"
              :size="16"
              :color="`${dark ? '#fff' : '#000'}`"
            />
          </TopbarItem>
          <MenuWifiMenu v-if="controlStore.showWifiMenu" />
        </div>
        <!-- battryCharge -->
        <!-- <TopbarItem
          ><BatteryCharge
            theme="outline"
            size="16"
            :fill="dark ? '#000' : '#fff'"
          />
        </TopbarItem> -->
        <!-- 控制菜单 -->
        <div class="relative">
          <TopbarItem
            mo="controlCenterSwitch"
            :value="controlStore.showControlCenter"
          >
            <ArrowLeftRight :size="16" :color="`${dark ? '#fff' : '#000'}`" />
          </TopbarItem>
          <MenuControlCenter v-if="controlStore.showControlCenter" />
        </div>
        <!-- 时间 -->
        <!-- <ClientOnly> -->
        <TopbarCurrentDate />
        <!-- </ClientOnly> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftRight, Wifi, WifiOff } from "lucide-vue-next";
import dayjs from "@/utils/dayjs";
import { useThemeStore } from "@/store/theme";
import { useControlStore } from "@/store/control";

const themeStore = useThemeStore();
const controlStore = useControlStore();
let { dark } = storeToRefs(themeStore);
</script>

<style scoped></style>
