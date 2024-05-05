interface ChatListState {
  listType: Ref<"message" | "friend" | "group">;
  setListType: (type: "message" | "friend" | "group") => void;
}

export const useChatListStore = defineStore("chatList", (): ChatListState => {
  let listType = ref<"message" | "friend" | "group">("friend");

  const setListType = (type: "message" | "friend" | "group") => {
    listType.value = type;
  };

  return {
    listType,
    setListType,
  };
});
