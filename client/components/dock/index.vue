<template>
  <div>
    <Dock :model="items" unstyled :pt="presets.dock">
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
import { useToast } from "primevue/usetoast";
import { useAppStore } from "~/store/app";

const appStore = useAppStore();

function command(this: { label: string; icon: string; command: () => void }) {
  console.log(this.label);
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
    label: "vscode",
    icon: "img/icons/vscode.png",
    command,
  },
  {
    label: "chatgpt",
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
  {
    label: "facetime",
    icon: "img/icons/facetime.png",
    command,
  },
  {
    label: "mail",
    icon: "img/icons/mail.png",
    command,
  },
  {
    label: "github",
    icon: "img/icons/github.png",
    command,
  },
]);
const onDockItemClick = (event: { preventDefault: () => void }, item: any) => {
  if (item.command) {
    item.command();
  }
  event.preventDefault();
};
// const items = ref([
//   {
//     label: "Finder",
//     icon: "https://primefaces.org/cdn/primevue//images/dock/finder.svg",
//     command: () => {
//       displayFinder.value = true;
//     },
//   },
//   {
//     label: "Terminal",
//     icon: "https://primefaces.org/cdn/primevue//images/dock/terminal.svg",
//     command: () => {
//       displayTerminal.value = true;
//     },
//   },
//   {
//     label: "App Store",
//     icon: "https://primefaces.org/cdn/primevue//images/dock/appstore.svg",
//     command: () => {
//       toast.add({
//         severity: "error",
//         summary: "An unexpected error occurred while signing in.",
//         detail: "UNTRUSTED_CERT_TITLE",
//         group: "tc",
//         life: 3000,
//       });
//     },
//   },
//   {
//     label: "Safari",
//     icon: "https://primefaces.org/cdn/primevue//images/dock/safari.svg",
//     command: () => {
//       toast.add({
//         severity: "warn",
//         summary: "Safari has stopped working",
//         group: "tc",
//         life: 3000,
//       });
//     },
//   },
//   {
//     label: "Photos",
//     icon: "https://primefaces.org/cdn/primevue//images/dock/photos.svg",
//     command: () => {
//       displayPhotos.value = true;
//     },
//   },
//   {
//     label: "GitHub",
//     icon: "https://primefaces.org/cdn/primevue//images/dock/github.svg",
//   },
//   {
//     label: "Trash",
//     icon: "https://primefaces.org/cdn/primevue//images/dock/trash.png",
//     command: () => {
//       toast.add({ severity: "info", summary: "Empty Trash", life: 3000 });
//     },
//   },
// ]);

interface Position {
  position: string;
}

// 预设
const presets = ref({
  dock: {
    // props: DockItem
    root: ({ props }: { props: Position }) => ({
      class: [
        // Positioning
        "absolute z-1",
        {
          "left-0 bottom-4 w-full": props.position == "bottom",
          "left-0 top-0 w-full": props.position == "top",
          "left-0 top-0 h-full": props.position == "left",
          "right-0 top-0 h-full": props.position == "right",
        },
        // Flexbox & Alignment
        "flex justify-center items-center",
        // Interactivity
        "pointer-events-none",
      ],
    }),
    container: {
      class: [
        "flex",
        "rounded-md",
        "bg-surface-0/10 dark:bg-surface-900/20 border border-surface-0/20",
        "backdrop-blur-sm",
        "p-2",
        "pointer-events-auto",
      ],
    },
    menu: ({ props }: { props: Position }) => ({
      class: [
        // Flexbox & Alignment
        "flex items-center justify-center",
        {
          "flex-col": props.position == "left" || props.position == "right",
        },
        // List Style
        "m-0 p-0 list-none",
        // Shape
        "outline-none",
      ],
    }),
    // @ts-ignore
    menuitem: ({ props, context, instance }) => ({
      class: [
        // Spacing & Shape
        "p-2 rounded-md",
        // Conditional Scaling
        {
          "hover:scale-150": instance.currentIndex === context.index,
          "scale-125":
            instance.currentIndex - 1 === context.index ||
            instance.currentIndex + 1 === context.index,
          "scale-110":
            instance.currentIndex - 2 === context.index ||
            instance.currentIndex + 2 === context.index,
        },
        // Positioning & Hover States
        {
          "origin-bottom hover:mx-6": props.position == "bottom",
          "origin-top hover:mx-6": props.position == "top",
          "origin-left hover:my-6": props.position == "left",
          "origin-right hover:my-6": props.position == "right",
        },
        // Transitions & Transform
        "transition-all duration-200 ease-cubic-bezier-will-change-transform transform",
      ],
    }),
    action: {
      class: [
        "flex flex-col items-center justify-center",
        "relative",
        "w-16 h-16",
        "cursor-default overflow-hidden",
      ],
    },
  },
});
</script>

<style scoped></style>
