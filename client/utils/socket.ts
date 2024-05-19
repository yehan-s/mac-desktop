import { io } from "socket.io-client";

// const socket = io("http://localhost:81/chat");

const serverUrl = "http://localhost:81/chat"; // 服务器地址

const socket = io(serverUrl, {
  autoConnect: false, // 设置为false，不在创建io实例时自动连接
});

socket.on("connect", () => {
  console.log("utils中连接成功");
});

socket.on("disconnect", () => {
  console.log("utils中连接断开");
});

export default socket;
