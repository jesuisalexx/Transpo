<template>
  <div :class="$style.root">
    <paginate
      v-model="localValue"
      :page-count="pages"
      :page-range="pageRange"
      :prev-text="t('pagination.previous')"
      :next-text="t('pagination.next')"
      :container-class="'className'"
      :class="$style.pagination"
      :prev-class="{
        [$style.prev]: true,
        [$style.buttonWrapper]: true,
      }"
      :prev-link-class="$style.button"
      :next-class="{
        [$style.next]: true,
        [$style.buttonWrapper]: true,
      }"
      :next-link-class="$style.button"
      :page-class="$style.pageWrapper"
      :page-link-class="$style.page"
      :active-class="$style.active"
    />
  </div>
</template>

<script lang="ts" setup>
import Paginate from 'vuejs-paginate-next';
import { PaginationProps } from '@/components/core/pagination/index';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const emit = defineEmits([
  'update:modelValue',
]);

const props = withDefaults(
  defineProps<PaginationProps>(),
  {
    pages: 8,
    modelValue: 1,
  },
);

const localValue = computed({
  get: () => props.modelValue,
  set: (value: number) => emit('update:modelValue', value),
});
const { t } = useI18n();
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: 'Inter', sans-serif;
}

.pagination {
  display: flex;
}

.buttonWrapper {
  border-radius: rem(5px);
  font-size: rem(13px);
  font-weight: 700;
  text-transform: uppercase;
  color: rgb(var(--color-main));
  border: rem(1px) solid rgb(var(--color-light-blue-2));
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}

.button {
  padding: rem(10px) rem(20px);
  width: 100%;
}

.prev {
  margin-right: rem(12px);
}

.next {
  margin-left: rem(12px);
}

.pageWrapper {
  font-size: rem(14px);
  width: rem(40px);
  height: rem(40px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: rgb(var(--color-grey-2));
  border-radius: rem(5px);
  cursor: pointer;
}

.page {
  width: rem(40px);
  height: rem(40px);
  border-radius: rem(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.active {
  background-color: rgb(var(--color-main));
  color: rgb(var(--color-white));
}
</style>
