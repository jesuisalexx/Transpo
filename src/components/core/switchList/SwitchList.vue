<template>
  <div :class="$style.root">
    <div :class="$style.trigger">
      <Button
        icon-before="close"
        @click="toggle"
      >
        trigger
      </Button>
    </div>
    <div
      v-if="isOpen"
      :class="$style.list"
    >
      <div
        v-for="item in items"
        :key="item"
        :class="$style.item"
      >
        <Switch
          type="secondary"
          :label="item.label"
          :model-value="localValue[item.value]"
          @update:modelValue="localValue[item.value] = $event"
        />
      </div>
      <div :class="$style.buttons">
        <Button
          state="primary-wide"
          @click="allSwitchesChange(true)"
        >
          Показать все
        </Button>
        <Button
          state="secondary-wide"
          @click="allSwitchesChange(false)"
        >
          Скрыть все
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/core/button/Button.vue';
import Switch from '@/components/core/switch/Switch.vue';
import { computed, ref, watch } from 'vue';

const isOpen = ref(true);

const toggle = () => isOpen.value = !isOpen.value;

const props = defineProps<{
  items: [],
  modelValue: {},
}>();
const emit = defineEmits([
  'update:modelValue',
]);
const localValue = computed({
  get: () => props.modelValue,
  set: (value: object) => {
    emit('update:modelValue', value);
    console.log(localValue.value);
  },
});
const allSwitchesChange = (val: boolean) => {
  props.items.forEach((item) => { localValue.value[item.value] = val; });
};
watch(localValue.value, () => {
  emit('update:modelValue', localValue.value);
});
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  position: relative;
}
.list {
  position: absolute;
  top: rem(48px);
  left: 0;
  box-shadow: 0 rem(4px) rem(24px) rgba(41, 48, 77, 0.12);
  padding: rem(16px);
  border-radius: rem(5px);
  width: rem(300px);
}
.item {
  padding: rem(8px) 0;
}
.buttons {
  margin-top: rem(24px);
  height: rem(88px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
