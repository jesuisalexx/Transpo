<template>
  <div
    :class="{
      [$style.root]: true,
      [$style.expanded]: isExpanded,
    }"
  >
    <div :class="$style.info">
      <div
        :class="$style.toggleButtonWrapper"
      >
        <div
          :class="$style.toggleButton"
          @click="toggleSidebar"
        >
          <Icon
            :class="{
              [$style.iconCloseSidebar]: true,
              [$style.iconOpenSidebar]: !isExpanded
            }"
            icon="arrow-left"
          />
        </div>
      </div>
      <div :class="$style.heading">
        <Logo />
      </div>
      <div :class="$style.avatar">
        <Avatar
          :size="avatarSize"
          shape="square"
        />
      </div>
      <div :class="$style.userData">
        <div :class="$style.name">
          {{ userdata.name }}
        </div>
        <div :class="$style.mail">
          {{ userdata.mail }}
        </div>
      </div>
    </div>
    <div :class="$style.buttonsWrapper">
      <div
        v-for="button in buttons"
        :key="button"
        :class="$style.button"
      >
        <SidebarButton
          v-if="!button.options"
          :icon-before="button.icon"
          :state="computedState"
          :route="button.to"
        >
          {{ button.value }}
        </SidebarButton>
        <SidebarDropdown
          v-else-if="button.options"
          :icon-before="button.icon"
          :state="computedState"
          :options="button.options"
          :route="button.to"
        >
          {{ button.value }}
        </SidebarDropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/components/app/logo/Logo.vue';
import Icon from '@/components/core/icon/Icon.vue';
import { useLayoutStore } from '@/stores/layout';
import { computed } from 'vue';
import Avatar from '@/components/core/avatar/Avatar.vue';
import SidebarButton from '@/components/core/sidebarButton/SidebarButton.vue';
import SidebarDropdown from '@/components/core/sidebarDropdown/SidebarDropdown.vue';
import {
  SidebarProps,
} from './index';

const props = defineProps<SidebarProps>();

const layoutStore = useLayoutStore();
const isExpanded = computed(() => layoutStore.isExpanded);
const avatarSize = computed(() => (isExpanded.value ? 'm' : 'xs'));

const computedState = computed(() => (isExpanded.value ? 'sidebarButtonOpen' : 'sidebarButtonClosed'));
const { toggleSidebar } = layoutStore;
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

* {
  font-family: 'Inter', sans-serif;
}

.root {
  width: rem(62px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(var(--color-main));
  overflow: hidden;
  &.expanded {
    width: rem(242px);
  }

  &.expanded {
    width: rem(242px);
    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .heading {
      margin-top: rem(5px);
      display: block;
    }
    .toggleButtonWrapper {
      width: 90%;
      display: flex;
      justify-content: flex-end;
      margin-top: rem(17px);
    }
    .toggleButton {
      width: rem(24px);
      height: rem(24px);
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        color: rgb(var(--color-white));
      }
    }
    .avatar {
      margin-top: rem(34px);
      width: rem(92px);
      height: rem(92px);
      border-radius: 50%;
      padding: rem(13px) rem(22px);
      background-color: rgb(var(--color-dark-blue));
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .userData {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: rem(17px);
    }
    .name {
      color: rgb(var(--color-white));
      font-weight: 500;
      font-size: rem(14px);
      cursor: pointer;
    }
    .mail {
      margin-top: rem(5px);
      color: rgb(var(--color-light-blue));
      font-weight: 500;
      font-size: rem(12px);
    }
    .buttonsWrapper {
      width: 100%;
      margin-top: rem(20px);
    }
    .mainButton {
      width: 100%;
      height: rem(60px);
      padding-left: rem(36px);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: rgb(var(--color-light-blue-2));
      cursor: pointer;
      &:hover {
        background: rgb(var(--color-sidebar));
        color: rgb(var(--color-white));
      }
    }
    .mainButton {
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
    .buttonText {
      font-weight: 600;
      font-size: rem(12px);
      text-transform: uppercase;
      margin-left: rem(10px);
      display: block;
    }
    .iconCloseSidebar {
      width: rem(24px);
      height: rem(24px);
    }
    .iconOpenSidebar {
      width: rem(24px);
      height: rem(24px);
      transform: rotate(180deg);
    }
  }
}

.toggleButtonWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: rem(17px);
}

.toggleButton {
  width: rem(24px);
  height: rem(24px);
  cursor: pointer;
  color: rgb(var(--color-light-blue));
  transition: 0.1s;
  &:hover {
    color: rgb(var(--color-white));
  }
}

.heading {
  display: none;
}

.buttonsWrapper {
  margin-top: rem(17px);
  width: 100%;
}

.button {
  width: 100%;
}

.buttonText {
  display: none;
}

.mainButton {
  width: 100%;
  height: rem(52px);
  padding: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(var(--color-light-blue-2));
  &:hover {
    background: rgb(var(--color-dark-blue-2));
    color: rgb(var(--color-white));
  }
}

.iconCloseSidebar {
  width: rem(24px);
  height: rem(24px);
  cursor: pointer;
}

.iconOpenSidebar {
  width: rem(24px);
  height: rem(24px);
  transform: rotate(180deg);
}

.avatar {
  width: rem(44px);
  height: rem(44px);
  margin-top: rem(15px);
  border-radius: 50%;
  background-color: rgb(var(--color-dark-blue));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.userData {
  display: none;
}
</style>
