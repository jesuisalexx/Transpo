<template>
  <div
    ref="root"
    v-click-outside="onClickOutside"
    :class="[
      $style.root,
      isDisabled && $style.disabled,
      !!error && $style.error,
      isDropdownVisible && $style.active,
      $style[state],
      $style[size],
    ]"
    @click="handleShowDropdown"
  >
    <div
      v-if="label || 'label' in $slots"
      :class="$style.label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <button
      ref="trigger"
      type="button"
      :class="$style.trigger"
      :tabindex="computedTriggerTabIndex"
      @keydown.tab.shift.exact="disableTriggerBlurPrevent"
      @keydown.space.exact.prevent="calculatePositionAndShowDropdown"
      @keydown.enter.exact.prevent="calculatePositionAndShowDropdown"
      @focus="onFocusTrigger"
      @blur="onTriggerBlur"
    >
      <slot
        name="trigger"
        :display-value="displayValue"
        :placeholder="placeholder"
        :is-dropdown-visible="isDropdownVisible"
      >
        <template v-if="isMultiSelect && displayValue.length">
          <button
            v-for="selectedOption in displayValue"
            :key="selectedOption.value"
            :class="$style.tag"
            @click="onSelectOption(selectedOption.value)"
          >
            {{ selectedOption.label }}
          </button>
        </template>
        <template v-else-if="typeof displayValue === 'string' && displayValue">
          <div :class="$style.displayValue">
            {{ displayValue }}
          </div>
        </template>
        <template v-else>
          <div :class="$style.placeholder">
            {{ placeholder }}
          </div>
        </template>
        <Icon
          :class="$style.arrow"
          icon="arrow-down"
        />
      </slot>
    </button>
    <div
      v-if="error"
      :class="$style.error"
    >
      {{ error }}
    </div>
    <teleport :to="teleportTarget">
      <div
        ref="dropdown"
        :class="[
          $style.dropdown,
          $style[size],
          isDropdownVisible && $style.active,
          $style[state],
          $style[computedPosition],
        ]"
        :style="computedDropdownStyles"
      >
        <input
          v-if="isSearchable"
          ref="search"
          v-model="query"
          :class="$style.search"
          type="text"
          :placeholder="searchPlaceholder"
          @keydown.prevent.up.exact="closeDropdownAndFocusTrigger"
          @keydown.prevent.down.exact="onSearchDown"
          @keydown.tab.shift.exact="closeDropdownAndFocusTrigger"
          @keydown.esc.exact.prevent="closeDropdownAndFocusTrigger"
        >
        <button
          v-for="(option, optionIndex) in computedOptions"
          :ref="el => { optionRefs[optionIndex] = el }"
          :key="option.value"
          :class="[
            $style.selectItem,
            option.isSelected && $style.selected,
          ]"
          tabindex="0"
          :data-role="selectRole.ITEM"
          @click="selectOptionAndCloseDropdown(option.value)"
          @keydown.space.exact.prevent="selectOptionAndCloseDropdown(option.value)"
          @keydown.enter.prevent="selectOptionAndCloseDropdown(option.value)"
          @keydown.tab.exact="onOptionTab(optionIndex)"
          @keydown.tab.shift.exact="onOptionShiftTab(optionIndex)"
          @keydown.prevent.down.exact="onNextOption(optionIndex)"
          @keydown.prevent.up.exact="onPreviousOption(optionIndex)"
          @keydown.esc.exact.prevent="closeDropdownAndFocusTrigger"
        >
          <slot
            name="option"
            :option="option"
          >
            {{ option.label }}
          </slot>
        </button>
        <div
          v-if="append"
          :class="$style.addOptionWrapper"
        >
          <slot name="append" />
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  onBeforeUpdate,
} from 'vue';
import Icon from '@/components/core/icon/Icon.vue';
import { teleportTargets } from '@/types/teleport';
import { useSelect } from '@/hooks/useSelect';
import { useEnvironmentObserver } from '@/hooks/useEnvironmentObserver';
import { useI18n } from 'vue-i18n';
import {
  SelectProps,
  SelectOption,
  selectState,
  selectDropdownPosition, selectSize,
} from './index';

const { t } = useI18n();

