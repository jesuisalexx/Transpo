<template>
  <div :class="$style.root">
    <div :class="$style.crumbs">
      <Breadcrumbs :items="breadcrumbs" />
    </div>
    <div :class="$style.textWrapper">
      <div :class="$style.text">
        {{ t('header.problem-or-offer') }}
      </div>
      <Button :label="t('header.contact-support')" state="primary-simple">
      </Button>
      <div :class="$style.select">
        <LanguageSelect :options="languageOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/core/button/Button.vue';
import Breadcrumbs from '@/components/core/breadcrumbs/Breadcrumbs.vue';
import LanguageSelect from '@/components/core/languageSelect/LanguageSelect.vue';
import { useI18n } from 'vue-i18n';
import {
  HeaderProps,
} from './index';

const { t } = useI18n();
const props = defineProps<HeaderProps>();
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  padding: rem(12px);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: rem(3px) solid rgb(var(--color-grey), 20%);
}

.textWrapper {
  display: flex;
  align-items: center;
}

.text {
  font-size: rem(12px);
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  margin-right: rem(4px);
}

.select {
  margin-left: rem(6px);
}
</style>
