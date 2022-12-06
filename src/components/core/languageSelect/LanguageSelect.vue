<template>
  <div :class="$style.root">
    <div
      :class="$style.select"
      @click="toggle"
    >
      <Icon
        :size="19"
        :class="$style.icon"
        :icon="currentItem.icon"
      />
      <div :class="$style.text">
        {{ currentItem.label }}
      </div>
      <Icon
        :class="{
          [$style.arrow]: true,
          [$style.arrowActive]: isOpen,
        }"
        icon="arrow-down-small"
      />
    </div>
    <div
      v-if="isOpen"
      :class="$style.dropdown"
    >
      <div
        v-for="option in computedOptions"
        :key="option"
        :class="$style.item"
        @click="setItem(option)"
      >
        <Icon
          :size="19"
          :class="$style.icon"
          :icon="option.icon"
        />
        <div :class="$style.text">
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from '@/components/core/icon/Icon.vue';
import { computed, ref } from 'vue';
import { LanguageSelectProps } from '@/components/core/languageSelect/index';

const props = defineProps<LanguageSelectProps>();
const isOpen = ref(false);
const currentItem = ref(props.options[0]);
const computedOptions = computed(
  () => props.options.filter((option) => option.value !== currentItem.value.value),
);
const toggle = () => {
  isOpen.value = !isOpen.value;
};
const setItem = (item: any) => {
  currentItem.value = item;
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  position: relative;
}

.select {
  display: flex;
  cursor: pointer;
  align-items: center;
  height: rem(20px);
}

.arrow {
  width: rem(16px);
  height: rem(16px);
  margin-left: rem(5px);
}

.arrowActive {
  transform: rotate(180deg);
  margin-top: rem(2px);
}

.text {
  text-transform: uppercase;
  color: rgb(var(--color-deep-blue));
  margin-left: rem(5px);
}

.dropdown {
  top: rem(30px);
  position: absolute;
  left: 0;
  z-index: 10;
  box-shadow: 0 rem(4px)rem(24px) rgba(41, 48, 77, 0.12);
  border-radius: rem(5px);
  overflow: hidden;
}

.item {
  width: 100%;
  padding: 0 rem(10px);
  height: rem(27px);
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: rgb(var(--color-white));
  &:hover {
    background-color: rgb(var(--color-background-hover));
  }  content: "";
}
</style>
