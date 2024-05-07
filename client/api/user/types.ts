/** 登录参数类型 */
export interface LoginData {
  username: string;
  password: string;
}
/** 登录返回结果 */
export interface LoginResult {
  /** token */
  access_token: string;
}


