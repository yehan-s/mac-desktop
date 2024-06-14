<template>
  <div class="flex flex-col w-full h-12">
    <!-- 提示文字 -->
    <div>
      <span class="mr-2 text-yellow-400">funnycoder</span>
      <span class="mr-2 text-green-400">@macbook-pro</span>
      <span class="mr-2 text-blue-400">~{{ dir }}</span>
      <span
        :ref="`terminal-currentDirectory-${props.id}`"
        class="mr-2 text-blue-400"
      ></span>
    </div>
    <!-- 用户输入 -->
    <div class="flex">
      <span class="mr-2 text-pink-400">$</span>
      <input
        type="text"
        :ref="`terminal-input-${props.id}`"
        autocomplete="off"
        :autofocus="true"
        :disabled="currentId !== id"
        class="flex-1 px-1 text-white bg-transparent bg-gray-200 outline-none"
        @keydown="props.onkeydown"
        v-model="val"
        
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number;
  onkeydown: (payload: KeyboardEvent) => void;
}>();

const currentId = Number.parseInt(
  JSON.parse(localStorage.getItem("currentId") as string)
);
const dir = localStorage.getItem("currentDirectory");

let val = ref("terminal暂未开放");

// const props = defineProps({
//   dir: {
//     type: String,
//     required: true,
//   },
//   id: {
//     type: String,
//     required: true,
//   },
//   currentId: {
//     type: String,
//     required: true,
//   },
//   onKeyDown: {
//     type: Function,
//     required: true,
//   },
// });
</script>

<style scoped></style>
