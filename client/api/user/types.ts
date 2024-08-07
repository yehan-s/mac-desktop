// 登录参数类型
export interface LoginData {
  username: string;
  password: string;
}
// 登录返回结果
export interface LoginResult {
  /** token */
  access_token: string;
}

// 更新好友的信息
export interface UpdateUserInfoDate {
  id: number;
  nickname: string;
  avatar: string;
  signature: string;
}
