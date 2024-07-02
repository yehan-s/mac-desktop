<template>
  <div
    ref="emojiPanelRef"
    class="p-1 rounded-xl overflow-y-scroll chatlist w-[350px] h-[170px] text-2xl grid grid-cols-9 dark:bg-[#060606] bg-[#fcfcfc]"
    @click="selectEmoji($parent, $event)"
  >
    <!-- <transition-group name="fade" tag="div"> -->
    <span
      v-for="emoji in emojiList"
      :key="emoji"
      class="ml-1"
      :data-emoji="emoji"
    >
      {{ emoji }}
    </span>
    <!-- </transition-group> -->
  </div>
</template>

<script setup lang="ts">
import { defineExpose, defineEmits } from "vue";
const emit = defineEmits(["clickOutside"]);
const props = defineProps({
  dark: {
    type: Boolean,
    required: true,
  },
});

const emojiList = [
  "😀",
  "😂",
  "😍",
  "🤔",
  "🤣",
  "🥰",
  "😊",
  "😎",
  "😜",
  "😘",
  "😋",
  "😇",
  "🤩",
  "🤗",
  "🤪",
  "🤫",
  "🤭",
  "🥳",
  "🥺",
  "🤯",
  "🤡",
  "🤠",
  "🤢",
  "🤮",
  "🥴",
  "🥵",
  "🥶",
  "🦸",
  "🦹",
  "🦷",
  "🦴",
  "🦾",
  "🧠",
  "🧐",
  "🧑",
  "🧒",
  "🧓",
  "🧔",
  "🧕",
  "🧖",
  "🧗",
  "🧘",
  "🧙",
  "🧚",
  "🧛",
  "🧜",
  "🧝",
  "🧞",
  "🧟",
  "🧠",
  "🧡",
  "🧢",
  "🧣",
  "🧤",
  "🧥",
  "🧦",
  "🧧",
  "🧨",
  "🧩",
  "🧪",
  "🧫",
  "🧬",
  "🧭",
  "🧮",
  "🧯",
  "🧰",
  "🧱",
  "🧲",
  "🧳",
  "🧴",
  "🧵",
  "🧶",
  "🧷",
  "🧸",
  "🧹",
  "🧺",
  "🧻",
  "🧼",
  "🧽",
  "🧾",
];

const selected = ref(true);

const selectEmoji = ($parent, $event) => {
  if ($event.target.tagName === "SPAN") {
    console.log("进入了点击");
    $parent.message =
      $parent.message + $event.target.getAttribute("data-emoji");
  }
  emit("clickOutside");
};

let emojiPanelRef = useClickOutside(() => {
  emit("clickOutside");
});

defineExpose({ selected });
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
