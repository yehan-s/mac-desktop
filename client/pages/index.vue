<template>
  <div
    class="w-screen h-screen overflow-hidden bg-center bg-cover relative"
    :class="{ dark: themeStore.dark }"
    :style="backgroundStyle"
  >
    <Toast :pt="perset.toast" position="top-center" />
    <Topbar />
    <!-- <Launchpad /> -->
    <!-- <ClientOnly>
      <Chat />
    </ClientOnly> -->
    <ClientOnly>
      <UseWindow />
    </ClientOnly>
    <ClientOnly>
      <Dock />
    </ClientOnly>
    
  </div>
</template>

<script setup lang="ts">
// import Dock from "primevue/dock";
import persets from "~/config/persets";
import Chat from "@/components/apps/chat/index.vue";
import trafficLight from "~/components/window/trafficLight.vue";
import window from "~/components/window/window.vue";
import UseWindow from "~/components/window/useWindow.vue";
import Wallpapers from "@/utils/wallpapers";
import { useThemeStore } from "~/store/theme";
import { useAppStore } from "~/store/app";
const themeStore = useThemeStore();
const appStore = useAppStore();

const backgroundStyle = computed(() => {
  // const imageUrl = themeStore.dark ? Wallpapers.NIGHT : Wallpapers.DAY;
  const imageUrl = Wallpapers.GITHUB;
  const filterValue = `brightness(${themeStore.brightness * 0.7 + 50}%)`;
  return {
    backgroundImage: `url(${imageUrl})`,
    filter: filterValue,
  };
});

onMounted(() => {});

const perset = {
  toast: {
    root: ({
      props,
    }: {
      props: {
        position:
          | "center"
          | "top-left"
          | "top-center"
          | "top-right"
          | "bottom-left"
          | "bottom-center"
          | "bottom-right";
      };
    }) => ({
      class: [
        //Size and Shape
        "w-96 rounded-md",
        // Positioning
        {
          "-translate-x-2/4":
            props.position == "top-center" || props.position == "bottom-center",
        },
      ],
    }),
    container: ({ props }: { props: any }) => ({
      class: [
        "my-4 rounded-md w-full",
        "border-solid border-0 border-l-[6px]",
        "backdrop-blur-[10px] shadow-md",
        // Colors
        {
          "bg-blue-100/70 dark:bg-blue-500/20":
            props.message.severity == "info",
          "bg-green-100/70 dark:bg-green-500/20":
            props.message.severity == "success",
          "bg-orange-100/70 dark:bg-orange-500/20":
            props.message.severity == "warn",
          "bg-red-100/70 dark:bg-red-500/20": props.message.severity == "error",
        },
        {
          "border-blue-500 dark:border-blue-400":
            props.message.severity == "info",
          "border-green-500 dark:border-green-400":
            props.message.severity == "success",
          "border-orange-500 dark:border-orange-400":
            props.message.severity == "warn",
          "border-red-500 dark:border-red-400":
            props.message.severity == "error",
        },
        {
          "text-blue-700 dark:text-blue-300": props.message.severity == "info",
          "text-green-700 dark:text-green-300":
            props.message.severity == "success",
          "text-orange-700 dark:text-orange-300":
            props.message.severity == "warn",
          "text-red-700 dark:text-red-300": props.message.severity == "error",
        },
      ],
    }),
    content: ({ props }: { props: any }) => ({
      class: [
        "flex p-4",
        {
          "items-start": props.message.summary,
          "items-center": !props.message.summary,
        },
      ],
    }),
    icon: {
      class: ["w-6 h-6", "text-lg leading-none mr-2 shrink-0"],
    },
    text: {
      class: ["text-base leading-none", "ml-2", "flex-1"],
    },
    summary: {
      class: "font-bold block",
    },
    detail: ({ props }: { props: any }) => ({
      class: ["block", { "mt-2": props.message.summary }],
    }),
    closebutton: {
      class: [
        "flex items-center justify-center",
        "w-8 h-8",
        "ml-auto  relative",
        "rounded-full",
        "bg-transparent",
        "transition duration-200 ease-in-out",
        "hover:bg-surface-0/50 dark:hover:bg-surface-0/10",
        "overflow-hidden",
      ],
    },
    transition: {
      enterFromClass: "opacity-0 translate-y-2/4",
      enterActiveClass: "transition-[transform,opacity] duration-300",
      leaveFromClass: "max-h-[1000px]",
      leaveActiveClass:
        "!transition-[max-height_.45s_cubic-bezier(0,1,0,1),opacity_.3s,margin-bottom_.3s] overflow-hidden",
      leaveToClass: "max-h-0 opacity-0 mb-0",
    },
  },
};
</script>

<style scoped></style>
