<template>
  <div class="flex flex-col w-full h-12">
    <!-- 提示文字 -->
    <div>
      <span class="mr-2 text-yellow-400">root</span>
      <span class="mr-2 text-green-400">@yehan-desktop</span>
      <span class="mr-2 text-blue-400">~{{ dir }}</span>
      <span
        :ref="`terminal-currentDirectory-${commandId}`"
        class="mr-2 text-blue-400"
      ></span>
    </div>
    <!-- 用户输入 -->
    <div class="flex">
      <span class="mr-2 text-pink-400">$</span>
      <input
        type="text"
        ref="commandRef"
        autocomplete="off"
        :autofocus="true"
        :disabled="props.currentId !== commandId"
        class="flex-1 px-1 text-white bg-transparent bg-gray-200 outline-none"
        v-model="content"
        @keydown.enter="executeCommand"
        @keydown.up="rollbackCommand"
        @keydown.down="rollbackCommand"
      />
      <!-- TODO: 按下回车执行命令 -->
      <!-- @keydown="props.fn" -->
    </div>
  </div>
  <Help v-if="rowCommand === 'help'" class="block" />
  <NotFound
    v-if="rowCommand === 'notFound'"
    class="block"
    :content="rowCommand"
  />
</template>

<script setup lang="ts">
import { useSlots } from "vue";
import Help from "@/components/apps/terminal/help/index.vue";
import NotFound from "../notFound/index.vue";
// import NotFound from "@/components/apps/terminal/notFound/index.vue";

const emit = defineEmits(["executeCommand", "rollbackCommand"]);
const props = defineProps<{
  commandId: number;
  currentId: number;
  currentCommand: string;
  commandList: any[];
}>();

// 获取当前行id, 用于判断是否为当前行不能写响应式
const commandId = props.commandId;
// 本行要执行的命令
const rowCommand = ref("");
const dir = localStorage.getItem("currentDirectory");

// 已有的命令
enum CommandType {
  HELP = "help",
  CLEAR = "clear",
}
const commandList = ["help", "clear"];
// 要找到回滚的历史指令
let commandIndex = props.commandList.length - 1;

// let val = ref("terminal暂未开放");
let content = ref("");

const executeCommand = () => {
  // 如果有当前命令，则更新当前命令，否则更新为notFound
  if (commandList.includes(content.value)) {
    rowCommand.value = content.value;
    // 特殊指令需要父组件处理
    if (rowCommand.value === CommandType.CLEAR) {
      emit("executeCommand", rowCommand.value);
      return;
    }
  } else {
    rowCommand.value = "notFound";
  }
  emit("executeCommand", content.value);
};

const rollbackCommand = (event: KeyboardEvent) => {
  // 上箭头
  if (event.key === "ArrowUp") {
    if (commandIndex > 0) {
      commandIndex = commandIndex - 1;
      content.value = props.commandList[commandIndex].content;
    } else {
      // 之前没有指令则直接清空
      content.value = "";
    }
  }
  // 下箭头
  if (event.key === "ArrowDown") {
    if (commandIndex < props.commandList.length - 2) {
      commandIndex = commandIndex + 1;
      content.value = props.commandList[commandIndex].content;
    } else {
      return;
    }
  }
};

const commandRef = ref<HTMLInputElement>();
onMounted(() => {
  commandRef.value?.focus();
});
</script>

<style scoped></style>
