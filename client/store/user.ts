interface userState {
  [index: string]: any;
  login: Ref<boolean>;
  id: Ref<string>;
  access_token: Ref<string>;
  nickname: Ref<string>;
  username: Ref<string>;
  password: Ref<string>;
  avatar: Ref<string>;
  signature: Ref<string>;
  role: Ref<string>;
  createdAt: Ref<string>;
}

export const useUserStore = defineStore("user", (): userState => {
  let login = ref(true);
  let access_token = ref("wu");
  let id = ref("3c33f19c-b5be-4fd4-b9e7-6b5882c4a078");
  let nickname = ref("yehan");
  let username = ref("yehan");
  let password = ref("123456");
  let avatar = ref("https://img2.imgtp.com/2024/05/04/Db7YhuWN.png");
  let signature = ref("随性的，我们唱起歌随性的，我们唱起歌随性的");
  let role = ref("user");
  let createdAt = ref("2024-04-24T16:32:46.898Z");

  const updateNickname = (newNickname: string) => {
    nickname.value = newNickname;
  };
  const updateSignature = (newSignature: string) => {
    signature.value = newSignature;
  };
  const updateAvatar = (newAvatar: string) => {
    avatar.value = newAvatar;
  };

  return {
    login,
    access_token,
    id,
    nickname,
    username,
    password,
    avatar,
    signature,
    role,
    createdAt,
    updateNickname,
    updateSignature,
    updateAvatar,
  };
});
