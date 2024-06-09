interface AppState {
  [index: string]: any;
  max: Ref<string>; // the maximize APP's id
  showApps: Ref<string[]>; // the whole opening app list
  minimizeApps: Ref<string[]>; // to store the minimized apps' id
  focus: Ref<string>; // the focusing app id
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  setMax: (id: string) => void;
  setFocus: (id: string) => void;
  addMinimizeApps: (id: string) => void;
  removeMinimizeApps: (id: string) => void;
}

export const useAppStore = defineStore("app", (): AppState => {
  let max = ref("");
  let showApps = ref([]) as Ref<string[]>;
  let minimizeApps = ref([]) as Ref<string[]>;
  let focus = ref("");
  // 打开应用
  const openApp = (id: string) => {
    if (!showApps.value.includes(id)) {
      showApps.value.push(id);
    }
  };
  // 关闭应用
  const closeApp = (id: string) => {
    showApps.value = showApps.value.filter((item: string) => item !== id);
    minimizeApps.value = minimizeApps.value.filter(
      (item: string) => item !== id
    );
  };
  // 最大化
  const setMax = (id: string) => {
    max.value = id;
  };
  // 设置焦点
  const setFocus = (id: string) => {
    focus.value = id;
  };
  // 添加到最小化list
  const addMinimizeApps = (id: string) => {
    minimizeApps.value.push(id);
  };
  // 从最小化list中移除 显示
  const removeMinimizeApps = (id: string) => {
    minimizeApps.value = minimizeApps.value.filter(
      (item: string) => item !== id
    );
  };
  return {
    max,
    showApps,
    minimizeApps,
    focus,
    openApp,
    closeApp,
    setMax,
    setFocus,
    addMinimizeApps,
    removeMinimizeApps,
  };
});
