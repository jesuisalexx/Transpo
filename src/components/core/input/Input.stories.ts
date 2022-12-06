import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import { ref } from 'vue';
import { action } from '@storybook/addon-actions';
import Input from './Input.vue';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      options: ['primary', 'password'],
      control: 'select',
      description: 'type prop change type of input either its password or text',
    },
    label: {
      control: 'text',
      description: 'label prop displays label near component',
    },
    isDisabled: {
      options: '',
      control: 'boolean',
      description: 'isDisabled prop change state of input on disable or not',
    },
    modelValue: {
      options: '',
      control: 'text',
      description: 'modelValue change text in input',
    },
    name: {
      options: '',
      control: 'none',
    },
    tabIndex: {
      options: '',
      control: 'none',
    },
    disableTabNavigation: {
      options: '',
      control: 'none',
    },
    autocomplete: {
      options: '',
      control: 'none',
    },
    inputmode: {
      options: '',
      control: 'none',
    },
    mask: {
      options: '',
      control: 'none',
    },
    state: {
      options: '',
      control: 'none',
    },
    size: {
      options: '',
      control: 'none',
    },
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    Input,
    IconsMap,
  },
  setup() {
    const value = ref('');
    const update = action('@update:modelValue');

    return {
      args,
      value,
      update,
    };
  },
  template: `
    <Input @update:modelValue="update" v-bind="args" v-model="value" />
  `,
});

export const Default = Template.bind({}) as Args;
export const Disabled = Template.bind({}) as Args;
export const Password = Template.bind({}) as Args;
Default.args = {
  label: 'label',
  modelValue: '',
  placeholder: '',
  isDisabled: false,
  type: '',
};
Disabled.args = {
  label: 'disabled',
  modelValue: '',
  placeholder: '',
  isDisabled: true,
  type: '',
};
Password.args = {
  label: 'Password',
  modelValue: '',
  placeholder: '',
  isDisabled: false,
  type: 'password',
};
Default.parameters = {
  docs: {
    source: {
      code: '<Input v-model="modelValue" />',
      language: 'html',
      type: 'auto',
    },
  },
};
Disabled.parameters = {
  docs: {
    source: {
      code: '<Input type="disabled" v-model="modelValue" />',
      language: 'html',
      type: 'auto',
    },
  },
};
Password.parameters = {
  docs: {
    source: {
      code: '<Input type="password" v-model="modelValue" />',
      language: 'html',
      type: 'auto',
    },
  },
};
