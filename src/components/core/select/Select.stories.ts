import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Icon from '@/components/core/icon/Icon.vue';
import { action } from '@storybook/addon-actions';
import Select from './Select.vue';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    state: {
      options: ['primary', 'disabled'],
      control: 'select',
      description: 'state of select displays different design of select',
    },
    label: {
      options: 'Label',
      control: 'text',
      description: 'state of select displays different design of select',
    },
    placeholder: {
      options: 'placeholder',
      control: 'text',
    },
    optionAdd: {
      options: '',
      control: 'boolean',
      description: 'optionAdd displays button to add option',
    },
    size: {
      options: '',
      control: 'none',
      description: 'size changes size of select',
    },
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    Select,
    IconsMap,
    Icon,
  },
  setup() {
    const { t } = useI18n();
    const options = [
      {
        value: 'option1',
        label: 'option1',
        isSelected: false,
      },
      {
        value: 'option2',
        label: 'option2',
        isSelected: false,
      },
      {
        value: 'option3',
        label: 'option3',
        isSelected: false,
      },
    ];
    const model = ref();
    const update = action('@update:modelValue');
    return {
      options,
      args,
      model,
      t,
      update,
    };
  },
  template: `
    <Select @update:modelValue="update" v-model="model" :append="true" :options="options" v-bind="args">
      <template #append>
        <div>
          <Icon icon="add" size="20" />
        </div>
        <div style="margin-left: 10px;">
          {{ t('select.add-option') }}
        </div>
      </template>
    </Select>
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
};
Default.parameters = {
  docs: {
    source: {
      code: `
      <Select v-model="model" :append="true" :options="options">
        <template #append>
          <div>
             <Icon icon="add" size="20" />
          </div>
          <div style="margin-left: 10px;">
            {{ t('select.add-option') }}
          </div>
        </template>
      </Select>
`,
      language: 'html',
      type: 'auto',
    },
  },
};
