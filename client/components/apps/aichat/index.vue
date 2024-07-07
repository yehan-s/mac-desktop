<template>
  <div class="w-[400px] h-[550px] bg-[#343540] rounded-lg shadow-lg">
    <!-- 空出顶部的高度 -->
    <div class="fixed rounded-t-lg w-full top-0 h-7 bg-[#343540]"></div>
    <!-- 内容区域 -->
    <div class="flex flex-col px-3 py-6 w-full h-full ">
      <h1 className="text-2xl font-bold text-gray-100">Chat with Me!</h1>
      <!-- 消息区域 -->
      <div
        ref="chatListRef"
        class="overflow-y-scroll scroll-smooth chatlist h-[430px] custom-scrollbar mb-24"
      >
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="messag flex mt-4"
          :class="[message.isBot ? 'justify-start' : 'justify-end']"
        >
          <div
            class="p-3 rounded-lg w-fit"
            :class="[
              message.isBot
                ? 'bg-primary rounded-bl-none'
                : 'bg-gray-500 rounded-br-none',
            ]"
          >
            <p class="text-sm text-gray-100">{{ message.text }}</p>
            <span class="block mt-1 text-xs text-gray-400">{{
              message.timestamp
            }}</span>
          </div>
        </div>
      </div>
      
      <div class="fixed flex w-full bottom-[10px]">
        <input
          ref="inputRef"
          v-model="inputValue"
          @keydown.enter="sendMessage"
          :autofocus="true"
          placeholder="请键入问题"
          :disabled="isLoading"
          class="text-black px-2 py-2 border rounded-lg grow-[0.8] focus:outline-none focus:ring-2 ring-blue-500 transition duration-200"
        />
        <button
          @click="sendMessage"
          :disabled="true"
          v-if="isLoading"
          class="ml-4 py-2 w-[80px] text-white bg-primary rounded-lg disabled:opacity-50 transition duration-200"
        >
          <span class="loading loading-spinner loading-xs"></span>
        </button>
        <button
          v-else
          @click="sendMessage"
          :disabled="isLoading || inputValue.trim() === ''"
          class="ml-4 py-2 w-[80px] text-white bg-primary rounded-lg disabled:opacity-50 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  </div>

  <!-- <div class="w-[200px] h-[200px] bg-red-300"></div> -->
</template>

<script setup lang="ts">
interface aiMessage {
  text: string;
  isBot: boolean;
  timestamp: string;
}

const messages = ref<aiMessage[]>([
  {
    text: "Hello, how can I help you?",
    isBot: true,
    timestamp: "",
  },
]);

const inputValue = ref("");
const isLoading = ref(false);
const error = ref("");
const chatListRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const sendMessage = async () => {
  if (inputValue.value.trim() === "") return;

  isLoading.value = true;
  error.value = "";

  const newMessage: aiMessage = {
    text: inputValue.value.trim(),
    isBot: false,
    timestamp: "",
  };
  messages.value = [...messages.value, newMessage];

  console.log("send message", messages.value);

  try {
    // console.log("先看下input", inputValue.value);
    let content = inputValue.value.trim();
    inputValue.value = "";
    // 调用写好的工具
    const { botMessage } = await useNuxtApp().$sendAIMessage(content);
    messages.value = [...messages.value, botMessage];
    // chatListRef.value?.scrollIntoView({ behavior: "smooth" });
    // 输入就会跳转，需要改进
    // chatListRef.value?.scrollTo({
    //   top: chatListRef.value.scrollHeight,
    //   behavior: "smooth",
    // });
    // 最后再清空

    chatListRef.value!.scrollTop = chatListRef.value!.scrollHeight;
  } catch (error) {
    // useAlertStore().useAlert(
    //   "error",
    //   "Make sure you have set the right openai key and connect the accessible internet. An error occurred. Please try again later.",
    //   8000
    // );
    useNuxtApp().$toast.add({
      severity: "warn",
      detail: "请求出了点问题，请稍后再试。",
      life: 3000,
    });
  } finally {
    isLoading.value = false;
    await nextTick();
    inputRef.value!.focus();
  }
};

// const handleInputChange = (event: Event) => {
//   inputValue.value = (event.target as HTMLInputElement).value;
// };

// const handleKeyDown = (event: KeyboardEvent) => {
//   if (event.key === "Enter") sendMessage();
// };

onMounted(() => {
  if (chatListRef.value) {
    chatListRef.value.scrollTop = chatListRef.value.scrollHeight;
  }
});

onUpdated(() => {
  if (chatListRef.value) {
    chatListRef.value.scrollTop = chatListRef.value.scrollHeight;
  }
});
</script>

<style scoped></style>