const props = withDefaults(
  defineProps<SelectProps>(),
  {
    dropdownPosition: 'bottom' as selectDropdownPosition.BOTTOM,
    state: 'primary' as selectState.PRIMARY,
    size: 'md' as selectSize.MD,
  },
);

const emit = defineEmits<{(e: 'update:modelValue', value: string | string[]): void,
  (e: 'focus'): void,
  (e: 'blur'): void,
}>();

enum selectRole {
  ITEM = 'select-item'
}

// logic
const {
  isDropdownVisible,
  showDropdown,
  closeDropdown,
  isMultiSelect,
  displayValue,
  onSelectOption,
  query,
  computedOptions,
} = useSelect(props, emit);

// presentation
const root = ref<HTMLElement | null>(null);
const trigger = ref<HTMLElement | null>(null);
const dropdown = ref<HTMLElement | null>(null);
const search = ref<HTMLElement | null>(null);

const optionRefs = ref<HTMLElement[]>([]);
onBeforeUpdate(() => {
  optionRefs.value = [];
});

const computedPosition = ref(props.dropdownPosition);
const calculateDropdownPosition = () => {
  if (!trigger.value || !dropdown.value || !isDropdownVisible.value) return;
  const triggerRect = trigger.value.getBoundingClientRect();
  const dropdownRect = dropdown.value.getBoundingClientRect();

  const isIntersectingBottom = (
    triggerRect.top + triggerRect.height + dropdownRect.height
  ) > window.innerHeight;

  const isIntersectingTop = (
    triggerRect.top - dropdownRect.height
  ) < 0;

  if (isIntersectingBottom) {
    computedPosition.value = selectDropdownPosition.TOP;
  } else if (isIntersectingTop) {
    computedPosition.value = selectDropdownPosition.BOTTOM;
  } else {
    computedPosition.value = props.dropdownPosition;
  }
};

// trigger
const computedTriggerTabIndex = computed(
  () => ((props.disableTabNavigation || props.isDisabled) ? -1 : props.tabIndex),
);

const focusTrigger = () => {
  if (props.isDisabled) return;
  trigger.value?.focus();
};

const isPreventTriggerBlur = ref(true);
const setTriggerBlurPrevent = () => {
  isPreventTriggerBlur.value = true;
};
const disableTriggerBlurPrevent = () => {
  isPreventTriggerBlur.value = false;
};
const onTriggerBlur = (e: FocusEvent) => {
  if (isPreventTriggerBlur.value) {
    e.preventDefault();
    setTriggerBlurPrevent();
    if (props.isSearchable) {
      search.value?.focus();
      return;
    }
    return;
  }
  emit('blur');
  closeDropdown();
};

// dropdown
const computedDropdownStyles = ref({
  width: '0px',
  transform: 'translateX(0px) translateY(0px)',
  transition: 'none',
});

const calculateDropdownRect = () => {
  if (!trigger.value || !dropdown.value) return;
  const triggerRect = trigger.value.getBoundingClientRect();
  const dropdownRect = dropdown.value.getBoundingClientRect();

  if (computedPosition.value === selectDropdownPosition.BOTTOM) {
    computedDropdownStyles.value.transform = `translateY(${triggerRect.top + triggerRect.height}px) translateX(${triggerRect.left}px)`;
    computedDropdownStyles.value.width = `${triggerRect.width}px`;
  } else if (computedPosition.value === selectDropdownPosition.TOP) {
    computedDropdownStyles.value.transform = `translateY(${triggerRect.top - dropdownRect.height}px) translateX(${triggerRect.left}px)`;
    computedDropdownStyles.value.width = `${triggerRect.width}px`;
  }
};

const teleportTarget = computed(() => `#${teleportTargets.LEVITATING}`);

const transitionTime = 250;
const setTransition = () => {
  computedDropdownStyles.value.transition = `
    clip-path ${transitionTime}ms,
    opacity ${transitionTime}ms,
    transform ${transitionTime}ms ease
  `;
};
const removeTransition = () => {
  computedDropdownStyles.value.transition = 'none';
};

const showDropdownTransition = (cb: any) => {
  setTransition();
  setTimeout(removeTransition, transitionTime);
  cb?.();
};
const showDropdownWithTransition = () => showDropdownTransition(showDropdown);
const closeDropdownWithTransition = () => showDropdownTransition(closeDropdown);

