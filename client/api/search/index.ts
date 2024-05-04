// index.ts
import { useClientRequest, useRequest } from "~/composables/useRequest";
import type * as SearchTypes from "./types";
import type { User } from "@/types/user";

// 登陆后查询用户详细信息
export function searchUser(username: string): Promise<User> {
  return useClientRequest(`/user/${username}`, {
    method: "GET",
    // params: data,
  });
}
