import { ref } from 'vue';
import type { Args } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import Checkbox from './Checkbox.vue';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      options: 'label',
      control: 'text',
      description: 'label prop displays label near component',
    },
    modelValue: {
      options: '',
      control: 'none',
    },
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    Checkbox,
  },
  setup() {
    const value = ref(false);
    const update = action('@update:modelValue');

    return {
      value,
      args,
      update,
    };
  },
  template: `
    <Checkbox @update:modelValue="update" v-bind="args" v-model="value" />
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
  label: 'Label',
};
Default.parameters = {
  docs: {
    source: {
      code: '<Checkbox label="label" v-model="value" />',
      language: 'html',
      type: 'auto',
    },
  },
};
