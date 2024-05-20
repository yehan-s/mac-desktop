import socket from "@/utils/socket";
import { findMessage } from "~/api/message";
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
      sender_id: 4, //自己的id
      receiver_id: 0, //对方的id
      content: "", //消息内容
      room: "", //房间号
      type: "private", //消息类型
      media_type: "text", //媒体类型
    },
  });

  // 储存聊天框所有信息，当左侧消息列表点击时，将对应的room传入，然后获取对应的聊天记录
  const allMessage = ref([] as Message[]);

  // const chatSocket = reactive({});

  const setReceiver = async (receiver_id: number) => {
    currentChat.sendMessage.receiver_id = receiver_id;
    currentChat.privateObject = await findUserInfoByUserId(receiver_id);
  };

  const setRoom = (room: string) => {
    currentChat.sendMessage.room = room;
    console.log(room);
  };

  // 将所有好友的连接都连上
  const connectHandler = async () => {
    // 先查找所有好友关系，从而获取到好友的room
    // 然后将所有好友的room都加入
    let res = await findUserInfoByUsername("yehan");
    // console.log("connectHandler", res);
    let friends = res.friends;
    console.log("friends", friends);
    socket.connect();
    socket.emit("inintialize", friends);
  };

  // 发送消息
  const sendMessage = async () => {
    console.log("发送消息", currentChat);
    socket.emit("createMessage", currentChat);
  };

  const getAllMessage = async (room: string) => {
    allMessage.value = await findMessage(room);
  };

  return {
    currentChat,
    allMessage,
    setReceiver,
    setRoom,
    sendMessage,
    connectHandler,
    getAllMessage,
  };
});
