interface ChatListState {
  listType: Ref<"message" | "friend" | "group">;
  friendGroup: Ref<FgItem[]>;
  setListType: (type: "message" | "friend" | "group") => void;
  getFGItem: (friendGroups: any[]) => void;
}
interface FgItem {
  label: string;
  prop: string;
  items: any[];
}
interface FmItem {
  label: string;
  avatar: string;
}

import { searchGroupFriend } from "~/api/search";
import type { Friend } from "~/types";
export const useChatListStore = defineStore("chatList", (): ChatListState => {
  // 分组类型
  let listType = ref<"message" | "friend" | "group">("friend");
  // 好友分组
  let friendGroup = ref<FgItem[]>([]);

  const setListType = (type: "message" | "friend" | "group") => {
    listType.value = type;
  };

  // 获取好友分组
  const getFGItem = async (friendGroups: any) => {
    // 分组的每一项
    let fgItemTemp: FgItem = {
      label: "",
      prop: "",
      items: [],
    };
    // 好友的每一项
    let fmItemTemp: FmItem = {
      label: "",
      avatar: "",
    };
    // 遍历好友分组，往其中添加好友
    for (const item of friendGroups) {
      fgItemTemp = {
        label: item.name,
        prop: "title",
        items: [],
      };
      // 查找该分组id下所有好友
      const fmList = await searchGroupFriend(item.id);
      // 将好友依次添加到分组当中
      fmList.forEach((friend: Friend) => {
        fmItemTemp = {
          label: friend.nickname,
          avatar: friend.avatar,
        };
        fgItemTemp.items.push(fmItemTemp);
      });
      friendGroup.value.push(fgItemTemp);
    }
  };

  return {
    listType,
    friendGroup,
    setListType,
    getFGItem,
  };
});
