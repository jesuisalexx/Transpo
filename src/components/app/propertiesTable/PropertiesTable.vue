<template>
  <div :class="$style.root">
    <div
      v-for="record in records"
      :key="record"
      :class="$style.record"
    >
      <div :class="$style.label">
        <slot
          :name="`label(${record.label})`"
          :record="record"
        >
          {{ record.label }}
        </slot>
      </div>
      <div :class="$style.value">
        <slot
          :name="`value(${record.label})`"
          :text="record.value"
        >
          {{ record.value }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { PropertiesTableProps } from '@/components/app/propertiesTable/index';

const props = defineProps<PropertiesTableProps>();
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  font-family: 'Inter', sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: rem(10px);
  overflow: hidden;
}

.record {
  display: flex;
  height: rem(40px);
  &:nth-child(4n+1) {
    background: rgb(var(--color-table-record));
  }
  &:nth-child(4n+2) {
    background: rgb(var(--color-table-record));
  }
}

.label {
  background: rgb(var(--color-table));
  min-width: rem(180px);
  padding: rem(10px) rem(12px);
  height: 100%;
  font-size: rem(12px);
  font-weight: 600;
  color: rgb(var(--color-deep-blue));
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

.value {
  width: 100%;
  padding: rem(10px) rem(12px);
  height: 100%;
  font-size: rem(14px);
  font-weight: 400;
  color: rgb(var(--color-deep-blue));
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
