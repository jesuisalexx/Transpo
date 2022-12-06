<template>
  <div
    :class="{
      [$style.root]: true,
      [$style.active]: localValue,
      [$style.disabled]: isDisabled,
    }"
    :tabindex="(disableTabNavigation || isDisabled) ? -1 : tabIndex"
    @click="toggle"
    @keydown.space="toggle"
    @focus="onFocus"
    @blur="onBlur"
  >
    <div :class="$style.box">
      <Icon
        :class="$style.check"
        icon="check"
      />
    </div>
    <div :class="$style.label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icon from '@/components/core/icon/Icon.vue';
import { CheckboxProps } from './index';

const props = withDefaults(
  defineProps<CheckboxProps>(),
  {
    modelValue: false,
    tabIndex: 0,
  },
);
const emit = defineEmits([
  'update:modelValue',
  'toggle',
  'focus',
  'blur',
]);

const localValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

const toggle = () => {
  if (props.isDisabled) return;
  localValue.value = !localValue.value;
  emit('toggle');
};

const onFocus = () => {
  emit('focus');
};

const onBlur = () => {
  emit('blur');
};
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  display: flex;
  align-items: center;
  &:not(.disabled) {
    cursor: pointer;
  }

  .check {
    opacity: 0;
    transition: .15s opacity;
  }

  &:not(.disabled) {
  }

  &.active {
    .check {
      opacity: 1;
    }

    .box {
      background-color: rgb(var(--color-main));
      border: rem(2px) solid rgba(var(--color-main), 1);
    }
  }
}

.box {
  width: rem(24px);
  height: rem(24px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: rem(2px) solid rgba(var(--color-grey), 1);
  background-color: rgb(var(--color-white));
  border-radius: rem(2px);
  color: rgba(var(--color-primary-1), 1);
  padding: rem(3px);
  & + .label {
    margin-left: rem(8px);
  }
}

.label {
  user-select: none;
  color: rgba(var(--color-text), 1);
  transition: .15s color;
  font-family: 'Inter', sans-serif;
}
</style>
