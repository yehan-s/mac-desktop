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
  console.log(this.label);
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
</script>

<style scoped></style>
