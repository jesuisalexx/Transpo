import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import { action } from '@storybook/addon-actions';
import Button from './Button.vue';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    label: {
      options: [''],
      control: 'text',
      description: 'label displays button inner text',
    },
    state: {
      options: ['primary', 'secondary', 'danger', 'secondary-icon'],
      control: 'select',
      description: 'state of button displays different design of button',
    },
    iconBefore: {
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
      description: 'iconBefore is displaying icon in front of text',
    },
    iconAfter: {
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
      description: 'iconBefore is displaying icon in after the text',
    },
    shape: {
      options: '',
      control: 'null',
      description: 'shape of button displays different shapes',
    },
  },
  args: {
    state: 'primary',
    label: 'Button',
  },
};

const Template = (args: Args) => ({
  components: {
    Button,
    IconsMap,
  },
  setup() {
    const clickAction = action('button-click');
    return {
      args,
      clickAction,
    };
  },
  template: `
    <Button @click="clickAction" v-bind="args" />
  `,
});

export const Primary = Template.bind({}) as Args;
export const Secondary = Template.bind({}) as Args;
export const Danger = Template.bind({}) as Args;
export const Icon = Template.bind({}) as Args;

Primary.args = {};
Secondary.args = {
  state: 'secondary',
  label: 'secondary',
};
Danger.args = {
  state: 'danger',
  label: 'danger',
};
Icon.args = {
  state: 'secondary-icon',
  label: '',
  iconBefore: 'trash',
};
Primary.parameters = {
  docs: {
    source: {
      code: '<Button :state="primary" />',
      language: 'html',
      type: 'auto',
    },
  },
};
Secondary.parameters = {
  docs: {
    source: {
      code: '<Button state="secondary" />',
      language: 'html',
      type: 'auto',
    },
  },
};
Danger.parameters = {
  docs: {
    source: {
      code: '<Button state="danger" />',
      language: 'html',
      type: 'auto',
    },
  },
};
Icon.parameters = {
  docs: {
    source: {
      code: '<Button state="secondary-icon" icon-before="trash" />',
      language: 'html',
      type: 'auto',
    },
  },
};
