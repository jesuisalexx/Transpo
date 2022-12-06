<template>
  <div :class="$style.root">
    <div
      v-for="(item, index) in computedItems"
      :key="index"
      :class="$style.crumbs"
    >
      <router-link
        v-if="item.id !== computedItems.length"
        :class="$style.label"
        :to="item.handler"
        @click="item.handler; removeCrumbs(item.id, item.handler)"
      >
        {{ item.label }}
      </router-link>
      <div
        v-else-if="item.id === computedItems.length"
        :class="$style.labelDisabled"
      >
        {{ item.label }}
      </div>
      <div
        v-if="index < (computedItems.length - 1)"
        :class="$style.divider"
      >
        /
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BreadcrumbsProps } from './index';

const props = defineProps<BreadcrumbsProps>();
const computedItems = ref(props.items);

const removeCrumbs = (crumb: number, handler: any) => {
  computedItems.value = props.items.filter((item) => item.id <= crumb);
  handler();
};
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  display: flex;
  font-family: 'Inter', sans-serif;
  font-size: rem(12px);
  font-weight: 500;
}

.crumbs {
  display: flex;
}

.divider {
  margin-left: rem(5px);
  margin-right: rem(5px);
}

.label {
  color: rgb(var(--color-main));
  cursor: pointer;
  &::before {
    color: rgb(var(--color-breadcrumbs));
  }
}

.labelDisabled {
  color: rgb(var(--color-breadcrumbs));
  &::after {
    color: rgb(var(--color-breadcrumbs));
  }
}
</style>
