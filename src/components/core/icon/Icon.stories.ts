import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import Icon from './Icon.vue';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: 'number',
      description: 'prop size change size of icon in pixels',
    },
    icon: {
      options: [
        'add', 'arrow-down', 'arrow-down-small', 'arrow-up',
        'attach', 'back', 'channel', 'check', 'watch',
        'close', 'eye', 'columns-tune', 'dollar',
        'edit', 'filter', 'fix', 'grid', 'user',
        'logout', 'main', 'more', 'notification',
        'reload', 'rusFlag', 'search', 'settings',
        'time', 'transport', 'trash', 'urent-logo',
      ],
      control: 'select',
      description: 'prop icon receive name of icon',
    },
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    Icon,
    IconsMap,
  },
  setup() {
    return {
      args,
    };
  },
  template: `
    <Icon v-bind="args" />
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
  icon: 'eye',
};
Default.parameters = {
  docs: {
    source: {
      code: '<Icon :icon="icon" />',
      language: 'html',
      type: 'auto',
    },
  },
};
