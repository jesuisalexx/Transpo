<template>
  <div
    ref="wrapper"
    class="tabs"
  >
    <div
      v-for="(tab, tabIndex) in tabs"
      :ref="tabEl => { tabRefs[tabIndex] = tabEl }"
      :key="tab.value"
      class="tabs__item"
      :data-value="tab.value"
      @click="onTabClick(tab.value)"
    >
      {{ tab.label }}
    </div>
    <div
      :style="computedGhostStyles"
      class="tabs__ghost"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUpdate,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import { Tab } from './index';

const props = defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    required: true,
  },
  modelValue: {
    type: String as PropType<Tab['value']>,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

const wrapper = ref(null);
const tabRefs = ref([]);
onBeforeUpdate(() => {
  tabRefs.value = [];
});

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const onTabClick = (value) => {
  localValue.value = value;
};

const computedGhostStyles = ref({
  width: '0px',
  height: 'auto',
  left: '0px',
});
const findActiveTab = () => {
  const activeTabElement = tabRefs.value.find((el) => el.dataset.value === localValue.value);
  const { left: wrapperLeft } = wrapper.value.getBoundingClientRect();
  const { width, height, left } = activeTabElement.getBoundingClientRect();
  computedGhostStyles.value.width = `${width}px`;
  computedGhostStyles.value.height = `${height}px`;
  computedGhostStyles.value.left = `${left - wrapperLeft}px`;
};

watch(localValue, findActiveTab);
onMounted(findActiveTab);
</script>

<style lang="scss">
@import "src/assets/styles/utils";

@keyframes tabs-ghost {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.tabs {
  position: relative;
  border-radius: rem(30px);
  padding: rem(5px);
  display: flex;
  background-color: rgb(var(--color-black-2));
  &__item {
    mix-blend-mode: difference;
    padding: rem(10px) rem(20px);
    position: relative;
    color: rgba(var(--color-primary-1));
    z-index: 2;
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: .2s transform;
    height: 100%;
    top: 0;
    bottom: 0;
    &:active {
      transform: scale(0.98);
    }
  }
  &__ghost {
    background-color: rgba(var(--color-primary-1));
    border-radius: rem(20px);
    position: absolute;
    transition: .4s left, .4s width;
    animation: tabs-ghost .7s ease-in-out;
  }
}
</style>
