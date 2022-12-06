import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';
import Pagination from './Pagination.vue';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    pages: {
      options: '5',
      control: 'number',
      description: 'pages prop displays amount of pages you passed',
    },
    pageRange: {
      options: '3',
      control: 'number',
      description: 'pageRange is a range of pages which displayed',
    },
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    Pagination,
    IconsMap,
  },
  setup() {
    const update = action('@update:modelValue');
    const model = ref(1);

    return {
      args,
      update,
      model,
    };
  },
  template: `
    <Pagination @update:modelValue="update" v-model="model" v-bind="args" />
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
};
Default.parameters = {
  docs: {
    source: {
      code: '<Pagination :pages="8" :page-range="4" />',
      language: 'html',
      type: 'auto',
    },
  },
};
