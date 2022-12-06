import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
  const isExpanded = ref(true);
  const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value;
  };
  return {
    toggleSidebar,
    isExpanded,
  };
});
