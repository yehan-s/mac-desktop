<template>
  <div>
    <Dock :model="items" unstyled  :pt="presets.dock">
      <template #item="{ item }">
        <a
          v-tooltip.top="item.label"
          href="#"
          class="flex flex-col items-center justify-center relative overflow-hidden cursor-default w-16 h-16"
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
    <!-- <Dialog
      v-model:visible="displayTerminal"
      header="Terminal"
      :breakpoints="{ '960px': '50vw' }"
      :style="{ width: '40vw' }"
      :maximizable="true"
    >
      <Terminal
        welcomeMessage="Welcome to PrimeVue(cmd: 'date', 'greet {0}', 'random' and 'clear')"
        prompt="primevue $"
      />
    </Dialog> -->

    <!-- <Dialog
      v-model:visible="displayFinder"
      header="Finder"
      :breakpoints="{ '960px': '50vw' }"
      :style="{ width: '40vw' }"
      :maximizable="true"
    >
      <Tree :value="nodes" />
    </Dialog>

    <Galleria
      v-model:visible="displayPhotos"
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="2"
      containerStyle="width: 400px"
      :circular="true"
      :fullScreen="true"
      :showThumbnails="false"
      :showItemNavigators="true"
    >
      <template #item="slotProps">
        <img
          :src="slotProps.item.itemImageSrc"
          :alt="slotProps.item.alt"
          style="width: 100%"
        />
      </template>
    </Galleria> -->
  </div>
</template>

<script setup lang="ts">
import Dock from "primevue/dock";
// import { Dock, Galleria } from "primevue/dock";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useToast } from "primevue/usetoast";
import TerminalService from "primevue/terminalservice";
// import { NodeService } from "@/service/NodeService";
// import { PhotoService } from "@/service/PhotoService";

onMounted(() => {
  // PhotoService.getImages().then((data) => (images.value = data));
  // NodeService.getTreeNodes().then((data) => (nodes.value = data));
  // TerminalService.on("command", commandHandler);
});

onBeforeUnmount(() => {
  // TerminalService.off("command", commandHandler);
});

const displayFinder = ref(false);
const displayTerminal = ref(false);
const displayPhotos = ref(false);
const images = ref();
const nodes = ref();
const toast = useToast();
// icon
const items = ref([
  {
    label: "Finder",
    icon: "https://primefaces.org/cdn/primevue//images/dock/finder.svg",
    command: () => {
      displayFinder.value = true;
    },
  },
  {
    label: "Terminal",
    icon: "https://primefaces.org/cdn/primevue//images/dock/terminal.svg",
    command: () => {
      displayTerminal.value = true;
    },
  },
  {
    label: "App Store",
    icon: "https://primefaces.org/cdn/primevue//images/dock/appstore.svg",
    command: () => {
      toast.add({
        severity: "error",
        summary: "An unexpected error occurred while signing in.",
        detail: "UNTRUSTED_CERT_TITLE",
        group: "tc",
        life: 3000,
      });
    },
  },
  {
    label: "Safari",
    icon: "https://primefaces.org/cdn/primevue//images/dock/safari.svg",
    command: () => {
      toast.add({
        severity: "warn",
        summary: "Safari has stopped working",
        group: "tc",
        life: 3000,
      });
    },
  },
  {
    label: "Photos",
    icon: "https://primefaces.org/cdn/primevue//images/dock/photos.svg",
    command: () => {
      displayPhotos.value = true;
    },
  },
  {
    label: "GitHub",
    icon: "https://primefaces.org/cdn/primevue//images/dock/github.svg",
  },
  {
    label: "Trash",
    icon: "https://primefaces.org/cdn/primevue//images/dock/trash.png",
    command: () => {
      toast.add({ severity: "info", summary: "Empty Trash", life: 3000 });
    },
  },
]);
const menubarItems = ref([
  {
    label: "Finder",
    class: "menubar-root",
  },
  {
    label: "File",
    items: [
      {
        label: "New",
        icon: "pi pi-fw pi-plus",
        items: [
          {
            label: "Bookmark",
            icon: "pi pi-fw pi-bookmark",
          },
          {
            label: "Video",
            icon: "pi pi-fw pi-video",
          },
        ],
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
      },
      {
        separator: true,
      },
      {
        label: "Export",
        icon: "pi pi-fw pi-external-link",
      },
    ],
  },
  {
    label: "Edit",
    items: [
      {
        label: "Left",
        icon: "pi pi-fw pi-align-left",
      },
      {
        label: "Right",
        icon: "pi pi-fw pi-align-right",
      },
      {
        label: "Center",
        icon: "pi pi-fw pi-align-center",
      },
      {
        label: "Justify",
        icon: "pi pi-fw pi-align-justify",
      },
    ],
  },
  {
    label: "Users",
    items: [
      {
        label: "New",
        icon: "pi pi-fw pi-user-plus",
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-user-minus",
      },
      {
        label: "Search",
        icon: "pi pi-fw pi-users",
        items: [
          {
            label: "Filter",
            icon: "pi pi-fw pi-filter",
            items: [
              {
                label: "Print",
                icon: "pi pi-fw pi-print",
              },
            ],
          },
          {
            icon: "pi pi-fw pi-bars",
            label: "List",
          },
        ],
      },
    ],
  },
  {
    label: "Events",
    items: [
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        items: [
          {
            label: "Save",
            icon: "pi pi-fw pi-calendar-plus",
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-calendar-minus",
          },
        ],
      },
      {
        label: "Archive",
        icon: "pi pi-fw pi-calendar-times",
        items: [
          {
            label: "Remove",
            icon: "pi pi-fw pi-calendar-minus",
          },
        ],
      },
    ],
  },
  {
    label: "Quit",
  },
]);
const responsiveOptions = ref([
  {
    breakpoint: "1024px",
    numVisible: 3,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
  },
  {
    breakpoint: "560px",
    numVisible: 1,
  },
]);

// const onDockItemClick = (event, item) => {
//   if (item.command) {
//     item.command();
//   }

//   event.preventDefault();
// };

// const commandHandler = (text) => {
//   let response;
//   let argsIndex = text.indexOf(" ");
//   let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

//   switch (command) {
//     case "date":
//       response = "Today is " + new Date().toDateString();
//       break;

//     case "greet":
//       response = "Hola " + text.substring(argsIndex + 1);
//       break;

//     case "random":
//       response = Math.floor(Math.random() * 100);
//       break;

//     default:
//       response = "Unknown command: " + command;
//   }

//   TerminalService.emit("response", response);
// };
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
          "left-0 bottom-0 w-full": props.position == "bottom",
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
