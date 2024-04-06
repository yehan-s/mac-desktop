<template>
  <div
    class="w-screen h-screen overflow-hidden bg-center bg-cover"
    :style="backgroundStyle"
  >
    <Topbar />
    <Launchpad />
    <!-- <Dock :model="items" :pt="presets.dock" >
      <template #icon="{ item }">
        <img :src="item.icon" style="width: 100%" />
      </template>
    </Dock> -->
    <Dock/>
  </div>
</template>

<script setup lang="ts">
// import Dock from "primevue/dock";
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();

// Nuxt 不加前缀默认取public下
const wallpapers = {
  day: "img/ui/wallpaper-day.jpg",
  night: "img/ui/wallpaper-night.jpg",
};

const backgroundStyle = computed(() => {
  const imageUrl = themeStore.dark ? wallpapers.night : wallpapers.day;
  const filterValue = `brightness(${themeStore.brightness * 0.7 + 50}%)`;
  return {
    backgroundImage: `url(${imageUrl})`,
    filter: filterValue,
  };
});

const dockItems = ["😃", "😊", "😜", "😍", "🤩", "🥳", "🥶"];

const items = ref([
  {
    label: "Finder",
    icon: "https://primefaces.org/cdn/primevue/images/dock/finder.svg",
  },
  {
    label: "App Store",
    icon: "https://primefaces.org/cdn/primevue/images/dock/appstore.svg",
  },
  {
    label: "Photos",
    icon: "https://primefaces.org/cdn/primevue/images/dock/photos.svg",
  },
  {
    label: "Trash",
    icon: "https://primefaces.org/cdn/primevue/images/dock/trash.png",
  },
]);

// const presets = {
//   dock: {
//     root: ({ props }) => ({
//       class: [
//         // Positioning
//         "absolute z-1",
//         {
//           "left-0 bottom-0 w-full": props.position == "bottom",
//           "left-0 top-0 w-full": props.position == "top",
//           "left-0 top-0 h-full": props.position == "left",
//           "right-0 top-0 h-full": props.position == "right",
//         },
//         // Flexbox & Alignment
//         "flex justify-center items-center",
//         // Interactivity
//         "pointer-events-none",
//       ],
//     }),
//     container: {
//       class: [
//         "flex",
//         "rounded-md",
//         "bg-surface-0/10 dark:bg-surface-900/20 border border-surface-0/20",
//         "backdrop-blur-sm",
//         "p-2",
//         "pointer-events-auto",
//       ],
//     },
//     menu: ({ props }) => ({
//       class: [
//         // Flexbox & Alignment
//         "flex items-center justify-center",
//         {
//           "flex-col": props.position == "left" || props.position == "right",
//         },
//         // List Style
//         "m-0 p-0 list-none",
//         // Shape
//         "outline-none",
//       ],
//     }),
//     menuitem: ({ props, context, instance }) => ({
//       class: [
//         // Spacing & Shape
//         "p-2 rounded-md",
//         // Conditional Scaling
//         {
//           "hover:scale-150": instance.currentIndex === context.index,
//           "scale-125":
//             instance.currentIndex - 1 === context.index ||
//             instance.currentIndex + 1 === context.index,
//           "scale-110":
//             instance.currentIndex - 2 === context.index ||
//             instance.currentIndex + 2 === context.index,
//         },
//         // Positioning & Hover States
//         {
//           "origin-bottom hover:mx-6": props.position == "bottom",
//           "origin-top hover:mx-6": props.position == "top",
//           "origin-left hover:my-6": props.position == "left",
//           "origin-right hover:my-6": props.position == "right",
//         },
//         // Transitions & Transform
//         "transition-all duration-200 ease-cubic-bezier-will-change-transform transform",
//       ],
//     }),
//     action: {
//       class: [
//         "flex flex-col items-center justify-center",
//         "relative",
//         "w-16 h-16",
//         "cursor-default overflow-hidden",
//       ],
//     },
//   },
// };
</script>

<style scoped></style>
