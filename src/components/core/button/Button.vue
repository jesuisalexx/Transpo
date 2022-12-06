<template>
  <button
    tabindex="0"
    :class="[
      $style.button,
      ...computedState.map((state) => $style[state]),
      $style[shape]
    ]"
  >
    <div
      v-if="'before' in $slots || iconBefore"
      :class="$style.iconBefore"
    >
      <Icon
        :icon="iconBefore"
      />
    </div>
    <div
      v-if="'default' in $slots || label"
      :class="$style.text"
    >
      {{ label }}
      <slot />
    </div>
    <div
      v-if="'before' in $slots || iconAfter"
      :class="$style.iconAfter"
    >
      <Icon
        :icon="iconAfter"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import {
  buttonIcons, ButtonProps, buttonShape, buttonState,
} from '@/components/core/button/index';
import Icon from '@/components/core/icon/Icon.vue';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<ButtonProps>(),
  {
    state: 'primary' as buttonState.PRIMARY,
    shape: 'rectangle' as buttonShape.RECTANGLE,
    iconBefore: '' as buttonIcons.ICONBEFORE,
    iconAfter: '' as buttonIcons.ICONAFTER,
  },
);
const computedState = computed(() => (Array.isArray(props.state) ? props.state : [props.state]));
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.button {
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;

  &.success {
    color: rgb(var(--color-primary-3));
    border: rem(1px) solid rgb(var(--color-primary-3));
    background-color: rgb(var(--color-background));
  }

  &.primary {
    height: rem(40px);
    background-color: rgb(var(--color-main));
    padding: rem(10px) rem(20px);
    border-radius: rem(5px);
    font-size: rem(13px);
    font-weight: 700;
    text-transform: uppercase;
    color: rgb(var(--color-white));
    transition: 0.4s;
    .iconBefore {
      width: rem(25px);
      height: rem(25px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .iconAfter {
      width: rem(25px);
      height: rem(25px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover {
      box-shadow: 0 0 rem(4px) rem(4px) rgb(var(--color-light-grey));
    }
  }
  &.primary-wide {
    width: 100%;
    height: rem(40px);
    background-color: rgb(var(--color-main));
    padding: rem(10px) rem(20px);
    border-radius: rem(5px);
    font-size: rem(13px);
    font-weight: 700;
    text-transform: uppercase;
    color: rgb(var(--color-white));
    display: flex;
    justify-content: center;
    transition: 0.4s;
    &:hover {
      box-shadow: 0 0 rem(4px) rem(4px) rgb(var(--color-light-grey));
    }
  }

  &.dropdown-wide {
    width: rem(160px);
    height: rem(36px);
    padding-left: rem(20px);
    align-items: center;
    cursor: pointer;
    color: rgb(var(--color-main));
    font-size: rem(14px);
    &:hover {
      background-color: rgb(var(--color-light-grey));
    }
  }

  &.secondary {
    height: rem(40px);
    padding: rem(10px) rem(20px);
    border-radius: rem(5px);
    font-size: rem(13px);
    font-weight: 700;
    text-transform: uppercase;
    color: rgb(var(--color-main));
    border: rem(1px) solid rgb(var(--color-light-blue-2));
    transition: 0.4s;
    .iconBefore {
      width: rem(25px);
      height: rem(25px);
    }
    .iconAfter {
      width: rem(25px);
      height: rem(25px);
    }
    &:hover {
      box-shadow: 0 0 rem(4px) rem(4px) rgb(var(--color-light-grey));
    }
  }
  &.secondary-wide {
    width: 100%;
    height: rem(40px);
    padding: rem(10px) rem(20px);
    border-radius: rem(5px);
    font-size: rem(13px);
    font-weight: 700;
    text-transform: uppercase;
    color: rgb(var(--color-main));
    border: rem(1px) solid rgb(var(--color-light-blue-2));
    display: flex;
    justify-content: center;
    transition: 0.4s;
    &:hover {
      box-shadow: 0 0 rem(4px) rem(4px) rgb(var(--color-light-grey));
    }
  }

  &.secondary-icon {
    padding: rem(8px);
    border-radius: rem(5px);
    font-size: rem(13px);
    font-weight: 700;
    text-transform: uppercase;
    color: rgb(var(--color-main));
    border: rem(1px) solid rgb(var(--color-light-blue-2));
    transition: 0.4s;
    .iconBefore {
      width: rem(25px);
      height: rem(25px);
    }
    .iconAfter {
      width: rem(25px);
      height: rem(25px);
    }
    &:hover {
      box-shadow: 0 0 rem(4px) rem(4px) rgb(var(--color-light-grey));
    }
  }

  &.danger {
    height: rem(40px);
    background-color: rgb(var(--color-orange));
    padding: rem(10px) rem(20px);
    border-radius: rem(5px);
    font-size: rem(13px);
    font-weight: 700;
    text-transform: uppercase;
    color: rgb(var(--color-white));
    transition: 0.4s;
    .iconBefore {
      width: rem(25px);
      height: rem(25px);
    }
    .iconAfter {
      width: rem(25px);
      height: rem(25px);
    }
    &:hover {
      box-shadow: 0 0 rem(4px) rem(4px) rgb(var(--color-light-grey));
    }
  }
  &.danger-wide {
    width: 100%;
    height: rem(40px);
    background-color: rgb(var(--color-orange));
    padding: rem(10px) rem(20px);
    border-radius: rem(5px);
    font-size: rem(13px);
    font-weight: 700;
    text-transform: uppercase;
    color: rgb(var(--color-white));
    transition: 0.4s;
    display: flex;
    justify-content: center;
    &:hover {
      box-shadow: 0 0 rem(4px) rem(4px) rgb(var(--color-light-grey));
    }
  }

  &.square {
    padding: rem(8px);
  }

  &.primary-simple {
    font-size: rem(12px);
    font-weight: 500;
    color: rgb(var(--color-main));
  }

  &.round-primary {
    width: rem(30px);
    height: rem(30px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: rgb(var(--color-white));
    background: rgb(var(--color-main));
    .iconBefore {
      margin-bottom: rem(3px);
    }
  }

  &.sidebar-button-closed {
    width: 100%;
    height: rem(52px);
    padding: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(var(--color-light-blue-2));
    &:hover {
      background: rgb(var(--color-sidebar));
      color: rgb(var(--color-white));
    }
    .text {
      display: none;
    }
  }
}

.iconBefore {
  display: flex;
  align-items: center;
  justify-content: center;
  + .text { margin-left: rem(10px) }
}

.iconAfter {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: rem(10px);
}
</style>
