import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import { action } from '@storybook/addon-actions';
import Breadcrumbs from './Breadcrumbs.vue';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    Breadcrumbs,
    IconsMap,
  },
  setup() {
    const crumbs = [
      {
        id: 1,
        label: 'First',
        handler: () => action('First')(),
      },
      {
        id: 2,
        label: 'Second',
        handler: () => action('Second')(),
      },
      {
        id: 3,
        label: 'Third',
        handler: () => action('Third')(),
      },
    ];
    return {
      args,
      crumbs,
    };
  },
  template: `
    <Breadcrumbs :items="crumbs" v-bind="args" />
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
};
Default.parameters = {
  docs: {
    source: {
      code: '<Breadcrumbs :items="crumbs" />',
      language: 'html',
      type: 'auto',
    },
  },
};
