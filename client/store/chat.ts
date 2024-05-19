import socket from "@/utils/socket";
import { findUserInfo } from "~/api/user";

export const useChatStore = defineStore("chat", () => {
  // "sender_id": 4,
  // "receiver_id": 5,
  // "content": "这是一条很长的消息，用来测试是否达到预期效果，嘿嘿",
  // "room": "de97ea22-7488-45eb-8bc7-f2854ada7fb2",
  // "type": "private",
  // "media_type": "text"
  const currentChat = reactive({
    sender_id: 4, //自己的id
    receiver_id: 0, //对方的id
    content: "", //消息内容
    room: "", //房间号
    type: "private", //消息类型
    media_type: "text", //媒体类型
  });

  const chatSocket = reactive({});

  const setRoom = (room: string) => {
    currentChat.room = room;
    console.log(room);
  };

  // 将所有好友的连接都连上
  const connectHandler = async () => {
    // 先查找所有好友关系，从而获取到好友的room
    // 然后将所有好友的room都加入
    let res = await findUserInfo("yehan");
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

  return {
    currentChat,
    setRoom,
    sendMessage,
    connectHandler,
  };
});
