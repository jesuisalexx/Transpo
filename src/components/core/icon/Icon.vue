<template>
  <div
    :style="computedSize"
    :class="$style.icon"
  >
    <svg :class="$style.source">
      <use :xlink:href="`#icon-${icon}`" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { IconProps } from './index';

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
});
const computedSize = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}));

defineExpose(props);
</script>

<style lang="scss" module>
@import "@/assets/styles/utils";

.icon {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  pointer-events: none;
  position: relative;
}

.source {
  fill: currentColor;
  position: relative;
  display: block;
  flex-grow: 1;
  width: 100%;
}
</style>
