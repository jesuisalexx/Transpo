import { StorybookViteConfig } from '@storybook/builder-vite';
import path from 'path';
import { mergeConfig } from 'vite';
import ViteSvgLoader from 'vite-svg-loader';
import VueTypeImports from 'vite-plugin-vue-type-imports';

const config: StorybookViteConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        ViteSvgLoader({
          svgo: false,
        }),
        VueTypeImports(),
      ],
      resolve: {
        alias: {
          '@': path.resolve(path.dirname(__dirname), 'src'),
        },
      },
    });
  },
};

export default config;
