interface ControlState {
  [index: string]: any;
  date: Ref<Date>;
  wifi: Ref<boolean>;
  showControlCenter: Ref<boolean>;
  showWifiMenu: Ref<boolean>;
  showAppleMenu: Ref<boolean>;
  wifiSwitch: (value: boolean) => void;
  appleMenuSwitch: (value: boolean) => void;
  wifiMenuSwitch: (value:boolean) => void;
  controlCenterSwitch: (value: boolean) => void;
}

export const useControlStore = defineStore("control", (): ControlState => {
  let date = ref(new Date());
  let wifi = ref(false);
  let showControlCenter = ref(false);
  let showWifiMenu = ref(false);
  let showAppleMenu = ref(false);
  const wifiSwitch = (value:boolean) => {
    wifi.value = value;
  };
  const appleMenuSwitch = (value: boolean) => {
    showAppleMenu.value = value;
  };
  const wifiMenuSwitch = (value:boolean) => {
    showWifiMenu.value = value;
  };
  const controlCenterSwitch = (value: boolean) => {
    showControlCenter.value = value;
  };

  return {
    date,
    wifi,
    showControlCenter,
    showWifiMenu,
    showAppleMenu,
    wifiSwitch,
    appleMenuSwitch,
    wifiMenuSwitch,
    controlCenterSwitch,
  };
});
