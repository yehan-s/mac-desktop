interface ChatListState {
  listType: Ref<"message" | "friend" | "group">;
  friendGroupList: Ref<GroupList[]>;
  groupChatList: Ref<GroupItem[]>;
  // groupChatList: Ref<any[]>;
  setListType: (type: "message" | "friend" | "group") => void;
  getFGItem: (friendGroups: any[]) => void;
  getGroupItem: (groupChats: any[]) => void;
}
interface GroupList {
  label: string;
  prop: string;
  items: any[];
}
interface GroupItem {
  label: string;
  avatar: string;
}

import { searchGroupFriend } from "~/api/search";
import type { Friend } from "~/types";
export const useChatListStore = defineStore("chatList", (): ChatListState => {
  // 分组类型
  let listType = ref<"message" | "friend" | "group">("friend");
  // 好友分组
  let friendGroupList = ref<GroupList[]>([]);
  // 群聊列表  群聊不需要分组，只有item
  let groupChatList = ref<GroupItem[]>([]);

  const setListType = (type: "message" | "friend" | "group") => {
    listType.value = type;
  };

  // 获取好友分组
  const getFGItem = async (friendGroups: any) => {
    console.log("这是之前的", friendGroups);
    // 分组的每一项
    let fgItemTemp: GroupList = {
      label: "",
      prop: "",
      items: [],
    };
    // 好友的每一项
    let fmItemTemp: GroupItem = {
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
      friendGroupList.value.push(fgItemTemp);
    }
  };

  // 获取群聊
  const getGroupItem = async (groupChats: any) => {
    // 群聊的每一项
    let groupItemTemp: GroupItem = {
      label: "",
      avatar: "",
    };
    // 遍历群聊分组，往其中添加好友
    for (const item of groupChats) {
      groupItemTemp = {
        label: item.name,
        avatar: item.avatar,
      };

      // console.log(groupItemTemp);
      // console.log(groupChatList);
      groupChatList.value.push(groupItemTemp);
      // groupChatList.value.push(groupItemTemp);
    }
    console.log("hello");
    console.log("这里", groupChatList);
  };

  return {
    listType,
    friendGroupList,
    groupChatList,
    setListType,
    getFGItem,
    getGroupItem,
  };
});
