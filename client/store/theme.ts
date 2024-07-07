interface ThemeState {
  [index: string]: any;
  dark: Ref<boolean>;
  sound: Ref<number>;
  brightness: Ref<number>;
  model: Ref<string | null>;
  setDark: (value: boolean) => void;
  setSound: (value: number) => void;
  setBrightness: (value: number) => void;
}

export const useThemeStore = defineStore("theme", (): ThemeState => {
  let dark = ref(true);
  let brightness = ref(80);
  let sound = ref(80);
  let model = ref(null);
  const setDark = (value: boolean) => {
    dark.value = value;
  };
  const setSound = (value: number) => {
    sound.value = value;
  };
  const setBrightness = (value: number) => {
    brightness.value = value;
  };

  return { dark, brightness, sound, model, setDark, setBrightness, setSound };
});
