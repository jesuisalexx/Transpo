import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import DangerModal from './DangerModal.vue';

export default {
  title: 'Components/DangerModal',
  component: DangerModal,
  argTypes: {
    onClick: { action: 'pageChange' },
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    DangerModal,
    IconsMap,
  },
  setup() {
    return {
      args,
    };
  },
  template: `
    <DangerModal v-bind="args" />
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
};
Default.parameters = {
  docs: {
    source: {
      code: '<DangerModal />',
      language: 'html',
      type: 'auto',
    },
  },
};
