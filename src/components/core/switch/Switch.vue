<template>
  <div
    :class="[
      $style.root,
      localValue && $style.active,
      $style[type],
    ]"
  >
    <div
      :class="$style.switch"
      @click="toggle"
    >
      <div :class="$style.switchCircle" />
    </div>
    <div
      v-if="label || 'label' in $slots"
      :class="$style.label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { SwitchProps, SwitchType } from './index';

const props = withDefaults(
  defineProps<SwitchProps>(),
  {
    modelValue: false,
    type: 'primary' as SwitchType.PRIMARY,
  },
);
const emit = defineEmits([
  'update:modelValue',
]);

const localValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

const toggle = () => {
  localValue.value = !localValue.value;
};
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;

  &.primary {
    .switch {
      width: rem(48px);
      height: rem(24px);
      border-radius: rem(13px);
      background-color: rgb(var(--color-grey));
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: rem(4px);
      cursor: pointer;
      transition: 0.2s;
      position: relative;
      & + .label {
        margin-left: rem(10px);
      }
    }

    .switchCircle {
      width: rem(16px);
      height: rem(16px);
      border-radius: 50%;
      background-color: rgb(var(--color-white));
      position: absolute;
      left: rem(4px);
      transition: 0.2s;
    }

    &.active {
      .switch {
        background-color: rgb(var(--color-main));
      }
      .switchCircle {
        transform: translateX(rem(24px))
      }
    }

    .label {
      font-size: rem(14px);
      font-weight: 400;
      color: rgb(var(--color-text));
    }
  }
  &.secondary {
    .switch {
      width: rem(36px);
      height: rem(22px);
      border-radius: rem(13px);
      background-color: rgb(var(--color-grey));
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: rem(4px);
      cursor: pointer;
      transition: 0.2s;
      position: relative;
      & + .label {
        margin-left: rem(10px);
      }
    }

    .switchCircle {
      width: rem(18px);
      height: rem(18px);
      border-radius: 50%;
      background-color: rgb(var(--color-white));
      position: absolute;
      left: rem(2px);
      transition: 0.2s;
    }

    &.active {
      .switch {
        background-color: rgb(var(--color-green));
      }
      .switchCircle {
        transform: translateX(rem(14px))
      }
    }

    .label {
      font-size: rem(14px);
      font-weight: 400;
      color: rgb(var(--color-text));
    }
  }
}
</style>
