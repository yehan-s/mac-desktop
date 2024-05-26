// index.ts
import { useClientRequest, useRequest } from "~/composables/useRequest";
import type * as SearchTypes from "./types";
import type { User, Friend } from "@/types/index";

// 登陆后查询用户详细信息   用来搜友查找好友
export function searchUser(username: string): Promise<User> {
  return useClientRequest(`/user/username/${username}`, {
    method: "GET",
    // params: data,
  });
}

// 查找分组内好友
export function searchGroupFriend(groupId: number): Promise<Friend[]> {
  return useClientRequest(`/chat/findFriend/${groupId}`, {
    method: "GET",
  });
}
