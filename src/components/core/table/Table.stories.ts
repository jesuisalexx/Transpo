import type { Args } from '@storybook/vue3';
import Icon from '@/components/core/icon/Icon.vue';
import Dropdown from '@/components/core/dropdown/Dropdown.vue';
import Button from '@/components/core/button/Button.vue';
import FloatingVue from 'floating-vue';
import Table from './Table.vue';

FloatingVue.options.themes.dropdown.placement = 'bottom-end';
FloatingVue.options.themes.dropdown.distance = -30;
FloatingVue.options.themes.dropdown.popperTriggers = ['click'];

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    onScroll: { action: 'scroll' },
  },
  args: {},
};

const Template = (args: Args) => ({
  components: {
    Table,
    Icon,
    Dropdown,
    Button,
  },
  setup() {
    const columns = [
      {
        label: 'model',
        slug: 'model',
        size: 170,
        isStickLeft: true,
      },
      {
        label: 'label',
        slug: 'label',
        size: 350,
      },
      {
        label: 'name',
        slug: 'name',
        size: 350,
      },
      {
        label: 'id',
        slug: 'id',
        size: 350,
      },
      {
        label: 'code',
        slug: 'code',
        size: 350,
      },
      {
        label: 'actions',
        slug: 'actions',
        size: 160,
        isStickRight: true,
      },
    ];
    const records = [
      {
        id: 1,
        data: {
          label: 'label',
          code: '222',
          model: 'model1',
          name: 'name1',
          actions: 'delete',
        },
      },
      {
        id: 2,
        data: {
          label: 'label',
          code: '111',
          model: 'model2',
          name: 'name2',
          actions: 'delete',
        },
      },
      {
        id: 3,
        data: {
          label: 'label',
          code: '32',
          model: 'model3',
          name: 'name3',
          actions: 'delete',
        },
      },
      {
        id: 4,
        data: {
          label: 'label',
          code: '331',
          model: 'model4',
          name: 'name4',
          actions: 'delete',
        },
      },
      {
        id: 5,
        data: {
          label: 'label',
          code: '331',
          model: 'model5',
          name: 'name5',
          actions: 'delete',
        },
      },
      {
        id: 6,
        data: {
          label: 'label',
          code: '331',
          model: 'model5',
          name: 'name5',
          actions: 'delete',
        },
      },
    ];

    return {
      columns,
      records,
    };
  },
  template: `
        <Table
          :records="records"
          :columns="columns"
        >
          <template #cell(model)="{ data }">
            {{ data.model }}
          </template>
          <template #cell(label)="{ data }">
            {{ data.label }}
          </template>
          <template #cell(id)="{ record }">
            {{ record.id }}
          </template>
          <template #cell(name)="{ data }">
            {{ data.name }}
          </template>
          <template #cell(code)="{ data }">
            {{ data.code }}
          </template>
          <template #cell(actions)>
            <div
                style="
                   width: 100%; display: flex; justify-content: space-between;
                    align-items: center; color: #657DED;
                  "
            >
              <div style="cursor: pointer;">
                <Icon
                    :size="24"
                    icon="eye"
                />
              </div>
              <div style="cursor: pointer;">
                <Icon
                    :size="24"
                    icon="edit"
                />
              </div>
              <div style="cursor: pointer;">
                <Icon
                    :size="24"
                    icon="watch"
                />
              </div>
              <div style="cursor: pointer;">
                <Dropdown>
                  <template #trigger>
                    <Icon
                        :size="24"
                        icon="more"
                    />
                  </template>
                  <template #dropdown>
                    <div 
                        id="trigger"
                        style="width: 100%; padding: 5px 0; background: white; display: flex; 
                         align-items: center; justify-content: flex-end; color: #657DED; cursor: pointer"
                    >
                      <Icon
                          :size="24"
                          icon="more"
                      />
                    </div>
                    <Button icon-before="edit" state="dropdown-wide">
                      <div style="color: #222428;">Изменить</div>
                    </Button>
                    <Button icon-before="reload" state="dropdown-wide">
                      <div style="color: #222428;">Обновить</div>
                    </Button>
                    <Button icon-before="trash" state="dropdown-wide">
                      <div style="color: #222428;">Удалить</div>
                    </Button>
                  </template>
                </Dropdown>
              </div>
            </div>
          </template>
        </Table>
    `,
});

export const Default = Template.bind({}) as Args;
Default.args = {
};
Default.parameters = {
  docs: {
    source: {
      code: `
         <Table :records="records" :columns="columns">
          <template #prependRecord(model)="{ data }">
              {{ data.model }}
          </template>
          <template #cell(label)="{ data }">
            {{ data.label }}
          </template>
          <template #cell(id)="{ record }">
            {{ record.id }}
          </template>
          <template #cell(name)="{ data }">
            {{ data.name }}
          </template>
          <template #cell(code)="{ data }">
              {{ data.code }}
          </template>
          <template #cell(actions)="{ data }">
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; color: #657DED;">
              <div style="cursor: pointer;">
                <Icon :size="24" icon="eye" />
              </div>
              <div style="cursor: pointer;">
                <Icon :size="24" icon="edit" />
              </div>
              <div style="cursor: pointer;">
                <Icon :size="24" icon="watch" />
              </div>
              <div style="cursor: pointer;">
                <Dropdown>
                  <template #trigger>
                    <Icon
                        :size="24"
                        icon="more"
                    />
                  </template>
                  <template #dropdown>
                    <div 
                       style="width: 100%; padding: 5px 0; background: white; display: flex; 
                       align-items: center; justify-content: flex-end; color: #657DED; cursor: pointer"
                    >
                      <Icon
                          :size="24"
                          icon="more"
                      />
                    </div>
                    <Button icon-before="edit" state="dropdown-wide">
                      <div style="color: #222428;">Изменить</div>
                    </Button>
                    <Button icon-before="reload" state="dropdown-wide">
                      <div style="color: #222428;">Обновить</div>
                    </Button>
                    <Button icon-before="trash" state="dropdown-wide">
                      <div style="color: #222428;">Удалить</div>
                    </Button>
                  </template>
                </Dropdown>
              </div>
            </div>
          </template>
        </Table>
      `,
      language: 'html',
      type: 'auto',
    },
  },
};
