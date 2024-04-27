// types.ts
/** 登录参数类型 */
export type LoginData = {
  username: string;
  password: string;
};
/** 登录返回结果 */
export type LoginResult = {
  /** token */
  access_token: string;
};
