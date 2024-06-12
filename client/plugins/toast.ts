import { useToast } from "primevue/usetoast";

export default defineNuxtPlugin((nuxtApp) => {
  const $toast = useToast();

  return {
    provide: {
      toast: $toast,
    },
  };
});
