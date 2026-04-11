import { useLocalStorage } from '@vueuse/core';
import { watch } from 'vue';

export const useTheme = () => {
  const theme = useLocalStorage<'dark' | 'light'>('aura-theme', 'dark');

  const apply = (value: 'dark' | 'light') => {
    document.documentElement.classList.toggle('light', value === 'light');
  };

  if (import.meta.client) {
    apply(theme.value);
  }

  watch(theme, apply);

  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  return { theme, toggle };
};
