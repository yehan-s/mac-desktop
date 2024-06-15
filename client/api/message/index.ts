import { useClientRequest, useRequest } from "~/composables/useRequest";
import type * as MessageTypes from "./types";

// 发送消息
export function sendMessage(data: MessageTypes.SendMessageData) {
  return useClientRequest<MessageTypes.SendMessageData>("/chat/createMessage", {
    method: "POST",
    body: data,
  });
}

// 查找最后一条
export function findLastMessage(Room: string) {
  return useClientRequest<MessageTypes.GetMessagesResult>(
    `/chat/findLastMessage/${Room}`,
    {
      method: "GET",
    }
  );
}

// 查找房间下所有消息
export function findMessage(Room: string) {
  return useClientRequest<MessageTypes.GetMessagesResult[]>(
    `/chat/findMessage/${Room}`,
    {
      method: "GET",
    }
  );
}

// 查找群聊
export function findGroupchat(RoomName: string) {
  return useClientRequest(`/chat/findGroupchat/${RoomName}`, {
    method: "GET",
  });
}

// 添加群聊
export function addGroupMember(data: any) {
  return useClientRequest(`/chat/addGroupMember`, {
    method: "POST",
    body: data,
  });
}
