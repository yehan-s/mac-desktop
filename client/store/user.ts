interface userState {
  [index: string]: any;
  login: Ref<boolean>;
  access_token: Ref<string>;
  id: Ref<string>;
  username: Ref<string>;
  password: Ref<string>;
  avatar: Ref<string>;
  role: Ref<string>;
  createdAt: Ref<string>;
}

export const useUserStore = defineStore("user", (): userState => {
  let login = ref(false);
  let access_token = ref("");
  let id = ref("");
  let username = ref("");
  let password = ref("");
  let avatar = ref("");
  let role = ref("");
  let createdAt = ref("");

  return {
    login,
    access_token,
    id,
    username,
    password,
    avatar,
    role,
    createdAt,
  };
});
