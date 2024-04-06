interface ThemeState {
  [index: string]: any;
  dark: Ref<boolean>;
  sound: Ref<number>;
  brightness: Ref<number>;
  setDark: (value: boolean) => void;
  setSound: (value: number) => void;
  setBrightness: (value: number) => void;
}

export const useThemeStore = defineStore("theme.ts", (): ThemeState => {
  let dark = ref(false);
  let brightness = ref(80);
  let sound = ref(80);
  const setDark = (value: boolean) => {
    dark.value = value;
  };
  const setSound = (value: number) => {
    sound.value = value;
  };
  const setBrightness = (value: number) => {
    brightness.value = value;
  };

  return { dark, brightness, sound, setDark, setBrightness, setSound };
});
