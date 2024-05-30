interface ChatListState {
  listType: Ref<"message" | "friend" | "group">;
  friendGroupList: Ref<GroupList[]>;
  groupChatList: Ref<GroupItem[]>;
  chatList: Ref<chatListItem[]>;
  friendsList: any[];
  // groupChatList: Ref<any[]>;
  setListType: (type: "message" | "friend" | "group") => void;
  getFGItem: (friendGroups: any[]) => void;
  getGroupItem: (groupChats: any[]) => void;
  setFriendsList: (friendGroups: any[]) => void;
  getLMToChatList: (userId: number) => void;
}
// 分组需要的格式
interface GroupList {
  label: string;
  prop: string;
  items: any[];
}
interface GroupItem {
  label: string;
  avatar: string;
  room?: string;
}

// 需要 username, avatar, lastMessage, date, room
interface chatListItem {
  nickname: string;
  avatar: string;
  lastMessage?: string;
  // 这里我们将时间戳转换为日期格式时，需要使用string类型
  date?: string;
  room?: string;
  receiver_id?: number;
  sender_id?: number;
  type?: string;
}

import { findLastMessage } from "~/api/message";
import { searchGroupFriend } from "~/api/search";
import type { Friend } from "~/types";
import socket from "~/utils/socket";

export const useChatListStore = defineStore("chatList", (): ChatListState => {
  // 分组类型
  let listType = ref<"message" | "friend" | "group">("friend");
  // 好友分组
  let friendGroupList = ref<GroupList[]>([]);
  // 群聊列表  群聊不需要分组，只有item
  let groupChatList = ref<GroupItem[]>([]);

  // 消息列表
  let chatList = ref([] as chatListItem[]);
  // 好友列表 只用来实际操作
  let friendsList: any[] = [];
  // 群聊列表

  const setListType = (type: "message" | "friend" | "group") => {
    listType.value = type;
  };

  // 获取好友分组 用来展示好友列表
  const getFGItem = async (friendGroups: any) => {
    // 更新分组时需清空
    friendGroupList.value = [];
    friendGroups.forEach((item: any) => {
      let fgItemTemp: GroupList = {
        label: item.name,
        prop: "title",
        items: [],
      };
      item.friends.forEach((friend: any) => {
        let userItem = friend.user;
        let fmItemTemp: GroupItem = {
          label: userItem.nickname,
          avatar: userItem.avatar,
        };
        fgItemTemp.items.push(fmItemTemp);
      });
      friendGroupList.value.push(fgItemTemp);
    });
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
        room: item.room,
      };


      groupChatList.value.push(groupItemTemp);
      // groupChatList.value.push(groupItemTemp);
    }
  };

  // 设置好友列表
  // 获取关联的分组，把所有分组下的好友都放到一个数组中
  const setFriendsList = (friendGroups: any) => {
    friendGroups.forEach((item: any) => {
      item.friends.forEach((friend: any) => {
        friendsList.push(friend);
      });
    });
  };

  // const setGroupchatList = (item)=>{

  // }

  // 获取消息列表
  // 显示最后一条消息
  const getLMToChatList = async (userId: number) => {
    // 把数组赋空
    // chatList.value = [];
    let chatListTemp: chatListItem[] = [];
    for (let item of friendsList) {
      // 在循环内部创建一个新的 chatListItem 对象
      // 修改
      let chatListItem: chatListItem = {
        nickname: item.user.nickname,
        avatar: item.user.avatar,
      };
      let MessageTemp = await findLastMessage(item.room);
      console.log("!!!!!!!!!!!", MessageTemp);
      chatListItem.lastMessage = MessageTemp.content;
      chatListItem.date = MessageTemp.created_at as string;
      chatListItem.room = MessageTemp.room;
      chatListItem.type = MessageTemp.type;
      // 因为最后一条消息可能是对方发的，也可能是我方发的
      // 而这里必须拿到对方ID，方便后续操作
      // 因此 chatListItem.reveicer_id 必须是对方id
      if (MessageTemp.sender_id === userId) {
        chatListItem.receiver_id = MessageTemp.receiver_id;
        chatListItem.sender_id = MessageTemp.sender_id;
      } else {
        chatListItem.receiver_id = MessageTemp.sender_id;
        chatListItem.sender_id = MessageTemp.receiver_id;
      }

      // console.log("在这呢看看", MessageTemp);
      // console.log("这是我要提交前的chatListItem", chatListItem);
      chatListTemp.push(chatListItem);
    }

    // 这里还需要添加群聊消息

    for (let item of groupChatList.value) {
      // 在循环内部创建一个新的 chatListItem 对象
      // 修改
      let chatListItem: chatListItem = {
        nickname: item.label,
        avatar: item.avatar,
      };
      let MessageTemp = await findLastMessage(item.room as string);
      console.log("!!!!!!!!!!!", MessageTemp);
      chatListItem.lastMessage = MessageTemp.content;
      chatListItem.date = MessageTemp.created_at as string;
      chatListItem.room = MessageTemp.room;
      chatListItem.type = MessageTemp.type;
      // 因为最后一条消息可能是对方发的，也可能是我方发的
      // 而这里必须拿到对方ID，方便后续操作
      if (MessageTemp.sender_id === userId) {
        chatListItem.receiver_id = MessageTemp.receiver_id;
        chatListItem.sender_id = MessageTemp.sender_id;
      } else {
        chatListItem.receiver_id = MessageTemp.sender_id;
        chatListItem.sender_id = MessageTemp.receiver_id;
      }

      console.log("在这呢看看", MessageTemp);
      // console.log("这是我要提交前的chatListItem", chatListItem);
      chatListTemp.push(chatListItem);
    }
    // let
    chatList.value = chatListTemp;
    console.log("这是我要提交的chatList", chatList.value);
    console.log("-----------", friendsList);
  };

  return {
    listType,
    friendGroupList,
    groupChatList,
    chatList,
    friendsList,
    setListType,
    getFGItem,
    getGroupItem,
    setFriendsList,
    getLMToChatList,
  };
});