const calculatePositionAndShowDropdown = () => {
  setTriggerBlurPrevent();
  calculateDropdownPosition();
  showDropdownWithTransition();
};

const closeDropdownAndFocusTrigger = () => {
  focusTrigger();
  disableTriggerBlurPrevent();
  closeDropdownWithTransition();
};

// search
const onSearchDown = () => {
  const firstOption = optionRefs.value?.[0];

  if (firstOption) {
    firstOption.focus();
  }
};

// options
const selectOptionAndCloseDropdown = (optionValue: SelectOption['value']) => {
  onSelectOption(optionValue);
  if (!isMultiSelect.value) {
    closeDropdownAndFocusTrigger();
  }
};

const onOptionTab = (optionIndex: number) => {
  const isLastOption = (optionIndex + 1) === computedOptions.value.length;

  if (isLastOption) {
    closeDropdownAndFocusTrigger();
  }
};

const onOptionShiftTab = (optionIndex: number) => {
  const isFirstElementAndNotSearchable = optionIndex === 0 && !props.isSearchable;

  if (isFirstElementAndNotSearchable) {
    closeDropdownAndFocusTrigger();
  }
};

const onNextOption = (optionIndex: number) => {
  const nextOptionIndex = optionIndex + 1;
  const nextOption = optionRefs.value?.[nextOptionIndex];

  if (nextOption) {
    nextOption.focus();
  } else {
    closeDropdownAndFocusTrigger();
  }
};

const onPreviousOption = (optionIndex: number) => {
  const previousOptionIndex = optionIndex - 1;
  const previousOption = optionRefs.value?.[previousOptionIndex];

  if (previousOption) {
    previousOption.focus();
  } else {
    if (props.isSearchable) {
      search.value?.focus();
      return;
    }
    closeDropdownAndFocusTrigger();
  }
};

// common
const onFocusTrigger = () => {
  if (props.isDisabled) return;
  emit('focus');
  calculatePositionAndShowDropdown();
};

const handleShowDropdown = () => {
  if (props.isSearchable) {
    search.value?.focus();
  }
  calculateDropdownRect();
  calculatePositionAndShowDropdown();
};

const onClickOutside = (e: PointerEvent) => {
  if (
    e.target !== dropdown.value
      && !root.value?.contains(e.target)
      && !dropdown.value?.contains(e.target)
      && isDropdownVisible.value
  ) {
    closeDropdownAndFocusTrigger();
  }
};

// listeners
watch(isDropdownVisible, calculateDropdownPosition);

const onEnvironmentMutation = () => {
  calculateDropdownPosition();
  calculateDropdownRect();
};

const {
  setListeners,
  removeListeners,
} = useEnvironmentObserver(onEnvironmentMutation);

onMounted(() => {
  setListeners();
  calculateDropdownRect();
});
onBeforeUnmount(removeListeners);

defineExpose({
  focus: focusTrigger,
});
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";
* {
  font-family: 'Inter', sans-serif;
}
.arrow {
  margin-left: auto;
  color: rgb(var(--color-grey));
  width: rem(30px);
  height: rem(30px);
  transition: .2s transform;
}

// states
.primary {
  .label {
    color: rgb(var(--color-deep-blue));
    text-transform: uppercase;
    font-size: rem(13px);
    font-weight: 700;
  }
  .trigger {
    color: rgba(var(--color-grey), 1);
    background-color: rgba(var(--color-white), 1);
    border: rem(1px) solid rgba(239, 239, 239, 1);
    &:focus, &:hover {
      box-shadow: 0 0 0 rem(1px) rgba(var(--color-primary-1), 1);
    }
    .displayValue {
      color: rgb(var(--color-grey-2));
    }
    .placeholder {
      color: rgb(var(--color-grey));
    }
    .tag {
      color: rgb(var(--color-primary-1));
      background-color: rgba(var(--color-secondary-4), 1);
    }
  }
}
.disabled {
  pointer-events: none;
  .label {
    color: rgb(var(--color-deep-blue));
    text-transform: uppercase;
    font-size: rem(13px);
    font-weight: 700;
  }
  .trigger {
    color: rgba(var(--color-grey), 1);
    background-color: rgba(var(--color-primary-6), 1);
    border: rem(1px) solid rgba(239, 239, 239, 1);
    &:focus, &:hover {
      box-shadow: 0 0 0 rem(1px) rgba(var(--color-primary-1), 1);
    }
    .displayValue {
      color: rgb(var(--color-grey-2));
    }
    .placeholder {
      color: rgb(var(--color-grey));
    }
    .tag {
      color: rgb(var(--color-primary-1));
      background-color: rgba(var(--color-secondary-4), 1);
    }
  }
}

