// index.ts
import { useClientRequest, useRequest } from "~/composables/useRequest";
import type * as UserTypes from "./types";
import type { User } from "@/types/user";

/** 登录 */
export function login(data: UserTypes.LoginData) {
  return useRequest<UserTypes.LoginResult>("/auth/signin", {
    method: "POST",
    body: data,
  });
}

/** 客户端登录 */
export function loginForClient(data: UserTypes.LoginData) {
  return useClientRequest<UserTypes.LoginResult>("/auth/signin", {
    method: "POST",
    body: data,
  });
}

// 登陆后查询用户详细信息 通过username
export function findUserInfoByUsername(username: string): Promise<User> {
  return useClientRequest<User>(`/user/username/${username}`, {
    method: "GET",
    // params: data,
  });
}

// 登陆后查询用户详细信息 通过userId
export function findUserInfoByUserId(userId: number): Promise<User> {
  return useClientRequest<User>(`/user/userId/${userId}`, {
    method: "GET",
    // params: data,
  });
}

// 查找用户详情通过username
// export function findUserByUsername(username: string): Promise<User> {
//   return useClientRequest<User>(`/user/${username}`, {
//     method: "GET",
//     // params: data,
//   });
// }
