<template>
  <span
    v-if="('label' in $slots) || label"
    :class="{
      [$style.label]: true,
      [$style.labelDisabled]: isDisabled,
    }"
  >
    <slot name="label">
      {{ label }}
    </slot>
  </span>
  <Datepicker
    v-model="localValue"
    :class="$style.datepicker"
    :menu-class-name="$style.menu"
    :range="range"
    :inline="inline"
    :multi-dates="multiDates"
    :month-name-format="monthNameFormat"
    :placeholder="placeholder"
    :no-today="noToday"
    :month-change-on-scroll="false"
    :highlight-week-days="[0, 6]"
    :format-locale="ru"
    :auto-apply="autoApply"
    :enable-time-picker="enableTimePicker"
    :time-picker="timePicker"
    :format="format"
    :locale="locale"
    :disabled="isDisabled"
  >
    <template #calendar-header="{ index, day }">
      <div :class="index === 5 || index === 6 ? 'weekends_color' : ''">
        {{ day }}
      </div>
    </template>
  </Datepicker>
</template>

<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ru } from 'date-fns/locale';
import { computed } from 'vue';
import { DatepickerProps, MonthNameType } from '@/components/core/datepicker/index';

const props = withDefaults(
  defineProps<DatepickerProps>(),
  {
    modelValue: false,
    enableTimePicker: true,
    timePicker: false,
    type: 'long' as MonthNameType.LONG,
    locale: 'en',
    isDisabled: false,
  },
);
const emit = defineEmits([
  'update:modelValue',
  'toggle',
]);

const localValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});
const format = 'dd/MM/yyyy HH:mm';
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.label {
  color: rgb(var(--color-deep-blue));
  text-transform: uppercase;
  font-size: rem(13px);
  font-weight: 700;
}
.labelDisabled {
  color: rgb(var(--color-grey));
  text-transform: uppercase;
  font-size: rem(13px);
  font-weight: 700;
}
.datepicker {
  margin-top: rem(15px);
}
</style>

<style lang="scss">

.dp__action_buttons {
  display: flex;
  width: auto;
}

.dp__cell_inner.dp__pointer.dp__date_hover {
  border-radius: 8px;
}
.dp__action_row {
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif!important;
}
.dp__today {
  border: none;
}

.dp__active_date {
  background: rgb(var(--color-main));
  border-radius: 8px!important;
  font-weight: 600!important;
}

.dp__calendar_header_separator {
  display: none;
}
.dp__input::placeholder {
  color: #94A3B8;
}

.dp__month_year_row {
  margin-bottom: 20px;
}

.dp__overlay_cell_active {
  border-radius: 8px!important;
  background: rgb(var(--color-main)) !important;
}

.dp__select {
  color: rgb(var(--color-main)) !important;
}

.dp__overlay_col {
  text-transform: capitalize;
}
.dp__arrow_bottom {
  display: none;
}
.dp__arrow_top {
  display: none;
}

.dp__calendar_item {
  font-family: 'Inter', sans-serif!important;
}

.dp__calendar_header_item {
  font-weight: 400;
  font-family: 'Inter', sans-serif!important;
}

.dp__overlay_cell_active  {
  background: rgb(var(--color-main));
  border-radius: 8px!important;
  font-weight: 600!important;
}

.dp__cell_highlight {
  color: rgb(var(--color-danger));
  background-color: transparent;
}

.dp__range_start {
  background: rgb(var(--color-main));
  color: rgb(var(--color-white));
}

.dp__range_end {
  background: rgb(var(--color-main));
  color: rgb(var(--color-white));
}
.dp__button {
  border-radius: 8px!important;
}
.dp__range_between {
  background-color: var(--dp-hover-color)!important;
}
.dp__month_year_col_nav {
  margin-left: 5px;
}
.dp__menu {
  padding: 15px;
  border: none!important;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}
.dp__month_year_select {
  font-family: 'Inter', sans-serif!important;
  text-transform: capitalize;
}
.dp__overlay_cell {
  font-family: 'Inter', sans-serif!important;
}
.dp__icon {
  fill: #94A3B8;
}
.dp__disabled {
  color: #94A3B8;
}

.weekends_color {
  color: rgb(var(--color-danger));
}
.dp__pointer {
  font-family: 'Inter', sans-serif!important;
}
</style>
