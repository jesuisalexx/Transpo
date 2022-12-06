<template>
  <div :class="$style.card">
    <div
      v-if="'head' in $slots"
      :class="$style.head"
    >
      <slot name="head" />
    </div>
    <slot />
  </div>
</template>

<style lang="scss" module>
@import "src/assets/styles/utils";

.card {
  border-radius: rem(10px);
  padding: rem(16px);
}
</style>
