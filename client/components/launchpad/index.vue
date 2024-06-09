<template>
  <!-- 动态class中定义了消失动画 -->
  <!-- :class="[
      launchpadStore.show
        ? ''
        : 'opacity-0 invisible transition-opacity duration-200',
    ]" -->

  <div
    class="z-30 transform scale-110 w-screen h-screen fixed bg-center bg-cover"
    :style="{ backgroundImage: `url(${wallpapers.day})` }"
    @click="close"
  >
    <div class="absolute w-full h-full bg-gray-900/20 backdrop-blur-2xl">
      <!-- 搜索框 -->
      <div
        class="flex w-64 mx-auto mt-12 border rounded-md bg-gray-200/10 border-gray-200/30"
        @focus="setFocus(true)"
        @blur="setFocus(false)"
      >
        <div class="my-1 flex items-center justify-end">
          <span class="text-white" @click="close">
            <Search :size="16" />
          </span>
        </div>
        <input
          class="flex-1 min-w-0 px-1 text-sm text-white bg-transparent outline-none"
          placeholder="Search"
          value=""
        />
      </div>

      <!-- APP列表 -->
      <div class="flex w-full h-full overflow-y-hidden">
        <div class="h-full w-[13vw] mr-auto"></div>
        <div
          class="flex w-full flex-wrap content-start justify-items-center mt-3 h-full"
        >
          <div
            v-for="(app, index) in launchpadApps"
            :key="`launchpad-${app.id + index}`"
            class="flex-center flex-col w-[13vw] h-[20vh]"
          >
            <nuxt-link :to="app.link">
              <img :src="app.img" width="80" height="80" :alt="app.title" />
            </nuxt-link>
            <p>{{ app.title }}</p>
          </div>
        </div>
        <div class="h-full w-[11vw] ml-auto"></div>
      </div>
    </div>
  </div>
  <!-- <div class="w-96 h-96 bg-blue-300 ">1111111111111</div> -->
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
import launchpadApps from "~/utils/launchpad";
import { useLaunchpadStore } from "~/store/launchpad";
import { useAppStore } from "~/store/app";

const launchpadStore = useLaunchpadStore();
const appStore = useAppStore();

const focus: Ref<boolean> = ref(false);

const setFocus = (value: boolean) => {
  // focus.value = value;
  // launchpadStore.setFocus(value);
  console.log("监测show", launchpadStore.show);
};

const close = () => {
  launchpadStore.setShow(false);
  appStore.closeApp("launchpad");
};

const wallpapers = {
  day: "img/ui/wallpaper-day.jpg",
  night: "img/ui/wallpaper-night.jpg",
};

const wallpaper = ref(wallpapers.day);

// :style="backgroundImage:`url(${wallpapers.day})`"
</script>

<style scoped></style>
