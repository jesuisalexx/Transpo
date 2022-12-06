<template>
  {{
    t('pagination', {
      from: ((page - 1) * perPage) + 1,
      to: (page * perPage),
      total: total
    })
  }}
</template>

<script setup lang="ts">
import { ElementsCounterProps } from '@/components/core/elementsCount/index';
import { useI18n } from 'vue-i18n';

defineProps<ElementsCounterProps>();

const { t } = useI18n();
</script>
