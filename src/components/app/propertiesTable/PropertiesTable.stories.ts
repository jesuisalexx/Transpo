import type { Args } from '@storybook/vue3';
import PropertiesTable from './PropertiesTable.vue';

export default {
  title: 'Components/PropertiesTable',
  component: PropertiesTable,
  argTypes: {},
  args: {},
};

const Template = (args: Args) => ({
  components: {
    PropertiesTable,
  },
  setup() {
    const records = [
      {
        label: 'model',
        slug: '',
        value: 'XR',
      },
      {
        label: 'type',
        slug: '',
        value: 'phone',
      },
      {
        label: 'name',
        slug: '',
        value: 'IPhone XR',
      },
      {
        label: 'number',
        slug: '',
        value: '3',
      },
      {
        label: 'screen',
        slug: '',
        value: 'full hd',
      },
      {
        label: 'processor',
        slug: '',
        value: 'm1',
      },
      {
        label: 'camera',
        slug: '',
        value: '30mpx',
      },
      {
        label: 'color',
        slug: '',
        value: 'red',
      },
    ];

    return {
      records,
    };
  },
  template: `
      <PropertiesTable :records="records">
        <template #value(color)="{ text }">
          <div>
            {{ text }}
          </div>
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #F09973;"></div>
        </template>
        <template #value(type)="{ text }">
          <div>
            {{ text }}
          </div>
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #34C759;"></div>
        </template>
        <template #value(name)="{ text }">
          <div>
            {{ text }}
          </div>
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #34C759;"></div>
        </template>
      </PropertiesTable>
    `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
};
Default.parameters = {
  docs: {
    source: {
      code: `
      <PropertiesTable :records="records">
        <template #value(color)="{ text }">
          <div>
            {{ text }}
          </div>
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #F09973;"></div>
        </template>
        <template #value(type)="{ text }">
          <div>
            {{ text }}
          </div>
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #34C759;"></div>
        </template>
        <template #value(name)="{ text }">
          <div>
            {{ text }}
          </div>
          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #34C759;"></div>
        </template>
      </PropertiesTable>
    `,
      language: 'html',
      type: 'auto',
    },
  },
};
