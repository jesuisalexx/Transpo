<template>
  <div :class="$style.logo">
    <Logo />
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/icons/heading.svg';
</script>

<style lang="scss" module>
.logo {
  color: rgb(var(--color-primary-1));
}
</style>
