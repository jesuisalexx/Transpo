<template>
  <div
    :class="{
      [$style.root]: true,
      [$style[state]]: true,
      [$style[size]]: true,
      [$style.disabled]: isDisabled,
      [$style.error]: error,
      [$style.focus]: isFocused,
    }"
  >
    <span
      v-if="('label' in $slots) || label"
      :class="$style.label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </span>
    <div :class="$style.field">
      <input
        ref="input"
        v-model="localValue"
        v-mask="mask"
        :tabindex="computedTabIndex"
        :type="computedType"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        :placeholder="placeholder"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      >
    </div>
    <div
      v-if="error"
      :class="$style.error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { useInput } from '@/hooks/useInput';
import {
  inputType,
  InputProps,
  inputState,
  inputSize,
} from './index';

const props = withDefaults(
  defineProps<InputProps>(),
  {
    modelValue: '',
    name: undefined,
    label: undefined,
    placeholder: undefined,
    isDisabled: false,
    tabIndex: 0,
    disableTabNavigation: false,
    type: 'text' as inputType.TEXT,
    autocomplete: undefined,
    inputmode: undefined,
    mask: '',
    state: 'primary' as inputState.PRIMARY,
    size: 'md' as inputSize.MD,
  },
);

const emit = defineEmits([
  'update:modelValue',
  'input',
  'focus',
  'blur',
]);

const {
  localValue,
  isPasswordVisible,
  togglePassword,
  computedType,
  onInput,
  isFocused,
  onFocus,
  onBlur,
} = useInput(props, emit);

const input = ref<HTMLElement | null>(null);
const computedTabIndex = computed(
  () => ((props.disableTabNavigation || props.isDisabled) ? -1 : props.tabIndex),
);

const focus = async () => {
  await nextTick();
  input.value?.focus?.();
};

defineExpose({
  focus,
  togglePassword,
  isPasswordVisible,
});
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

// states
.primary {
  &.focus {
    .field {
      box-shadow: 0 0 0 rem(1px) rgba(var(--color-primary-2), 1);
    }
  }
  .label {
    color: rgb(var(--color-deep-blue));
    text-transform: uppercase;
    font-size: rem(13px);
    font-weight: 700;
  }
  .field {
    color: rgb(var(--color-deep-blue));
    border-radius: rem(5px);
    background-color: rgba(var(--color-white), 1);
    box-shadow: 0 0 rem(16px) rgba(0, 0, 0, 0.08);
    & > input {
      &::placeholder {
        color: rgba(var(--color-grey), 1);
      }
    }
    &:hover {
      box-shadow: 0 0 0 rem(1px) rgba(var(--color-primary-1), 1);
    }
  }
}
.disabled {
  pointer-events: none;

  .label {
    color: rgb(var(--color-grey));
    text-transform: uppercase;
    font-size: rem(13px);
    font-weight: 700;
  }
  .field {
    color: rgb(var(--color-grey));
    border-radius: rem(5px);
    background-color: rgb(var(--color-light-grey));
    box-shadow: none;
    & > input {
      &::placeholder {
        color: rgba(var(--color-grey), 1);
      }
    }
  }
}

// sizes
.md {
  .label {
    & + .field {
      margin-top: rem(15px);
    }
  }

  .field {
    & > input {
      @include text-sm;
      padding: rem(12px) rem(14px);
    }
    & + .error {
      margin-top: rem(6px);
    }
  }

  .error {
    @include text-sm;
  }
}

// default styles
.root {
  display: block;
  font-family: 'Inter', sans-serif;
  &.error {
    .label {
      color: rgba(var(--color-danger), 1);
    }
    .field {
      box-shadow: 0 0 0 rem(1px) rgba(var(--color-danger), 1);
      & > input {
        &::placeholder {
          color: rgba(var(--color-danger), 1);
        }
        color: rgba(var(--color-danger), 1);
      }
    }
  }
}

.field {
  width: 100%;
  transition: .15s box-shadow;
  & > input {
    height: 100%;
    width: 100%;
    border-radius: rem(5px);
    border: rem(1px) solid rgba(245, 246, 250, 1)
  }
}

.error {
  color: rgba(var(--color-danger), 1);
}
</style>
