<template>
  <div
    :class="$style.root"
  >
    <div
      :class="$style.appendScrollWrapper"
      :style="computedAppendShadow"
    >
      <div :class="$style.appendScroll">
        <div
          v-if="isScrolledRight"
          :class="$style.appendShadow"
        />
        <Button
          v-if="isScrolledRight"
          :class="$style.appendButton"
          state="round-primary"
          icon-before="arrow-down-small"
          @mousedown="scrollRight"
        />
      </div>
    </div>
    <div
      :class="$style.prependScrollWrapper"
      :style="computedPrependShadow"
    >
      <div :class="$style.prependScroll">
        <div
          v-if="isScrolledLeft"
          :class="$style.prependShadow"
        />
        <Button
          v-if="isScrolledLeft"
          :class="$style.prependButton"
          state="round-primary"
          icon-before="arrow-down-small"
          @mousedown="scrollLeft"
        />
      </div>
    </div>
    <div
      ref="tableColumns"
      :class="$style.columns"
    >
      <div :class="$style.headWrapper">
        <div
          :style="computedColStyles"
          :class="$style.head"
        >
          <div
            v-for="column in columns"
            :key="column.slug"
            :class="[
              $style.column,
              $style[column.align],
              column.isStickLeft && $style.prependColumn,
              column.isStickRight && $style.appendColumn,
              column.isStickRight && $style.appendColumnTitle,
            ]"
            @click="onColumnClick(column.slug, column.isSelect)"
          >
            <slot
              :name="`column(${column.slug})`"
              :column="column"
              :label="column.label"
              :slug="column.slug"
              :is-all-records-selected="isAllRecordsSelected"
            >
              {{ column.label }}
            </slot>
          </div>
        </div>
      </div>
      <div :class="$style.records">
        <div
          v-for="record in computedRecords"
          :key="record.id"
          :class="[
            $style.record,
            record.isSelected && $style.selected,
          ]"
          :style="computedColStyles"
          @click="onRowClick(record.id)"
        >
          <div
            v-for="column in mainColumns"
            :key="column.slug"
            :class="[
              $style.recordColumn,
              $style[column.align],
              column.isStickLeft && $style.prependColumn,
              column.isStickRight && $style.appendColumn,
            ]"
            @click="onCellClick(record.id, column.isSelect)"
          >
            <slot
              :name="`cell(${column.slug})`"
              :record="record"
              :data="record.data"
              :is-selected="record.isSelected"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed, onMounted, ref,
} from 'vue';
import Button from '@/components/core/button/Button.vue';
import { useTable } from '@/hooks/useTable';
import {
  SelectedRecords, TableColumn, TableProps, TableRecord,
} from './index';

const props = defineProps<TableProps>();
const emit = defineEmits<{(e: 'update:selectedRecords', value: SelectedRecords): void,
  (e: 'record-click', value: TableRecord['id']): void,
}>();
const mainColumns = computed(
  () => props.columns,
);
const computedColumns = computed(() => mainColumns.value.reduce(
  (acc: string, column: TableColumn) => {
    const columnSize = `${column.size}px`;

    return `${acc} ${columnSize}`;
  },
  '',
));
const computedColStyles = computed(() => ({
  gridTemplateColumns: computedColumns.value,
}));
const computedPrependColumn = computed(() => props.columns.find((column) => column.isStickLeft));
const computedPrependShadow = computed(() => ({
  left: `${computedPrependColumn.value.size - 14}px`,
}));
const computedAppendColumn = computed(() => props.columns.find((column) => column.isStickRight));
const computedAppendShadow = computed(() => ({
  right: `${computedAppendColumn.value.size - 14}px`,
}));

