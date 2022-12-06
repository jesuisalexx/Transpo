import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import { ref } from 'vue';
import { action } from '@storybook/addon-actions';
import Datepicker from './Datepicker.vue';

export default {
  title: 'Components/Datepicker',
  component: Datepicker,
  argTypes: {
    monthNameFormat: {
      options: ['long', 'short'],
      control: 'select',
      description: 'monthNameFormat displays either long or short name of month',
    },
    range: {
      options: '',
      control: 'boolean',
      description: 'range prop displays range between picked dates',
    },
    inline: {
      options: '',
      control: 'boolean',
      description: 'inline prop makes calendar visible and remove input',
    },
    multiDates: {
      options: '',
      control: 'boolean',
      description: 'multiDates prop allow you to pick multiple days',
    },
    placeholder: {
      options: '',
      control: 'text',
    },
    label: {
      options: '',
      control: 'text',
    },
    noToday: {
      options: '',
      control: 'boolean',
      description: 'noToday prop doesnt pick current day by default',
    },
    enableTimePicker: {
      options: '',
      control: 'boolean',
      description: 'enableTimePicker prop either make able to pick time or not',
    },
    timePicker: {
      options: '',
      control: 'boolean',
      description: 'timePicker prop makes input chose time without date',
    },
    autoApply: {
      options: '',
      control: 'boolean',
      description: 'autoApply prop apply the data right after click on date',
    },
    isDisabled: {
      options: '',
      control: 'boolean',
      description: 'isDisabled prop change state between disabled or not',
    },
    locale: {
      options: ['en', 'ru'],
      control: 'select',
      description: 'locale prop changes the language',
    },
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    Datepicker,
    IconsMap,
  },
  setup() {
    const date = ref('12/01/2022');
    const update = action('@update:modelValue');

    return {
      args,
      date,
      update,
    };
  },
  template: `
    <Datepicker @update:modelValue="update" v-bind="args" v-model="date" />
  `,
});

export const Default = Template.bind({}) as Args;
export const Inline = Template.bind({}) as Args;
Default.args = {
  placeholder: 'Выберете дату',
  label: 'label',
};
Inline.args = {
  inline: true,
};
Default.parameters = {
  docs: {
    source: {
      code: '<Datepicker v-model="date" />',
      language: 'html',
      type: 'auto',
    },
  },
};
Inline.parameters = {
  docs: {
    source: {
      code: '<Datepicker :inline="true" v-model="date" />',
      language: 'html',
      type: 'auto',
    },
  },
};
