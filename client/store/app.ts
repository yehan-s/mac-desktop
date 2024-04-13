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
  const openApp = (id: string) => {
    if (!showApps.value.includes(id)) {
      showApps.value.push(id);
    }
  };
  const closeApp = (id: string) => {
    showApps.value = showApps.value.filter((item: string) => item !== id);
    minimizeApps.value = minimizeApps.value.filter(
      (item: string) => item !== id
    );
  };
  const setMax = (id: string) => {
    max.value = id;
  };
  const setFocus = (id: string) => {
    focus.value = id;
  };
  const addMinimizeApps = (id: string) => {
    minimizeApps.value.push(id);
  };
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
