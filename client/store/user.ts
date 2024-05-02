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
  let login = ref(true);
  let access_token = ref("wu");
  let id = ref("3c33f19c-b5be-4fd4-b9e7-6b5882c4a078");
  let username = ref("yehan");
  let password = ref("123456");
  let avatar = ref("");
  let role = ref("user");
  let createdAt = ref("2024-04-24T16:32:46.898Z");

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
