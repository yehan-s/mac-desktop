<template>
  <div class="w-[400px] h-[550px] bg-[#343540] rounded-lg shadow-lg">
    <!-- 空出顶部的高度 -->
    <div class="fixed rounded-t-lg w-full top-0 h-7 bg-[#343540]"></div>
    <!-- 内容区域 -->
    <div class="flex flex-col px-3 py-6">
      <h1 className="text-2xl font-bold text-gray-100">Chat with Me!</h1>
      <!-- 消息区域 -->
      <div class="mt-4 overflow-y-scroll chatlist h-[450px] custom-scrollbar">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <div :class="[message.isBot ? 'justify-start' : 'justify-end']">
            <p class="text-sm text-gray-100">{{ message.text }}</p>
            <span class="block mt-1 text-xs text-gray-400">{{
              message.timestamp
            }}</span>
          </div>
        </div>
      </div>
      <!-- 输入区域 -->
      <!-- TODO:等待返回信息时disable -->
      <div class="fixed flex w-full bottom-[10px]">
        <input
          v-model="inputValue"
          @keydown.enter="sendMessage"
          :autofocus="true"
          placeholder="Type your message here..."
          class="text-black py-2 border rounded-lg grow-[0.8] focus:outline-none focus:ring-2 ring-blue-500 transition duration-200"
        />
        <button
          @click="sendMessage"
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
  {
    text: "I'm sorry, I don't have an answer for that. Can you please provide more information?",
    isBot: true,
    timestamp: "",
  },
]);
const inputValue = ref("");
const isLoading = ref(false);
const error = ref("");
const chatListRef = ref<HTMLDivElement | null>(null);

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
  inputValue.value = "";
  console.log("send message", messages.value);
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: inputValue.value.trim() }],
        max_tokens: 100,
        model: "gpt-3.5-turbo",
      }),
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message) {
      const botMessage: any = {
        text: data.choices[0].message.content.trim(),
        isBot: true,
        timestamp: "",
      };
      messages.value = [...messages.value, botMessage];
    }
    if (data?.error) throw new Error(data?.error.message);
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
  }
};

const handleInputChange = (event: Event) => {
  inputValue.value = (event.target as HTMLInputElement).value;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter") sendMessage();
};

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
