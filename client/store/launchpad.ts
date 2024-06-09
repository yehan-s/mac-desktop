interface launchapadState {
  [index: string]: any;
  show: Ref<boolean>;
  setShow: (value: boolean) => void;
}

export const useLaunchpadStore = defineStore(
  "launchpad",
  (): launchapadState => {
    let show = ref(true);
    const setShow = (value: boolean) => {
      show.value = value;
    };

    return {
      show,
      setShow,
    };
  }
);
