import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

import { i18n, Locales } from '@/i18n';

export const useI18nStore = defineStore('common', () => {
  const savedLocale = useStorage<Locales>('locale', 'en');

  const locale = computed({
    get: () => savedLocale.value,
    set: (locale: Locales) => {
      i18n.global.locale.value = locale;
      savedLocale.value = locale;
    },
  });

  return {
    locale,
  };
});
