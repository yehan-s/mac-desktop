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

// 查找房间号内好友
export function searchFriendByRoom(data: {
  room: string;
  user_id: number;
}): Promise<Friend> {
  return useClientRequest(`/chat/findFriendByRoom`, {
    method: "GET",
    params: data,
  });
}

// 添加未读消息 私聊
export function addPrivateUnread(data: { room: string; user_id: number }) {
  return useClientRequest(`/chat/addPrivateUnread`, {
    method: "POST",
    body: data,
  });
}

// 添加未读消息 群聊
export function addGroupUnread(data: { room: string; user_id: number }) {
  return useClientRequest(`/chat/addGroupUnread`, {
    method: "POST",
    body: data,
  });
}

// 清空未读消息 私聊
export function clearPrivateUnread(data: { room: string; user_id: number }) {
  return useClientRequest(`/chat/clearPrivateUnread`, {
    method: "POST",
    body: data,
  });
}

// 清空未读消息 群聊
export function clearGroupUnread(data: { room: string; user_id: number }) {
  return useClientRequest(`/chat/clearGroupUnread`, {
    method: "POST",
    body: data,
  });
}

// 查找群成员 可以查找未读消息
export function findGroupMember(data: {
  room: string;
  user_id: number;
}): Promise<SearchTypes.GroupMember> {
  return useClientRequest(`/chat/findGroupMember`, {
    method: "GET",
    params: data,
  });
}

// 获取所有群成员
export function findAllGroupMember(data: { room: string }): Promise<User[]> {
  return useClientRequest(`/chat/findAllGroupMember`, {
    method: "GET",
    query: data,
  });
}
