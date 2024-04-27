interface userState {
  [index: string]: any;
  login: Ref<boolean>;
  access_token: Ref<string>;
}

export const useUserStore = defineStore("user", (): userState => {
  let login = ref(true);
  let access_token = ref("");

  return { login, access_token };
});
