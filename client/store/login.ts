interface LoginState {
  username: Ref<string>;
  password: Ref<string>;
}

export const useLoginStore = defineStore("login", (): LoginState => {
  let username = ref("yehan");
  let password = ref("abc123");
  return { username, password };
});
