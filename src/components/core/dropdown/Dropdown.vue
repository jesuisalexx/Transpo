<template>
  <VDropdown>
    <div>
      <slot name="trigger" />
    </div>
    <template #popper>
      <div :class="$style.dropdown">
        <slot name="dropdown" />
      </div>
    </template>
  </VDropdown>
</template>

<script lang="ts" setup>
import 'floating-vue/dist/style.css';
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.dropdown {}
</style>
<style>
.v-popper__arrow-container {
  display: none;
}
</style>
