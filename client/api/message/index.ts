import { useClientRequest, useRequest } from "~/composables/useRequest";
import type * as MessageTypes from "./types";

export function sendMessage(data: MessageTypes.SendMessageData) {
  return useClientRequest<MessageTypes.SendMessageData>("/chat/sendMessage", {
    method: "POST",
    body: data,
  });
}

export function findLastMessage(Room: string) {
  return useClientRequest<MessageTypes.GetLastMessagesResult>(
    `/chat/findMessage/${Room}`,
    {
      method: "GET",
    }
  );
}