const isScrolledRight = ref(true);
const isScrolledLeft = ref(false);
const tableColumns = ref();
onMounted(() => tableColumns.value.addEventListener('scroll', () => {
  isScrolledRight.value = tableColumns.value.clientWidth
      + tableColumns.value.scrollLeft < tableColumns.value.scrollWidth;
  isScrolledLeft.value = tableColumns.value.scrollLeft !== 0;
}));
onMounted(() => window.addEventListener('resize', () => {
  isScrolledRight.value = tableColumns.value.scrollWidth > tableColumns.value.clientWidth;
}));
onMounted(() => {
  isScrolledRight.value = tableColumns.value.scrollWidth > tableColumns.value.clientWidth;
});
const scrollRight = () => {
  const timer = setInterval(() => {
    tableColumns.value.scrollLeft += 5;
  }, 1);
  const onMouseUp = () => {
    clearInterval(timer);
    window.removeEventListener('mouseup', onMouseUp);
  };
  window.addEventListener('mouseup', onMouseUp);
};
const scrollLeft = () => {
  const timer = setInterval(() => {
    tableColumns.value.scrollLeft -= 5;
  }, 1);

  const onMouseUp = () => {
    clearInterval(timer);
    window.removeEventListener('mouseup', onMouseUp);
  };
  window.addEventListener('mouseup', onMouseUp);
};

const {
  isAllRecordsSelected,
  onColumnClick,
  onCellClick,
  computedRecords,
  onRowClick,
} = useTable(props, emit);
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  border-radius: rem(10px);
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.prependColumn {
  position: sticky;
  left: 0;
  z-index: 1;
  padding-left: rem(12px);
}

.appendColumn {
  position: sticky;
  right: 0;
  z-index: 1;
  padding-left: rem(12px);
  padding-right: rem(12px);
}
.appendColumnTitle {
  justify-content: center;
}

.columns {
  width: 100%;
  position: relative;
  overflow-x: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.prependScrollWrapper {
  width: rem(55px);
  height: 100%;
  position: absolute;
  z-index: 5;
}
.prependScroll {
  width: 100%;
  height: 100%;
  position: relative;
}
.appendScrollWrapper {
  width: rem(55px);
  height: 100%;
  position: absolute;
  right: rem(116px);
  z-index: 5;
}
.appendScroll {
  width: 100%;
  height: 100%;
  position: relative;
}
.appendButton {
  position: absolute;
  top: 49%;
  right: 0;
  transform: rotate(90deg);
}

.appendShadow {
  width: rem(41px);
  height: 100%;
  left: 0;
  position: absolute;
  background: linear-gradient(to left, #29304D 0%, rgba(41, 48, 77, 0) 100%);
  opacity: 0.1;
}

.prependShadow {
  width: rem(41px);
  height: 100%;
  right: 0;
  position: absolute;
  background: linear-gradient(to right, #29304D 0%, rgba(41, 48, 77, 0) 100%);
  opacity: 0.1;
}

.prependButton {
  transform: rotate(270deg);
  position: absolute;
  top: 49%;
  left: 0;
}

.headWrapper {
  display: grid;
  width: 100%;
}

.head {
  display: grid;
  border-bottom: rem(1px) solid rgb(var(--color-light-grey));
  padding: rem(25px) 0;
  background-color: rgb(var(--color-table));
  width: 100%;
  position: relative;
}

.records {
  display: grid;
  width: 100%;
}

.column {
  font-size: rem(12px);
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(var(--color-deep-blue));
}

.record {
  display: grid;
  padding: rem(10px) 0;
  border-bottom: rem(1px) solid rgb(var(--color-light-grey));
  background-color: rgb(var(--color-white));
  width: 100%;
  &:nth-child(even) {
    background: rgb(var(--color-table));
  }
  &.selected {
    background-color: rgb(var(--color-black-3));
  }
  .recordColumn {
    color: rgb(var(--color-deep-blue));
  }
}

.column, .recordColumn {
  display: flex;
  align-items: center;
  background-color: inherit;
  &.center {
    justify-content: center;
  }
  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }
}
</style>
