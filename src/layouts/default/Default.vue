<template>
  <div :class="$style.root">
    <Header
      :breadcrumbs="crumbs"
      :language-options="langOptions"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/app/header/Header.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const langOptions = [
  {
    label: 'ru',
    value: 'russian',
    icon: 'rusFlag',
  },
  {
    label: 'en',
    value: 'english',
    icon: 'rusFlag',
  },
  {
    label: 'pl',
    value: 'polish',
    icon: 'rusFlag',
  },
];
const crumbs = [
  {
    id: 1,
    label: 'Главная',
    handler: () => console.log('1'),
  },
  {
    id: 2,
    label: 'Заголовок',
    handler: () => console.log('2'),
  },
  {
    id: 3,
    label: 'Third',
    handler: () => console.log('3'),
  },
];
</script>

<style lang="scss" module>
.root {}

.header {
  top: 0;
}
</style>
