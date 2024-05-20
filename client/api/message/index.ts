import { useClientRequest, useRequest } from "~/composables/useRequest";
import type * as MessageTypes from "./types";

export function sendMessage(data: MessageTypes.SendMessageData) {
  return useClientRequest<MessageTypes.SendMessageData>("/chat/sendMessage", {
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

// 查找房间下所有
export function findMessage(Room: string) {
  return useClientRequest<MessageTypes.GetMessagesResult[]>(
    `/chat/findMessage/${Room}`,
    {
      method: "GET",
    }
  );
}
