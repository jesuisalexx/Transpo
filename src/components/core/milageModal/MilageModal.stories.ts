import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import MilageModal from './MilageModal.vue';

export default {
  title: 'Components/MilageModal',
  component: MilageModal,
  argTypes: {
    onClick: { action: 'pageChange' },
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    MilageModal,
    IconsMap,
  },
  setup() {
    return {
      args,
    };
  },
  template: `
    <MilageModal />
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
};
Default.parameters = {
  docs: {
    source: {
      code: '<MilageModal v-model="model" />',
      language: 'html',
      type: 'auto',
    },
  },
};
