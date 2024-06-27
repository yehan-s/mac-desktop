// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    dirs: ["composables/**"],
  },
  runtimeConfig: {
    // 仅在服务器端可用的私有密钥
    // apiSecret: '123',
    // 公开的键，也会暴露给客户端
    public: {
      apiBase: "http://127.0.0.1:3000",
    },
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // 自动引入 `defineStore()`
          "defineStore",
          // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
          ["defineStore", "definePiniaStore"],
        ],
      },
    ],

    "@nuxtjs/tailwindcss",
    "nuxt-primevue", // 全局引入 PrimeVue
  ],
  primevue: {
    options: {
      unstyled: true,
    },
    // @ts-ignore
  },
  css: [
    // "primevue/resources/themes/aura-light-green/theme.css"
  ],
  // 只在开发环境有效,生产环境需要在.env 文件中设置
  devServer: {
    port: 3005,
  },
  ssr: true
});
