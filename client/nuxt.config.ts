// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
    "nuxt-primevue",
  ],
  primevue: {
    options: {
      // unstyled: true,
    },
    // @ts-ignore
  },
  css: ["primevue/resources/themes/aura-light-green/theme.css"],
  devServer: {
    port: 3005,
  },
});
