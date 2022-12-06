import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import { ref } from 'vue';
import { action } from '@storybook/addon-actions';
import Switch from './Switch.vue';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    type: {
      options: ['primary', 'secondary'],
      control: 'select',
      description: 'type displays different shapes and styles switch',
    },
    label: {
      options: '',
      control: 'text',
      description: 'label displays text after checkbox',
    },
    modelValue: {
      options: '',
      control: 'boolean',
      description: 'modelValue displays is switch active or not',
    },
  },
  args: {
  },
};

const Template = (args: Args) => ({
  components: {
    Switch,
    IconsMap,
  },
  setup() {
    const update = action('@update:modelValue');
    const model = ref(false);

    return {
      args,
      update,
      model,
    };
  },
  template: `
    <Switch @update:modelValue="update" v-model="model" v-bind="args" />
  `,
});

export const Primary = Template.bind({}) as Args;
export const Secondary = Template.bind({}) as Args;
Primary.args = {
  label: 'Primary',
  type: 'primary',
};
Secondary.args = {
  label: 'Secondary',
  type: 'secondary',
};
Primary.parameters = {
  docs: {
    source: {
      code: '<Switch type="primary"  v-model="switchValue" />',
      language: 'html',
      type: 'auto',
    },
  },
};
Secondary.parameters = {
  docs: {
    source: {
      code: '<Switch type="secondary" v-model="switchValue" />',
      language: 'html',
      type: 'auto',
    },
  },
};
