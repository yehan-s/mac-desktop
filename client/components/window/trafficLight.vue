<template>
  <div class="bg-transparent absolute">
    <div
      ref="trafficLightRef"
      class="traffic-lights relative flex space-x-2 w-[60px] ml-1"
    >
      <div
        @click="closeHandler"
        class="bg-red-500 w-[13px] h-[13px] mt-2 rounded-full ml-1"
      ></div>
      <div
        @click="handleMinimize"
        class="bg-yellow-500 w-[13px] h-[13px] mt-2 rounded-full"
      ></div>
      <div class="bg-green-500 w-[13px] h-[13px] mt-2 rounded-full"></div>
      <div v-if="enter" class="absolute flex mt-[9px]">
        <X
          @click="closeHandler"
          :size="10"
          color="black"
          :stroke-width="2"
          class="-ml-[2px]"
        />
        <Minus
          @click="handleMinimize"
          :size="10"
          color="black"
          :stroke-width="3"
          class="mx-[10px]"
        />
        <Minimize2
          v-if="max"
          @click="handleMini"
          :size="10"
          color="black"
          :stroke-width="2"
          class="ml-[1px]"
        />
        <Maximize2
          v-else
          @click="handleMax"
          :size="10"
          color="black"
          :stroke-width="2"
          class="ml-[1px]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Maximize2, Minimize2, Minus, X } from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";
// import { useAppsStore } from "@/store";

const trafficLightRef = ref(null);
const enter = ref(false);

onMounted(() => {
  const trafficLight = trafficLightRef.value;
  if (trafficLight) {
    trafficLight.addEventListener("mouseenter", () => {
      enter.value = true;
    });
    trafficLight.addEventListener("mouseleave", () => {
      enter.value = false;
    });
  }
});
// temp
const max = ref(false);
const closeHandler = () => {
  console.log(111);
  //   closeApp(id);
};

const handleMinimize = () => {
  console.log(222);
};

const handleMax = () => {
  console.log(333);
};

const handleMini = () => {
  console.log(444);
};

// const [max, closeApp] = useAppsStore((s) => [s.max, s.closeApp], shallow);

// onMounted(() => {
//   const trafficLight = trafficLightRef.value;
//   if (trafficLight) {
//     trafficLight.addEventListener("mouseenter", () => {
//       enter.value = true;
//     });
//     trafficLight.addEventListener("mouseleave", () => {
//       enter.value = false;
//     });
//   }
// });

// onUnmounted(() => {
//   const trafficLight = trafficLightRef.value;
//   if (trafficLight) {
//     trafficLight.removeEventListener("mouseenter", () => {
//       enter.value = true;
//     });
//     trafficLight.removeEventListener("mouseleave", () => {
//       enter.value = false;
//     });
//   }
// });
</script>
