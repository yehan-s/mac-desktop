import { useClientRequest, useRequest } from "~/composables/useRequest";
import * as AddTypes from "./types";

// 添加好友
export function addFriend(data: AddTypes.AddFriendData) {
  return useClientRequest<AddTypes.AddFriendData>("/chat/createFriend", {
    method: "POST",
    body: data,
  });
}
