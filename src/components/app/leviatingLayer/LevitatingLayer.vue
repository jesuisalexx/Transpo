<template>
  <div
    :id="teleportTargets.LEVITATING"
    :class="$style.levitatingLayer"
  />
</template>

<script setup lang="ts">
import { teleportTargets } from '@/types/teleport';
</script>

<style lang="scss" module>
.levitatingLayer {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 5000;
  * {
    pointer-events: all;
  }
}
</style>
