// types.ts

/** 请求返回的结果类型 */
export type RequestResult<T = unknown> = {
  /** 错误码 */
  code: number;
  /** 消息 */
  message: "OK";
  /** 结果 */
  data: T;
};

/** $fetch options类型 */
export type NitroFetchOptions = Exclude<
  Parameters<typeof $fetch>[1],
  undefined
>;

/** $fetch error类型 */
export type $FetchError<T = unknown> = {
  name: string;
  data: T;
  message: string;
  options: NitroFetchOptions;
  request: string;
  response: {
    _data: T;
    body: ReadableStream;
    headers: Headers;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
  };
  stack: string;
  status: number;
  statusCode: number;
  statusMessage: string;
  statusText: string;
};
