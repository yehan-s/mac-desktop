<!-- 左侧上三icon -->
<template>
  <div class="rounded-lg w-full h-[46px] flex-center" @click="onClick">
    <img
      :src="`chat/siderbar/${imageSrc}.svg`"
      alt="qqappicon"
      width="30px"
      height="30px"
    />
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
});

const bg = ref(themeStore.dark ? "bg-[#262626]" : "bg-[#fff] text-black");
const imageSrc = ref(themeStore.dark ? props.name : `${props.name}_dark`);
const onClick = () => {
  console.log('topIcon clicked')
};
</script>

<style scoped></style>
