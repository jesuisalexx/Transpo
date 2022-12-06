import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import { ref } from 'vue';
import { action } from '@storybook/addon-actions';
import Filepicker from './Filepicker.vue';

export default {
  title: 'Components/Filepicker',
  component: Filepicker,
  argTypes: {
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    Filepicker,
    IconsMap,
  },
  setup() {
    const model = ref([]);
    const update = action('@update:modelValue');
    return {
      args,
      model,
      update,
    };
  },
  template: `
    <Filepicker @update:modelValue="update" v-model="model" v-bind="args" />
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
};
Default.parameters = {
  docs: {
    source: {
      code: '<Filepicker v-model="model" />',
      language: 'html',
      type: 'auto',
    },
  },
};
