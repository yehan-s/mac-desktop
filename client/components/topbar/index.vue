<template>
  <div>
    <div
      class="w-screen h-8 px-2 fixed top-0 text-sm text-white bg-gray-700/10 backdrop-blur-2xl shadow transition flex justify-between"
    >
      <div class="flex justify-center w-[30px] items-center">
        <!-- apple -->
        <div class="relative">
          <TopbarItem mo="appleMenuSwitch" :value="controlStore.showAppleMenu">
            <Apple theme="filled" size="16" :fill="dark ? '#000' : '#fff'" />
          </TopbarItem>
          <MenuAppleMenu v-if="controlStore.showAppleMenu" />
        </div>
      </div>
      <div class="flex-1"></div>
      <!-- tools -->
      <div class="flex items-center justify-end h-full space-x-2">
        <!-- wifi -->
        <div class="relative">
          <TopbarItem mo="wifiMenuSwitch" :value="controlStore.showWifiMenu">
            <Wifi
              v-show="controlStore.wifi === true"
              theme="outline"
              size="16"
              :fill="dark ? '#000' : '#fff'"
            />
            <CloseWifi
              v-show="controlStore.wifi === false"
              theme="outline"
              size="16"
              :fill="dark ? '#000' : '#fff'"
            />
          </TopbarItem>
          <MenuWifiMenu v-if="controlStore.showWifiMenu" />
        </div>
        <!-- search -->
        <TopbarItem>
          <Search theme="outline" size="16" :fill="dark ? '#000' : '#fff'" />
        </TopbarItem>
        <TopbarItem>
          <More theme="outline" size="16" :fill="dark ? '#000' : '#fff'" />
        </TopbarItem>
        <!-- battryCharge -->
        <TopbarItem
          ><BatteryCharge
            theme="outline"
            size="16"
            :fill="dark ? '#000' : '#fff'"
          />
        </TopbarItem>
        <!-- switchBtn -->
        <div class="relative">
          <TopbarItem
            mo="controlCenterSwitch"
            :value="controlStore.showControlCenter"
          >
            <SwitchButton
              theme="outline"
              size="16"
              :fill="dark ? '#000' : '#fff'"
            />
          </TopbarItem>
          <MenuControlCenter v-if="controlStore.showControlCenter" />
        </div>
        <!-- time -->
        <div :class="[dark ? 'text-black' : '']">
          {{ dayjs(date).format("MMMD ddd HH:mm") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Apple,
  CloseWifi,
  Wifi,
  Search,
  More,
  BatteryCharge,
  SwitchButton,
} from "@icon-park/vue-next";
import dayjs from "@/utils/dayjs";
import { useThemeStore } from "@/store/theme";
import { useControlStore } from "@/store/control";

const themeStore = useThemeStore();
const controlStore = useControlStore();
let { dark } = storeToRefs(themeStore);
let date = ref(new Date());
</script>

<style scoped></style>