.dropdown.primary {
  background-color: rgba(var(--color-white), 1);
  .search {
    color: rgb(var(--color-primary-1));
    border-bottom: rem(1px) solid rgba(var(--color-primary-5), 1);
    &::placeholder {
      color: rgb(var(--color-primary-3));
    }
    &:focus {
      background-color: rgba(var(--color-secondary-4));
      border-bottom: rem(1px) solid transparent;
    }
  }
  .selectItem {
    color: rgb(var(--color-text));
    &.selected {
      color: rgb(var(--color-text));
      background-color: rgb(var(--color-background-hover));
      font-weight: 600;
    }
    &:focus, &:hover {
      color: rgb(var(--color-text));
      &:not(.selected) {
        background-color: rgb(var(--color-background-hover));
        font-weight: 600;
      }
    }
    &:focus {
      transform: scale(1.001);
    }
  }
}

// sizes
.md {
  .label {
    & + .trigger {
      margin-top: rem(15px);
    }
  }
  .trigger {
    border-radius: rem(6px);
    padding: rem(5px) rem(12px);
    @include text-sm;
    // gap between multiselect tags
    grid-gap: rem(4px);
  }
  .tag {
    padding: rem(4px) rem(10px);
    border-radius: rem(6px);
    font-size: rem(9.5px);
  }
}

.dropdown.md {
  .search {
    @include text-sm;
    padding: rem(10px);
  }
  .selectItem {
    @include text-sm;
    padding: rem(10px);
  }
}

// default styles
.root {
  &.active {
    .arrow {
      transform: rotate(180deg);
    }
    .trigger {
      box-shadow: 0 0 0 rem(1px) rgba(var(--color-primary-1), 1);
    }
  }
  &.disabled {
    .label {
      color: rgb(var(--color-grey));
    }
    .trigger {
      background-color: rgb(var(--color-primary-6));
    }
  }
  &.error {
    .label {
      color: rgba(var(--color-danger), 1);
    }
    .trigger {
      box-shadow: 0 0 0 rem(1px) rgba(var(--color-danger), 1);
      .placeholder {
        color: rgba(var(--color-danger), 1);
      }
      color: rgba(var(--color-danger), 1);
    }
  }
}

.trigger {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: .15s box-shadow;
}

.dropdown {
  position: fixed;
  border-radius: rem(5px);
  overflow: hidden;
  pointer-events: none;
  box-shadow: 0 4px 24px rgba(41, 48, 77, 0.12);
  * {
    pointer-events: none;
  }
  opacity: 0;
  &.top {
    clip-path: circle(7% at 40% 85%);
    transform: translateY(9%) translateX(-1%);
  }
  &.bottom {
    clip-path: circle(7% at 40% 15%);
    transform: translateY(-9%) translateX(-1%);
  }
  &.active {
    opacity: 1;
    pointer-events: all;
    &.bottom, &.top {
      transform: translateY(0);
      clip-path: circle(100% at 40% 15%);
    }
    * {
      pointer-events: all;
    }
  }

  .search {
    display: block;
    width: 100%;
  }
}
.addOptionWrapper {
  width: 100%;
  border-top: rem(1px) solid rgb(var(--color-light-grey));
  padding: rem(10px);
  height: rem(43px);
  background-color: rgb(var(--color-white));
  font-size: rem(13px);
  font-weight: 700;
  color: rgb(var(--color-main));
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background-color: rgb(var(--color-background-hover));
  }
}
.selectItem {
  font-size: rem(14px);
  font-weight: 400;
  width: 100%;
  padding: 0 rem(10px);
  height: rem(30px);
  text-align: left;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
