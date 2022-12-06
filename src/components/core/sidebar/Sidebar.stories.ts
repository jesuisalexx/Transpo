import type { Args } from '@storybook/vue3';
import IconsMap from '@/components/core/icon/IconsMap.vue';
import Sidebar from './Sidebar.vue';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  argTypes: {
  },
  args: {
  },
};

const Template = (args: Args) => ({
  components: {
    Sidebar,
    IconsMap,
  },
  setup() {
    const buttons = [
      {
        value: 'Главная',
        icon: 'main',
        options: [
          { value: 'option 1' },
          { value: 'option 2' },
          { value: 'option 3' },
        ],
        to: 'main',
      },
      {
        value: 'Мой транспорт',
        icon: 'transport',
        to: 'transport',
      },
      {
        value: 'Бронирования',
        icon: 'watch',
        to: 'watch',
      },
      {
        value: 'Расходы',
        icon: 'dollar',
        to: 'dollar',
      },
      {
        value: 'Напоминания',
        icon: 'notification',
        to: 'notification',
      },
      {
        value: 'Клиенты',
        icon: 'user',
        to: 'user',
      },
      {
        value: 'Канал продаж',
        icon: 'channel',
        to: 'channel',
      },
      {
        value: 'Настройки',
        icon: 'settings',
        to: 'settings',
      },
      {
        value: 'Выход',
        icon: 'logout',
        to: 'logout',
      },
    ];
    const userdata = {
      name: 'Александр Воронин',
      mail: 'jivelibrium@gmail.com',
    };

    return {
      args,
      buttons,
      userdata,
    };
  },
  template: `
    <Sidebar :userdata="userdata" style="min-height: 986px;" :buttons="buttons" />
  `,
});

export const Default = Template.bind({}) as Args;
Default.args = {};
Default.parameters = {
  docs: {
    source: {
      code: '   <Sidebar :userdata="userdata" :buttons="buttons" />',
      language: 'html',
      type: 'auto',
    },
  },
};
