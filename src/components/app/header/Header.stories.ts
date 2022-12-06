import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import { useRouter } from 'vue-router';
import Header from './Header.vue';
import {action} from "@storybook/addon-actions";

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {},
  args: {},
};

const Template = (args: Args) => ({
  components: {
    Header,
    IconsMap,
  },
  setup() {
    const router = useRouter();
    const handleClick = (link: any) => {
      router.push(link);
    };

    const langOptions = [
      {
        label: 'ru',
        value: 'russian',
        icon: 'rusFlag',
      },
      {
        label: 'en',
        value: 'english',
        icon: 'rusFlag',
      },
      {
        label: 'pl',
        value: 'polish',
        icon: 'rusFlag',
      },
    ];
    const crumbs = [
      {
        id: 1,
        label: 'First',
        handler: () => action('First')(),
      },
      {
        id: 2,
        label: 'Second',
        handler: () => action('Second')(),
      },
      {
        id: 3,
        label: 'Third',
        handler: () => action('Third')(),
      },
    ];

    return {
      args,
      crumbs,
      langOptions,
    };
  },
  template: `
    <Header :breadcrumbs="crumbs" :language-options="langOptions" />
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {};
Default.parameters = {
  docs: {
    source: {
      code: '<Header :breadcrumbs="crumbs" :language-options="langOptions" />',
      language: 'html',
      type: 'auto',
    },
  },
};
