// https://nuxt.com/docs/api/configuration/nuxt-config
// 解决不能写require的问题
import requireTransform from "vite-plugin-require-transform";

export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    dirs: ["composables/**"],
  },
  runtimeConfig: {
    // 仅在服务器端可用的私有密钥
    // apiSecret: '123',
    // 公开的键，也会暴露给客户端
    // Nuxt中环境变量只有这里可以使用，其他地方读取不到process.env
    public: {
      apiBase: process.env.API_BASE_URL,
      OSS_REGION: process.env.OSS_REGION,
      OSS_BUCKET: process.env.OSS_BUCKET,
      OSS_ACCESS_KEY_ID: process.env.OSS_ACCESS_KEY_ID,
      OSS_ACCESS_KEY_SECRET: process.env.OSS_ACCESS_KEY_SECRET,

      CHAT_COMPLETIONS_API_URL: process.env.CHAT_COMPLETIONS_API_URL,
      SELECTED_MODEL: process.env.SELECTED_MODEL,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  },
  vite: {
    plugins: [
      // 您的 Vite 插件配置
      requireTransform({
        fileRegex: /\.ts$|\.tsx$|\.vue$|\.js$/,
      }),
    ],
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
    "@nuxt/content", // 引入 Nuxt Content 模块
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
  ssr: true,
  // 配置content
  content: {
    api: {
      baseURL: "/api/_my_content",
    },
    contentHead: false,
    highlight: {
      // Theme used in all color schemes.
      // theme: 'github-light'
      // OR
      theme: {
        // Default theme (same as single string)
        default: "github-light",
        // Theme used if `html.dark`
        dark: "github-dark",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
    },
  },
});
