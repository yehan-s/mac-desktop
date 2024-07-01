import type { AsyncData, UseFetchOptions } from "#app";
import type { $FetchError, NitroFetchOptions, RequestResult } from "./types";
import type { FetchError } from "ofetch";

//全局基础URL
const BASEURL: string = "http://127.0.0.1:3000"; //全局后台服务器请求地址

/** 自定义请求 */
export function useRequest<T = unknown>(
  url: string,
  options: UseFetchOptions<RequestResult<T>> = {}
): AsyncData<T | null, FetchError | null> {
  // @ts-ignore
  return useFetch(url, {
    watch: false,
    // immediate: false,
    ...options,
    $fetch: useNuxtApp().$request as any,
  });
}

/** 自定义Lazy请求 */
export function useLazyRequest<T = unknown>(
  url: string,
  options: UseFetchOptions<RequestResult<T>> = {}
): AsyncData<T | null, FetchError | null> {
  // @ts-ignore
  return useLazyFetch(url, {
    watch: false,
    // immediate: false,
    ...options,
    $fetch: useNuxtApp().$request as any,
  });
}

/** 非水合请求 */
export async function useClientRequest<T = unknown>(
  url: string,
  options?: NitroFetchOptions
): Promise<T> {
  try {
    // @ts-ignore
    const res = await useNuxtApp().$request<T>(url, options);
    // @ts-ignore
    return res;
  } catch (error) {
    if (!process.client) throw error;
    console.log("useClientRequest error useFetch的错误", error);
    const { data, statusMessage } = error as $FetchError<RequestResult<T>>;
    console.log("具体错误", data, "错误信息", statusMessage);
    // 具体的错误处理大家自己去实现
    // 错误码： data?.code
    alert(data);

    throw error;
  }
}

/** 通用的请求错误处理 */
export function useRequestError(error: Ref<FetchError | null>) {
  if (error.value) {
    return navigateTo("/test");
  }
}

/** 非水合请求的错误处理 */
export function useFetchError(error: Ref<FetchError | null>) {
  if (!error.value) return "非水合请求的错误处理";
  console.log("非水合请求的错误处理", error.value);
  const { data, statusMessage } = error.value;

  // 具体的错误处理大家自己去实现
  // 错误码： data?.code
}
