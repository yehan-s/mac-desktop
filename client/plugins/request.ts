export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  // console.log("process", process);
  console.log("request.config", config.public.apiBase);
  console.log("request.config", typeof config.public.apiBase);
  const $request = $fetch.create({
    baseURL: config.public.apiBase as string,
    // baseURL: 'http://127.0.0.1:3000',
    /** 请求拦截器 */
    onRequest: ({ options }) => {
      const userAuth = useCookie("token");
      // let userAuth = userStore.access_token;
      if (userAuth.value) {
        options.headers = options.headers ?? {};
        (options.headers as Record<string, string>).Authorization =
          `Bearer ${userAuth.value}`;
      }
    },
    /** 请求错误拦截器，比如服务器无法连接会触发 */
    onRequestError({ request, error }) {
      console.log("请求错误拦截器");
      console.log("request", request);
      console.log("error", error);
    },
    /** 响应拦截器 */
    onResponse({ response }) {
      // console.log("响应拦截器", response);
      if (response.status >= 200 && response.status < 300) {
        return response._data;
      }
      // 成功的状态才进行解包
      // if (response.status >= 200 && response.status < 300) {
      //   response._data = response._data.data ?? null;
      // }
      // let status = response.status;
    },
    /** 响应错误拦截器 */
    onResponseError(_context) {
      console.log("进入错误拦截器", _context.response._data);
    },
  });

  return {
    // useNuxtApp().$request 的形式触发
    provide: {
      request: $request,
    },
  };
});
