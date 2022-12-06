<template>
  <div
    :class="$style.root"
  >
    <router-link
      :to="route"
      :class="[
        $style[state],
        isOpened ? $style.sidebarButtonActive : ''
      ]"
      @click="toggle"
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
        v-if="'default' in $slots"
        :class="$style.text"
      >
        <slot />
      </div>
    </router-link>
    <div
      :class="$style.dropdownWrapper"
      :style="computedHeight"
    >
      <div
        ref="dropdown"
        :class="$style.dropdown"
      >
        <div
          v-for="option in options"
          :key="option"
          :class="$style.dropdownItem"
        >
          {{ option.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/core/icon/Icon.vue';
import { computed, ref, watch } from 'vue';
import { useLayoutStore } from '@/stores/layout';

const layoutStore = useLayoutStore();
const isExpanded = computed(() => layoutStore.isExpanded);
const computedHeight = ref({
  height: '0px',
});
const dropdown = ref();
const isOpened = ref(false);
const toggle = () => {
  if (isExpanded.value) {
    isOpened.value = !isOpened.value;
    console.log('');
  }
};
const openButton = () => {
  if (isExpanded.value) {
    if (isOpened.value) {
      computedHeight.value.height = `${dropdown.value.getBoundingClientRect().height}px`;
    } else {
      computedHeight.value.height = '0px';
    }
  }
};
const closeButton = () => {
  if (!isExpanded.value) {
    isOpened.value = false;
    computedHeight.value.height = '0px';
  }
};
watch(isOpened, openButton);
watch(isExpanded, closeButton);

const props = defineProps<{
  iconBefore: '',
  state: 'sidebarButtonClosed',
  options: [],
  route: '',
}>();
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  width: 100%;
  font-family: 'Inter', sans-serif;
}

.sidebarButtonOpen {
  width: 100%;
  padding: rem(18px) 0 rem(18px) rem(40px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: rgb(var(--color-light-blue-2));
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: rgb(var(--color-sidebar));
    color: rgb(var(--color-white));
  }
}

.sidebarButtonActive {
  background-color: rgb(var(--color-sidebar));
  color: rgb(var(--color-white));
}

.sidebarButtonClosed {
  width: 100%;
  height: rem(52px);
  padding: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(var(--color-light-blue-2));
  transition: 0.3s;
  &:hover {
    background: rgb(var(--color-sidebar));
    color: rgb(var(--color-white));
  }
  .text {
    display: none;
  }
}

.iconBefore {
  width: rem(25px);
  height: rem(25px);
  display: flex;
  align-items: center;
  justify-content: center;
  + .text { margin-left: rem(10px) }
}

.dropdownWrapper {
  position: relative;
  overflow: hidden;
  transition: 0.2s;
}

.dropdown {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: rgb(var(--color-sidebar));
  padding-bottom: rem(20px);
}

.dropdownItem {
  width: 100%;
  height: rem(32px);
  font-size: rem(14px);
  font-weight: 400;
  background-color: rgb(var(--color-sidebar));
  color: rgb(var(--color-light-blue-2));
  display: flex;
  align-items: center;
  padding-left: rem(40px);
  transition: 0.3s;
  text-transform: capitalize;
  &:hover {
    color: rgb(var(--color-white));
    cursor: pointer;
  }
}
</style>
