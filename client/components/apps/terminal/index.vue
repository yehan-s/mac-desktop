<template>
  <div class="w-[560px] h-[560px] bg-red-200">
    <!-- <div class="w-full h-7"></div> -->
    <div
      class="flex flex-col p-4 pr-5px h-full text-white bg-[#1C1C1E]/95 rounded-lg"
      :style="{ fontFamily: 'Menlo, monospace', fontSize: '14px' }"
    >
      <div class="h-6 rounded-lg"></div>
      <div class="flex flex-col flex-1 w-full mb-2 overflow-y-scroll scrollbar">
        <div>Welcome to Terminal, type `help` to get started, have fun!</div>
        <div class="flex-1 w-full" @click="clickToFocus">
          <!-- <div v-for="(line, index) in content" :key="index">{{ line }}</div> -->
          <!-- <Row v-for="content in contentList" :key="content.id" :content="content" /> -->
          <Row
            :id="1"
            :onkeydown="
              (e) => {
                console.log('huohuohuo');
              }
            "
          />
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 w-full">
      <BottomBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import BottomBar from "./bottomBar/index.vue";
import Row from "./row/index.vue";

const currentId = ref(0);
const currentDirectory = ref("");
const currentFolderId = ref(0);
const contentList = ref([]);
const commandHistory = ref([]);
const changeCount = ref(0);
const folderSysteam = new Map();
const terminalInput = ref(null);

const generateRow = (content) => {
  contentList.value.push(content);
};

// 其他方法省略，因为它们需要根据实际情况进行调整

const executeCommand = (event) => {
  // 执行命令的方法，需要根据实际情况进行调整
};

// 点击获取焦点，屏幕拉最下
const clickToFocus = (event) => {
  // event.preventDefault();
  // terminalInput.value.focus();
};

// const clickToFocus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//   e.preventDefault();
//   const currentInput = document.querySelector(
//     `#terminal-input-${currentId}`
//   ) as HTMLInputElement;
//   currentInput.focus();
// };
</script>

<style scoped></style>
