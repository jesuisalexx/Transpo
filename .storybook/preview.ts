import { app } from '@storybook/vue3';
import Root from './Root.vue';
import { createPinia } from "pinia";
import { i18n } from '@/i18n';
import renderComponent from "./utils/vnode";

import '@/assets/styles/index.scss';

const pinia = createPinia();
import { maska } from 'maska';
import {OutsideClickDirective} from "../src/directives/outsideClick";
import FloatingVue from "floating-vue";

app
  .use(i18n)
  .use(pinia)
  .use(FloatingVue)
  .directive('click-outside', OutsideClickDirective)
  .directive('mask', maska);


document.body.classList.add('light');

renderComponent({
  el: document.body,
  component: Root,
  props: {},
  appContext: app._context,
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      iphone678: {
        name: 'iPhone 6/7/8',
        styles: {
          width: '375px',
          height: '667px',
        },
        type: 'mobile',
      },
    },
  },
};
