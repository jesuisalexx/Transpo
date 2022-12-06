<template>
  <div
    :class="$style.root"
  >
    <router-link
      :to="route"
      :exact-active-class="$style.sidebarButtonActive"
      :class="[
        $style[state],
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
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/core/icon/Icon.vue';
import { ref } from 'vue';

const props = defineProps<{
  iconBefore: '',
  state: 'sidebarButtonClosed',
  route: '',
}>();
const isOpened = ref(false);
const toggle = () => {
  isOpened.value = !isOpened.value;
};
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
  transition: 0.3s;
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
</style>
