import { ref, readonly } from "vue";
export const useToggle = (init: boolean) => {
  const isOn = ref(init);
  return {
    isOn: readonly(isOn),
    toggle: () => (isOn.value = !isOn.value),
    on: () => (isOn.value = true),
    off: () => (isOn.value = false),
  };
};
