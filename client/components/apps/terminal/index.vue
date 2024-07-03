<template>
  <div class="w-[660px] h-[560px]">
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
            v-for="(content, commandId) in showCommandList"
            :key="commandId"
            :commandId="id.commandId"
            :currentId="id.currentId"
            :currentCommand="currentCommand"
            :commandList="commandList"
            @executeCommand="executeCommand"
            @rollbackCommand="rollbackCommand"
          >
          </Row>
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
let id = reactive({
  commandId: 1,
  currentId: 1,
});
// let commandId: Ref<number> = ref(100);
// let currentId: Ref<number> = ref(0);
const currentDirectory = ref("");
const currentFolderId = ref(0);

// 存储消息列表
interface Command {
  commandId: number;
  content: string;
}
const commandList = ref<Command[]>([{ commandId: 1, content: "" }]);
// 这个用来备份展示,因为cls需要清除显示
const showCommandList = ref<Command[]>([{ commandId: 1, content: "" }]);
let currentCommand = ref("");
const commandHistory = ref([]);
const changeCount = ref(0);
const folderSysteam = new Map();
const terminalInput = ref(null);

// const generateRow = (content) => {
//   contentList.value.push(content);
// };

// 其他方法省略，因为它们需要根据实际情况进行调整
// 执行命令后，将命令内容存储到消息列表中，新增一条空白content
const executeCommand = async (content: string) => {
  // 执行命令的方法，需要根据实际情况进行调整
  content = content.trim();

  commandList.value[id.currentId - 1].content = content;
  // 清空后这里应该是什么
  showCommandList.value[showCommandList.value.length - 1].content = content;
  id.commandId += 1;
  id.currentId += 1;

  // 处理子组件处理不了的指令
  if (content === "clear") {
    // console.log("清屏");
    showCommandList.value = [];
  }
  await nextTick();
  generateRow();
};

// 生成新行
const generateRow = () => {
  const commandTemp: Command = {
    commandId: id.commandId,
    content: "",
  };

  commandList.value.push(commandTemp);
  showCommandList.value.push(commandTemp);
};

// 回滚命令
const rollbackCommand = (event: KeyboardEvent) => {
  // 上箭头
  if (event.key === "ArrowUp") {
  }
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
// defineExpose({
//   val,
// });
</script>

<style scoped></style>
