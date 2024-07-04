export default defineNuxtPlugin(() => {
  let apiConfig = {
    chatCompletionsApiUrl: useRuntimeConfig().public.CHAT_COMPLETIONS_API_URL,
    selectedModel: useRuntimeConfig().public.SELECTED_MODEL,
    openaiApiKey: useRuntimeConfig().public.OPENAI_API_KEY,
  };

  const $sendAIMessage = async (content: string) => {
    console.log("进入了plugin");
    // console
    const response = await fetch(apiConfig.chatCompletionsApiUrl as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiConfig.openaiApiKey}`,
      },
      body: JSON.stringify({
        // 传入一个content
        messages: [{ role: "user", content }],
        max_tokens: 100,
        model: apiConfig.selectedModel,
      }),
    });

    const data = await response.json();
    interface BotMessage {
      text: string;
      isBot: boolean;
      timestamp: string;
    }
    let botMessage: BotMessage = {} as BotMessage;

    if (data?.choices?.[0]?.message) {
      botMessage = {
        text: data.choices[0].message.content.trim(),
        isBot: true,
        timestamp: "",
      };
      // 把botMessage返回自己处理
      // messages.value = [...messages.value, botMessage];
    }
    if (data?.error) throw new Error(data?.error.message);
    console.log(botMessage, data);
    return { botMessage, data };
  };

  return {
    provide: {
      sendAIMessage: $sendAIMessage,
    },
  };
});

// export const sendAIMessage = async (content: string) => {
//   console.log("这是我要输入的内容", content);
//   const response = await fetch(apiConfig.chatCompletionsApiUrl as string, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiConfig.openaiApiKey}`,
//     },
//     body: JSON.stringify({
//       // 传入一个content
//       messages: [{ role: "user", content }],
//       max_tokens: 100,
//       model: apiConfig.selectedModel,
//     }),
//   });

//   const data = await response.json();
//   interface BotMessage {
//     text: string;
//     isBot: boolean;
//     timestamp: string;
//   }
//   let botMessage: BotMessage = {} as BotMessage;

//   if (data?.choices?.[0]?.message) {
//     botMessage = {
//       text: data.choices[0].message.content.trim(),
//       isBot: true,
//       timestamp: "",
//     };
//     // 把botMessage返回自己处理
//     // messages.value = [...messages.value, botMessage];
//   }
//   if (data?.error) throw new Error(data?.error.message);
//   console.log(botMessage, data);
//   return { botMessage, data };
// };
