<template>
  <div
    class="rounded-lg h-[46px] flex-center relative px-[5px]"
    @click="onClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <img
      :src="`chat/chatwindow/${imageSrc}.svg`"
      class="w-fit h-fit"
      :alt="name"
      width="15"
      height="15"
    />
    <div
      v-if="desc"
      class="absolute invisible rounded-sm top-12"
      :class="[bg]"
      :style="{ width: `${desc.length * 1.1}rem` }"
    >
      {{ desc }}
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();

let props = defineProps({
  onClick: {
    type: Function,
    default: null,
  },
  name: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
});

const bg = ref(themeStore.dark ? "bg-[#262626]" : "bg-[#fff] text-black");
const imageSrc = ref(themeStore.dark ? props.name : `${props.name}_dark`);

const onMouseEnter = (e) => {
  e.currentTarget.children[0].setAttribute(
    "src",
    `chat/chatwindow/${props.name}_fill.svg`
  );
  e.currentTarget.children[1].classList.remove("invisible");
};

const onMouseLeave = (e) => {
  e.currentTarget.children[0].setAttribute(
    "src",
    `chat/chatwindow/${imageSrc.value}.svg`
  );
  e.currentTarget.children[1].classList.add("invisible");
};
</script>

<style scoped></style>
