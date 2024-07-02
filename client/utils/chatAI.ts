let apiConfig = {
  chatCompletionsApiUrl: "https://api.openai.com/v1/chat/completions",
  selectedModel: "gpt-3.5-turbo",
  openaiApiKey: "your-api-key-here",
};

export  const sendAIMessage = async (content: string) => {
  const response = await fetch(apiConfig.chatCompletionsApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiConfig.openaiApiKey}`,
    },
    body: JSON.stringify({
      // 传入一个content
      messages: [{ role: "user", content }],
      max_tokens: 100,
      model: "gpt-3.5-turbo",
    }),
  });

  const data = await response.json();
  interface BotMessage {
    text: string;
    isBot: boolean;
    timestamp: string;
  }
  const botMessage: BotMessage = {} as BotMessage;

  if (data?.choices?.[0]?.message) {
    const botMessage: BotMessage = {
      text: data.choices[0].message.content.trim(),
      isBot: true,
      timestamp: "",
    };
    // 把botMessage返回自己处理
    // messages.value = [...messages.value, botMessage];
  }
  if (data?.error) throw new Error(data?.error.message);
  return { botMessage, data };
};
