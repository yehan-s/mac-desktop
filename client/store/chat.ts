import socket from "@/utils/socket";
import { findMessage, sendMessage } from "~/api/message";
import {
  addGroupUnread,
  addPrivateUnread,
  clearGroupUnread,
  clearPrivateUnread,
} from "~/api/search";
import { findUserInfoByUserId, findUserInfoByUsername } from "~/api/user";
import type { Message, VideoType } from "~/types";
import { CallStatus, type callStatusType } from "~/types/video";

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
    groupObject: {},
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

  // 存储当前私聊对象的信息
  const setReceiver = async (receiver_id: number) => {
    currentChat.sendMessage.receiver_id = receiver_id;
    console.log("存储消息的时候触发了一次获取信息");
    // 存储对方的 userInfo
    currentChat.privateObject = await findUserInfoByUserId(receiver_id);
  };
  // 存储当前群聊对象的信息
  const setGroupReceiver = async (item: {}) => {
    currentChat.groupObject = item;
    currentChat.privateObject.nickname = "";
    // 群聊消息中 sender_id 和 recevier_id 是一样的
    currentChat.sendMessage.receiver_id = item.sender_id;
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
    console.log("初始化的时候获取信息");
    let res = await findUserInfoByUserId(currentChat.sendMessage.sender_id);
    console.log("connectHandler", res);
    let friends = res.friends;
    // let groupChats = res.groupChats;
    let groupChats = res.groupMembers!.map(
      (item: { group: any }) => item.group
    );
    const list = friends?.concat(groupChats);
    // console.log("friends", friends);
    // console.log("记得删除！！！！！", list);
    socket.connect();
    socket.emit("inintialize", list);
  };

  // 发送消息
  const sendPrivateMessage = async (content: string, media_type = "text") => {
    console.log("发送消息", currentChat);

    currentChat.sendMessage.content = content;
    currentChat.sendMessage.type = currentChat.sendMessage.type;
    currentChat.sendMessage.media_type = media_type;

    // 往数据库存储消息，并读取最新消息
    await sendMessage(currentChat.sendMessage);
    await getAllMessage(currentChat.sendMessage.room);

    // 添加未读消息 传入的id是自己的，意思是别人对自己的未读消息+1
    if (currentChat.sendMessage.type === "private") {
      // 如果是音频，不增加未读，不滚动屏幕
      if (currentChat.sendMessage.media_type === "video") {
      }

      // 添加未读
      await addPrivateUnread({
        room: currentChat.sendMessage.room,
        user_id: currentChat.sendMessage.sender_id,
      });
      socket.emit("sendPrivate", currentChat.sendMessage);
    } else if (currentChat.sendMessage.type === "group") {
      await addGroupUnread({
        room: currentChat.sendMessage.room,
        user_id: currentChat.sendMessage.sender_id,
      });
      socket.emit("sendPrivate", currentChat.sendMessage);
    }
    // 直接添加到chatList就不需要请求数据库
    // addMessage(JSON.parse(JSON.stringify(currentChat.sendMessage)));

    scrollToBottom();
  };

  // 接收私聊消息
  socket.on("sendPrivate", async (data) => {
    // 发送消息，最后一条消息接收不到，肯能数据库还没刷出来把
    await getAllMessage(currentChat.sendMessage.room);
    // 不选择滚动
    // bug:不是选定当前聊天框也会滚动
    // 收到消息是当前选中框才会触发滚动
    if (currentChat.sendMessage.room === data.room) {
      scrollToBottom();
    }
  });

  // 获取该房间下的所有消息
  const getAllMessage = async (room: string) => {
    // room为空的话，说明是刚进入没页面，还没有选择聊天对象
    if (room) {
      // allMessage.value = await findMessage(room);
      let allMessageTemp = await findMessage(room);

      // 判断是否是群聊消息
      // 是的话为每个消息添加上发送者头像
      if (allMessageTemp) {
        if (allMessageTemp[0].type === "group") {
          const objectInfo: { id: number; avatar: string; nickname: string }[] =
            [];
          // 存储返回信息 缺少类型
          let res: any;
          for (let item of allMessageTemp) {
            // 触发了多次 bug
            // 通过查找每个信息的发送者id，获取发送者的信息得到头像
            // 减少查询次数，同样最好只查询一次
            const foundObject = objectInfo.find(
              (obj) => obj.id === item.sender_id
            );
            // 为true说明，已存过信息，不需要发请求，直接查找并赋值
            // 为false说明，没有存过信息，需要发请求，存储信息
            if (foundObject) {
              console.log("我进入了哦");
              objectInfo.forEach((obj) => {
                if (obj.id === item.sender_id) {
                  res.avatar = obj.avatar;
                  res.nickname = obj.nickname;
                }
              });
            } else {
              console.log("获取所有信息的时候获取信息");
              res = await findUserInfoByUserId(item.sender_id);
              objectInfo.push({
                id: item.sender_id,
                avatar: res.avatar,
                nickname: res.nickname,
              });
            }
            // 会导致页面闪烁
            item.avatar = res.avatar;
            item.nickname = res.nickname;
          }
        }
        allMessage.value = allMessageTemp;
      } else {
        allMessage.value = allMessageTemp;
      }
    }
  };

  // 清空未读消息
  const clearUnread = async () => {
    if (currentChat.sendMessage.type === "private") {
      await clearPrivateUnread({
        room: currentChat.sendMessage.room,
        user_id: currentChat.sendMessage.receiver_id,
      });
    } else if (currentChat.sendMessage.type === "group") {
      await clearGroupUnread({
        room: currentChat.sendMessage.room,
        user_id: currentChat.sendMessage.sender_id,
      });
    }
  };

  const scrollToBottom = () => {
    if (chatMessageRef.value) {
      chatMessageRef.value.scrollTop = chatMessageRef.value.scrollHeight;
    } else {
      console.log("没有选定聊天框，不滚动");
    }
  };

  // 添加消息
  const addMessage = (message: Message) => {
    allMessage.value.push(message);
  };

  // 音频
  let videoIsOpen = ref(false); // 是否打开音视频通话组件
  let localStream: MediaStream; // 本地音视频流，用于存储自己的音视频流，方便结束时关闭
  let myVideoRef = ref<HTMLVideoElement | null>(null); // 本地音视频流 video 标签
  let otherVideoRef = ref<HTMLVideoElement | null>(null); // 远程音视频流 video 标签
  let isBusy = ref(false); // 是否正在通话中
  let callStatus = ref<VideoType.callStatusType>(CallStatus.CLOSED); // 通话状态
  let pc: RTCPeerConnection | null = null; // RTCPeerConnection 实例 本机
  let myInfo = reactive({
    id: 0,
    nickname: "",
    avatar: "",
    room: "",
  }); // 自己的信息
  let receiveVideoInfo = reactive({
    id: 0,
    nickname: "",
    avatar: "",
    room: "",
  });
  // 连接socket
  // 打开音视频通话组件时建立 websocket 连接
  const initSocket = async () => {
    // 连接时初始化
    // myInfo.nickname = c
    // 如果是通话发起人，则初始化音视频流并发送创建房间指令
    // console.log("看看是不是true", callStatus === CallStatus.INITIATE);
    // if (callStatus === CallStatus.INITIATE) {
    //   try {
    //     console.log("尝试初始化音视频流");
    //     // 1、获取并设置自己的音视频流
    //     await initStream();
    //     // 2、给被邀请人发送创建房间的指令（mode 作用是区分是私聊还是群聊，callReceiverList 作用是说明哪些人需要被邀请加入通话）
    //     // socket.current?.send(
    //     //   JSON.stringify({
    //     //     name: "create_room",
    //     //     mode:
    //     //       connectParams.type === "private"
    //     //         ? "private_video"
    //     //         : "group_video",
    //     //     callReceiverList: callInfo.callReceiverList,
    //     //   })
    //     // );
    //     console.log("正确初始化音视频流获取成功");
    //   } catch {
    //     // showMessage(
    //     //   "error",
    //     //   "获取音频流失败，请检查设备是否正常或者权限是否已开启"
    //     // );
    //     alert("获取音频流失败，请检查设备是否正常或者权限是否已开启  socket");
    //     // socket.current?.send(JSON.stringify({ name: "reject" }));
    //     // socket.current?.close();
    //     // socket.current = null;
    //     // localStream.current?.getAudioTracks()[0].stop();
    //     // localStream.current!.getVideoTracks()[0].stop();
    //     // setTimeout(() => {
    //     //   handleModal(false);
    //     // }, 1500);
    //   }
    // }
    // socket.on("connected", onConnected);
    // socket.on("room_created", onCreateRoom);
    // socket.on("room_joined", onJoinRoomSuccess);
    // socket.on("room_full", onJoinRoomFail);
  };
  socket.on("receive_video", onReceiveVideo);
  socket.on("accept_video", onAcceptVideo);
  socket.on("receive_offer", onReceiveOffer);
  socket.on("receive_answer", onReceiveAnswer);
  socket.on("receive_candidate", onAddCandidate);
  // socket.on("request_video", acceptVideoCall); // 创建RTC实例

  // 初始化本人音视频流
  const initStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      localStream = stream;
      console.log("初始化的stream", localStream);
      // 私聊时，被邀请人显示自己的视频流需要单独渲染
      // 什么都没点击时，type时null
      // if (currentChat.sendMessage.type === "private") {
      if (myVideoRef.value) {
        console.log("己方视频流已加载");
        myVideoRef.value!.srcObject = localStream;
      }
      // }
    } catch {
      // showMessage(
      //   "error",
      //   "获取音频流失败，请检查设备是否正常或者权限是否已开启"
      // );
      // handleModal(false);
      alert("获取音频流失败，请检查设备是否正常或者权限是否已开启");
    }
  };

  // 初始化 PC 通道（为房间内每个能接收到自己音视频流的人创建一个专属的 RTCPeerConnection 连接实例，该实例是真正负责音视频通信的角色）
  // const initPC = (username: string) => {
  //   // pc是己方的RTCPeerConnection实例
  //   const pc = new RTCPeerConnection();
  //   // 给 PC 绑定 onicecandidate 事件，该事件将会 PC 通道双方彼此的 SDP（会话描述协议）设置完成之后自动触发，给对方发送自己的 candidate 数据（接收 candidate，交换 ICE 网络信息）
  //   pc.onicecandidate = (evt) => {
  //     if (evt.candidate) {
  //       // socket.current?.send(
  //       //   JSON.stringify({
  //       //     name: `ice_candidate`,
  //       //     data: {
  //       //       id: evt.candidate.sdpMid,
  //       //       label: evt.candidate.sdpMLineIndex,
  //       //       sdpMLineIndex: evt.candidate.sdpMLineIndex,
  //       //       candidate: evt.candidate.candidate,
  //       //     },
  //       //     receiver: username,
  //       //   })
  //       // );
  //     }
  //   };
  //   // 给 PC 绑定 ontrack 事件，该事件用于接收远程视频流并播放，将会在双方交换并设置完 ICE 之后自动触发
  //   pc.ontrack = (evt) => {
  //     // if (evt.streams && evt.streams[0]) {
  //     //   const video = document.querySelector(
  //     //     `.video_${username}`
  //     //   ) as HTMLVideoElement;
  //     //   if (video) {
  //     //     video.srcObject = evt.streams[0];
  //     //   }
  //     // }
  //   };
  //   // callListRef.current[username] = {
  //   //   PC: pc,
  //   //   alias:
  //   //     callInfo.callReceiverList.find((item) => item.username === username)
  //   //       ?.alias || "",
  //   //   avatar:
  //   //     callInfo.callReceiverList.find((item) => item.username === username)
  //   //       ?.avatar || "",
  //   // };
  // };

  // socket一系列操作

  // 发起视频通话申请 己方
  async function requestVideoCall() {
    myInfo.room = currentChat.sendMessage.room;
    socket.emit("request_video", myInfo); //自己info给对方
    // 不能在这获取流，此时还没有DOM
  }

  // 收到视频通话申请 对方
  function onReceiveVideo(userInfo: any) {
    // 打开对话框
    setCallStatus(CallStatus.RECEIVE);
    if (!videoIsOpen.value) {
      videoIsOpen.value = true;
    }
    console.log("onReceiveVideo,有下一步跳转acceptVideoCall");
    console.log("userInfo", userInfo);
    // @ts-ignore
    receiveVideoInfo.id = userInfo.id;
    receiveVideoInfo.nickname = userInfo.nickname;
    receiveVideoInfo.room = userInfo.room;
    receiveVideoInfo.avatar = userInfo.avatar;

    // 清空myInfo
    Object.assign(myInfo, {});

    // 点击接通手动触发
    // acceptVideoCall(userInfo); //别人的info给自己
  }

  // 用户接受通话申请 对方
  // 跳出对话框点击接收触发
  async function acceptVideoCall() {
    console.log("接听视频通话，方法不一定触发");
    callStatus.value = CallStatus.CALLING;
    // 此时，对方的room可能是null，直接获取传过来的info
    // myInfo.room = userInfo.room;
    // if (!videoIsOpen.value) {
    //   videoIsOpen.value = true;
    // }
    await nextTick();
    // if (!pc) {
    // 1、获取并设置自己的音视频流
    await initStream();
    // 2、创建并设置自己的 RTCPeerConnection 实例
    createPeerConnection();
    // }
    // onReceiveVideo("夜寒");
    socket.emit("accept_video", receiveVideoInfo); //别人的info
    // socket.emit("accept_video", userInfo); //别人的info
  }

  // 用户正在接听视频 己方
  async function onAcceptVideo() {
    // 接受通话化，此时打开音视频通话组件
    console.log("检测是否需要", !videoIsOpen.value);
    callStatus.value = CallStatus.CALLING;
    // 必须重新获取
    // if (!pc) {
    // 1、获取并设置自己的音视频流
    await initStream();
    // 2、创建并设置自己的 RTCPeerConnection 实例
    createPeerConnection();
    // }
    // 3、给对方发送自己的 offer
    await sendOffer();
  }

  // 建立点对点连接
  function createPeerConnection() {
    console.log("createPeerConnection已经初始化----");
    console.log("看下pc状态", pc?.signalingState);
    // if (!pc || pc.connectionState === "closed") {
    pc = new RTCPeerConnection();
    // }

    pc.onicecandidate = onIceCandidate;
    pc.oniceconnectionstatechange = onIceConnectionStateChange;
    pc.ontrack = onTrack;
    pc.onicegatheringstatechange = onicegatheringstatechange;

    // console.log("给pc传入track", localStream);
    // console.log("看看tracks", localStream.getTracks());
    localStream.getTracks().forEach((track) => {
      pc?.addTrack(track, localStream);
    });
  }

  // 用于处理本地 PeerConnection 生成的 ICE 候选者。这些候选者是用来尝试在不同网络路径上建立连接的。当本地 PeerConnection 产生新的 ICE 候选者时，它会触发 onIceCandidate 事件，并将候选者信息传递给相应的处理函数。
  function onIceCandidate(event: RTCPeerConnectionIceEvent) {
    console.log("onIceCandidate", event.candidate);
    // 最后一个会为null
    if (event.candidate) {
      socket.emit("add_candidate", {
        candidate: event.candidate,
        room: myInfo.room || receiveVideoInfo.room,
      });
    }
  }
  // 检测WebRTC（Web实时通信）中的 ICE 连接状态 更改
  // "new"：初始状态，表示ICE代理已创建。
  // "checking"：ICE代理正在尝试收集候选者，并且正在进行STUN（会话遍历实用程序）或TURN（中继转发）服务器交互以验证网络连接性。
  // "connected"：ICE代理已成功建立对等连接。
  // "completed"：ICE代理已完成收集所有候选者，并且至少有一个合适的候选者已使用。
  // "failed"：ICE代理无法建立连接，可能由于网络错误或STUN/TURN服务器不可用。
  // "disconnected"：先前建立的连接已断开。
  // "closed"：ICE代理已关闭。
  function onIceConnectionStateChange() {
    console.log(
      `oniceconnectionstatechange, pc.iceConnectionState is ${pc!.iceConnectionState}.`
    );
  }
  // 在接收到远程媒体轨道时执行操作
  function onTrack(event: RTCTrackEvent) {
    // document.getElementById("remote-video").srcObject = event.streams[0];
    otherVideoRef.value!.srcObject = event.streams[0];
    console.log("onTrack", event);
  }
  // 用于检测ICE收集状态的更改
  // "new"：初始状态，表示ICE代理已创建。
  // "gathering"：ICE代理正在收集候选者。
  // "complete"：ICE代理已完成收集所有候选者。
  function onicegatheringstatechange() {
    if (pc!.iceGatheringState === "gathering") {
      console.log("正在收集ICE候选...");
    } else if (pc!.iceGatheringState === "complete") {
      console.log("ICE候选收集完成");
    }
  }

  // 发送方创建offer （己方）
  // 自己的pc设置setLocalDescription（offer）
  async function sendOffer() {
    try {
      const offer: RTCSessionDescriptionInit = await pc!.createOffer();
      // 接下来，设置己方LOCAL OFFER，并将 offer 发送到对等方
      await pc!.setLocalDescription(offer);
      console.log("发送offer", pc!.signalingState);
      // 发送 offer 到对等方...
      socket.emit("offer", { offer, userInfo: myInfo });
    } catch (error) {
      console.error("创建 offer 失败", error);
    }
  }

  // 收到 offer 信令后应答 （对方）
  // 对方的pc设置setRemoteDescription（offer）
  async function onReceiveOffer(offer: RTCSessionDescriptionInit) {
    if (!pc) return;
    // 设置对方的 REMOTE OFFER
    try {
      await pc.setRemoteDescription(offer);
      console.log("接受offer，等待发送answer", pc.signalingState);
      const answer: RTCSessionDescriptionInit = await pc.createAnswer();
      pc.setLocalDescription(answer);
      console.log("接收remote-offer,发送answer", pc.signalingState);
      console.log("answer这里我看看信息", receiveVideoInfo);
      socket.emit("answer", { answer, userInfo: receiveVideoInfo });
    } catch (error) {
      console.warn("接受offer失败", error);
    }
  }

  // 收到 answer 信令后（己方）、
  // 自己的pc设置setRemoteDescription（answer）
  async function onReceiveAnswer(answer: RTCSessionDescriptionInit) {
    try {
      await pc!.setRemoteDescription(answer);
      console.log("接受answer", pc!.signalingState);
    } catch (error) {
      console.warn("接受answer失败", error);
    }
  }

  // 收到 candidate 信令后
  async function onAddCandidate(candidate: RTCIceCandidateInit) {
    console.log("接收candidate", candidate);
    await pc!.addIceCandidate(candidate);
  }

  // 点击通话开关
  const videoHandler = (userInfo: {
    id: number;
    nickname: string;
    avatar: string;
  }) => {
    // 将user的信息传入myInfo
    myInfo.id = userInfo.id;
    myInfo.nickname = userInfo.nickname;
    myInfo.avatar = userInfo.avatar;
    myInfo.room = currentChat.sendMessage.room;
    Object.assign(receiveVideoInfo, {});
    setCallStatus(CallStatus.INITIATE);
    videoIsOpen.value = true;
    if (videoIsOpen.value) {
      requestVideoCall();
    } else {
      // 结束通话
      // socket.current?.send(JSON.stringify({ name: "reject" }));
      // socket.current?.close();
      // socket.current = null;
      // localStream.current?.getAudioTracks()[0].stop();
      // localStream.current!.getVideoTracks()[0].stop();
    }
  };

  // 设置童话状态的改变
  const setCallStatus = (val: callStatusType) => {
    callStatus.value = val;
  };

  // 关闭通话
  const closeVideo = () => {
    // 如果是请求时关闭，需要先方便后续判断
    if (callStatus.value === CallStatus.INITIATE) {
      videoIsOpen.value = false;
      setCallStatus(CallStatus.CLOSED);
    }
    // 需要关闭双方
    // if (callStatus.value !== CallStatus.INITIATE) {
    socket.emit("closeVideo", myInfo.room || receiveVideoInfo.room);
    // }
  };
  socket.on("closeVideo", () => {
    // 被拒绝接听 此时没生成流，无需关闭
    if (callStatus.value === CallStatus.INITIATE) {
      useNuxtApp().$toast.add({
        severity: "warn",
        detail: "对方拒绝接听",
        life: 3000,
      });
      setCallStatus(CallStatus.CLOSED);
    }
    if (callStatus.value === CallStatus.CALLING) {
      setCallStatus(CallStatus.CLOSED);
      endCall();
    }
    videoIsOpen.value = false;
  });

  // 关闭媒体流：首先，你需要关闭本地和远端的媒体流。这可以通过调用每个MediaStream对象的getTracks方法来获取所有轨道（音频和视频），然后调用每个轨道的stop方法来实现。
  function closeMediaStream(stream: MediaStream) {
    stream.getTracks().forEach((track: MediaStreamTrack) => {
      track.stop();
    });
    console.log("stream", stream);
    console.log("stream", stream.getTracks());
    console.log("getAudioTracks", stream.getAudioTracks());
    console.log("getVideoTracks", stream.getVideoTracks());
    // stream?.getAudioTracks()[0].stop();
    // stream!.getVideoTracks()[0].stop();
  }
  // 关闭RTCPeerConnection：接下来，你需要关闭RTCPeerConnection。这可以通过调用其close方法来完成。
  function closePeerConnection(peerConnection: RTCPeerConnection) {
    peerConnection.close();
  }
  // 清理DOM：最后，你可能需要从DOM中移除视频元素和其他与通话相关的元素。
  function removeVideoElements() {
    if (myVideoRef.value) {
      myVideoRef.value.srcObject = null;
      myVideoRef.value.remove();
    }
    if (otherVideoRef.value) {
      otherVideoRef.value.srcObject = null;
      otherVideoRef.value.remove();
    }
  }
  // 在实际的应用中，你可能需要将这些步骤组合在一起，以便在需要时可以优雅地断开连接。

  function endCall() {
    closeMediaStream(localStream);
    closePeerConnection(pc!);
    removeVideoElements();
  }

  return {
    currentChat,
    allMessage,
    chatMessageRef,
    setReceiver,
    setGroupReceiver,
    setRoom,
    sendPrivateMessage,
    setSenderId,
    setType,
    connectHandler,
    getAllMessage,
    clearUnread,
    scrollToBottom,
    videoIsOpen,
    myVideoRef,
    otherVideoRef,
    myInfo,
    receiveVideoInfo,
    callStatus,
    initSocket,
    initStream,
    requestVideoCall,
    videoHandler,
    acceptVideoCall,
    setCallStatus,
    closeVideo,
  };
});
