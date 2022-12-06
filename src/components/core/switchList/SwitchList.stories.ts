import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import { ref } from 'vue';
import { action } from '@storybook/addon-actions';
import SwitchList from './SwitchList.vue';

export default {
  title: 'Components/SwitchList',
  component: SwitchList,
  argTypes: {
    modelValue: {
      options: '',
      control: 'none',
    },
    items: {
      options: '',
      control: 'none',
    },
  },
  args: {
  },
};

const Template = (args: Args) => ({
  components: {
    SwitchList,
    IconsMap,
  },
  setup() {
    const update = action('@update:modelValue');

    const model = ref({});
    const items = [
      {
        label: 'Switch1',
        value: 'Switch1',
      },
      {
        label: 'Switch2',
        value: 'Switch2',
      },
      {
        label: 'Switch3',
        value: 'Switch3',
      },
      {
        label: 'Switch4',
        value: 'Switch4',
      },
      {
        label: 'Switch5',
        value: 'Switch5',
      },
      {
        label: 'Switch6',
        value: 'Switch6',
      },
      {
        label: 'Switch7',
        value: 'Switch7',
      },
      {
        label: 'Switch8',
        value: 'Switch8',
      },
    ];

    return {
      args,
      update,
      model,
      items,
    };
  },
  template: `
    <SwitchList :items="items" @update:modelValue="update" v-model="model" v-bind="args" />
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
};

Default.parameters = {
  docs: {
    source: {
      code: '<SwitchList :items="items" v-model="model" />',
      language: 'html',
      type: 'auto',
    },
  },
};
