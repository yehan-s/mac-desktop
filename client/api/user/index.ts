// index.ts
import { useClientRequest, useRequest } from "~/composables/useRequest";
import type * as UserTypes from "./types";

/** 登录 */
export function login(data: UserTypes.LoginData) {
  return useRequest<UserTypes.LoginResult>("/auth/login", {
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
