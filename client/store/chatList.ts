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
  id?: number; //用来标识，方便group跳转到message列表
  room?: string;
  unread?: number;
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
  unread?: number;
}

import { findLastMessage } from "~/api/message";
import {
  findGroupMember,
  searchFriendByRoom,
  searchGroupFriend,
} from "~/api/search";
import type { Friend } from "~/types";
import socket from "~/utils/socket";

export const useChatListStore = defineStore("chatList", (): ChatListState => {
  // 分组类型
  let listType = ref<"message" | "friend" | "group">("message");
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
      // 这里
      item.friends.forEach((friend: any) => {
        let userItem = friend.user;
        let fmItemTemp: GroupItem = {
          label: userItem.nickname,
          avatar: userItem.avatar,
          id: userItem.id,
        };
        fgItemTemp.items.push(fmItemTemp);
        // console.log("先看看这个", userItem);
        // console.log("此处刚添加", fgItemTemp.items);
      });
      friendGroupList.value.push(fgItemTemp);
      console.log("获取成员的列表", friendGroupList);
    });
  };

  // 获取群聊
  const getGroupItem = async (groupChats: any) => {
    console.log("先让我看第一眼", groupChats);
    // let res = groupChats.map((item: any) => {
    //   return item.group;
    // });
    // 获取之前先清空
    groupChatList.value = [];
    console.log("这是我要提交的群聊之前", groupChatList);
    // console.log("这是我要提交的群聊", res);
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
      console.log("提交之后的群聊", groupChatList);
      // groupChatList.value.push(groupItemTemp);
    }
  };

  // 设置好友列表
  // 获取关联的分组，把所有分组下的好友都放到一个数组中
  const setFriendsList = (friendGroups: any) => {
    // 先清空
    console.log("先看下setFriendsList", friendGroups);
    friendsList = [];
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
  // 想要在变化好友的情况下，改变消息列表，一定要改变friendsList
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
      // console.log("看一下原始消息", MessageTemp);
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

      // 因为最后才能确定receiver_id,因此放在最后取unRead
      // 读取自己对 receiver 的unread
      let searchFriendData = {
        room: item.room,
        user_id: chatListItem.receiver_id,
      };
      // 查找未读消息数量（私聊）
      let friendship = await searchFriendByRoom(searchFriendData);
      chatListItem.unread = friendship.unread_msg_count;

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
      chatListItem.lastMessage = MessageTemp.content ?? "";
      chatListItem.date = (MessageTemp.created_at as string) ?? "";
      chatListItem.room = MessageTemp.room ?? "";
      chatListItem.type = MessageTemp.type ?? "";
      // 因为最后一条消息可能是对方发的，也可能是我方发的
      // 而这里必须拿到对方ID，方便后续操作
      if (MessageTemp.sender_id === userId) {
        chatListItem.receiver_id = MessageTemp.receiver_id ?? 0;
        chatListItem.sender_id = MessageTemp.sender_id ?? 0;
      } else {
        chatListItem.receiver_id = MessageTemp.sender_id ?? 0;
        chatListItem.sender_id = MessageTemp.receiver_id ?? 0;
      }

      // 因为最后才能确定receiver_id,因此放在最后取unRead
      // 读取自己对 receiver 的unread
      let searchMemberData = {
        room: item.room as string,
        user_id: chatListItem.sender_id,
      };
      // 查找未读消息数量（群聊）
      let res = await findGroupMember(searchMemberData);
      chatListItem.unread = res.unread;

      chatListTemp.push(chatListItem);
    }
    // 获取最新的更新消息
    chatList.value = chatListTemp;
    console.log("这是最新获取的chatList", chatList.value);
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
