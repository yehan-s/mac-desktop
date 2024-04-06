import { ref, onMounted, onUnmounted } from "vue";

export function useClickOutside(callback: any) {
  // get the ref of the context
  const targetRef = ref<HTMLDivElement | null>(null);
  console.log(targetRef.value);
  const handleClickOutside = (event: MouseEvent): void => {
    if (targetRef.value && !targetRef.value.contains(event.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener("click", handleClickOutside);
    console.log(targetRef.value);
  });

  onUnmounted(() => {
    window.removeEventListener("click", handleClickOutside);
  });


  return targetRef;
}
