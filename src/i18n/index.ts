import { createI18n } from 'vue-i18n';
import en from '@/i18n/locales/en.json';

const messages = {
  en,
};
export type Locales = keyof typeof messages;

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
});
