interface ChatListState {
  listType: Ref<"message" | "friend" | "group">;
  friendGroup: Ref<fgItem[]>;
  setListType: (type: "message" | "friend" | "group") => void;
  getFGItem: (friendGroups: any[]) => void;
}

interface fgItem {
  label: string;
  prop: string;
}

export const useChatListStore = defineStore("chatList", (): ChatListState => {
  let listType = ref<"message" | "friend" | "group">("friend");

  let friendGroup = ref<fgItem[]>([]);

  const setListType = (type: "message" | "friend" | "group") => {
    listType.value = type;
  };

  // 分组
  const getFGItem = (friendGroups: any[]) => {
    let fgItemTemp: fgItem = {
      label: "",
      prop: "",
    };
    friendGroups.forEach((item: any) => {
      console.log(item.id);
      fgItemTemp = {
        label: item.name,
        prop: "title",
      };
      friendGroup.value.push(fgItemTemp);
    });

    console.log("fg", friendGroup);
  };
  return {
    listType,
    friendGroup,
    setListType,
    getFGItem,
  };
});
