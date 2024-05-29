import socket from "@/utils/socket";
import { findMessage, sendMessage } from "~/api/message";
import { findUserInfoByUserId, findUserInfoByUsername } from "~/api/user";
import type { Message } from "~/types";

export const useChatStore = defineStore("chat", () => {
  // "sender_id": 4,
  // "receiver_id": 5,
  // "content": "这是一条很长的消息，用来测试是否达到预期效果，嘿嘿",
  // "room": "de97ea22-7488-45eb-8bc7-f2854ada7fb2",
  // "type": "private",
  // "media_type": "text"

  const currentChat = reactive({
    privateObject: {
      id: 0,
      avatar: "",
      nickname: "",
    },
    sendMessage: {
      sender_id: 0, //自己的id
      receiver_id: 0, //对方的id
      content: "", //消息内容
      room: "", //房间号
      type: "", //消息类型
      media_type: "", //媒体类型
    },
  });

  // 消息原本是不需要带头像的，本地仓库存放了双方的头像
  // 但是群聊中，不好都存放，多次请求也太消耗性能
  // 因此直接放入数组
  interface MessageWithAvatar extends Message {
    avatar?: string;
    nickname?: string;
  }
  // 储存聊天框所有信息，当左侧消息列表点击时，将对应的room传入，然后获取对应的聊天记录
  const allMessage = ref([] as MessageWithAvatar[]);

  // 登录的时候会被调用
  const setSenderId = (id: number) => {
    currentChat.sendMessage.sender_id = id;
  };

  const setReceiver = async (receiver_id: number) => {
    currentChat.sendMessage.receiver_id = receiver_id;
    currentChat.privateObject = await findUserInfoByUserId(receiver_id);
  };

  const setRoom = (room: string) => {
    currentChat.sendMessage.room = room;
    console.log(room);
  };

  const setType = (type: string) => {
    currentChat.sendMessage.type = type;
  };

  const chatMessageRef = ref();

  // 将所有好友的连接都连上 登录的时候会被调用
  const connectHandler = async () => {
    // 先查找所有好友关系，从而获取到好友的room
    // 然后将所有好友的room都加入
    let res = await findUserInfoByUserId(currentChat.sendMessage.sender_id);
    // console.log("connectHandler", res);
    let friends = res.friends;
    console.log("friends", friends);
    socket.connect();
    socket.emit("inintialize", friends);
  };

  // 发送消息
  const sendPrivateMessage = async (content: string) => {
    console.log("发送消息", currentChat);

    currentChat.sendMessage.content = content;
    currentChat.sendMessage.type = "private";
    currentChat.sendMessage.media_type = "text";

    await sendMessage(currentChat.sendMessage);
    await getAllMessage(currentChat.sendMessage.room);
    socket.emit("sendPrivate", currentChat.sendMessage);
    // 直接添加到chatList就不需要请求数据库
    // addMessage(JSON.parse(JSON.stringify(currentChat.sendMessage)));

    scrollToBottom();
  };

  socket.on("sendPrivate", async (data) => {
    // addMessage(data);
    // 发送消息，最后一条消息接收不到，肯能数据库还没刷出来把
    await getAllMessage(currentChat.sendMessage.room);
    scrollToBottom();
  });

  // 获取该房间下的所有消息
  const getAllMessage = async (room: string) => {
    // room为空的话，说明是刚进入没页面，还没有选择聊天对象
    if (room) {
      allMessage.value = await findMessage(room);

      // 判断是否是群聊消息
      // 是的话为每个消息添加上发送者头像
      if (allMessage.value) {
        if (allMessage.value[0].type === "group") {
          for (let item of allMessage.value) {
            const res = await findUserInfoByUserId(item.sender_id);
            item.avatar = res.avatar;
            item.nickname = res.nickname;
          }
        }
      }
    }
  };

  const scrollToBottom = () => {
    chatMessageRef.value.scrollTop = chatMessageRef.value.scrollHeight;
  };

  // 添加消息
  const addMessage = (message: Message) => {
    allMessage.value.push(message);
  };

  return {
    currentChat,
    allMessage,
    chatMessageRef,
    setReceiver,
    setRoom,
    sendPrivateMessage,
    setSenderId,
    setType,
    connectHandler,
    getAllMessage,
    scrollToBottom,
  };
});
