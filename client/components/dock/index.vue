<template>
  <div>
    <Dock :model="items" unstyled :pt="persets.dock">
      <template #item="{ item }">
        <a
          v-tooltip.top="item.label"
          href="#"
          class="flex flex-col items-center justify-center relative overflow-hidden cursor-default w-16 h-16"
          @click="onDockItemClick($event, item)"
        >
          <!-- <a
          v-tooltip.top="item.label"
          href="#"
          class="flex flex-col items-center justify-center relative overflow-hidden cursor-default w-16 h-16"
          @click="onDockItemClick($event, item)"
        > -->
          <!-- <img :alt="item.label" :src="item.icon" style="width: 100%" /> -->
          <img :src="item.icon" style="width: 100%" />
        </a>
      </template>
    </Dock>
  </div>
</template>

<script setup lang="ts">
import Dock from "primevue/dock";
import { ref, onMounted, onBeforeUnmount } from "vue";
import persets from "~/config/persets";
import { useAppStore } from "~/store/app";

const appStore = useAppStore();

function command(this: { label: string; icon: string; command: () => void }) {
  // console.log(this.label);
  // 如果在最小化中，就从最小化list中移除
  if (appStore.minimizeApps.includes(this.label)) {
    appStore.removeMinimizeApps(this.label);
  }
  appStore.openApp(this.label);
}

// icon
const items = ref([
  {
    label: "launchpad",
    icon: "img/icons/launchpad.png",
    command,
  },
  {
    label: "vsc",
    icon: "img/icons/vscode.png",
    command,
  },
  {
    label: "aichat",
    icon: "img/icons/chatgpt.png",
    command,
  },
  {
    label: "terminal",
    icon: "img/icons/terminal.png",
    command,
  },
  {
    label: "turbochat",
    icon: "img/icons/turbochat.png",
    command,
  },
  // {
  //   label: "facetime",
  //   icon: "img/icons/facetime.png",
  //   command,
  // },
  {
    label: "mail",
    icon: "img/icons/mail.png",
    command: () => {
      useNuxtApp().$toast.add({
        severity: "success",
        detail: "yehanescn@gmail.com",
        life: 3500,
      });
      useNuxtApp().$toast.add({
        severity: "info",
        detail: "myenli@163.com",
        life: 3500,
      });
      useNuxtApp().$toast.add({
        severity: "warn",
        detail: "1513849675@qq.com",
        life: 3500,
      });
    },
  },
  {
    label: "github",
    icon: "img/icons/github.png",
    command: () => {
      // window.open("https://github.com/yehanescn");
      window.location.href = "https://github.com/yehan-s/mac-desktop";
    },
  },
]);
const onDockItemClick = (event: { preventDefault: () => void }, item: any) => {
  if (item.command) {
    item.command();
  }
  event.preventDefault();
};

// const persets = ref({
//   dock: {
//     // props: DockItem
//     root: ({ props }: { props: Position }) => ({
//       class: [
//         // Positioning
//         "absolute z-1",
//         {
//           "left-0 bottom-4 w-full": props.position == "bottom",
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
//     menu: ({ props }: { props: Position }) => ({
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
//     // @ts-ignore
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
// });
</script>

<style scoped></style>
