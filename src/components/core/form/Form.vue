<template>
  <form
    ref="form"
    :class="$style.form"
    @submit.prevent="handleSubmit"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
import {
  ref,
  VueElement,
  defineProps,
} from 'vue';
import { useForm } from '@/hooks/useForm';
import { DefaultFormKey, FormProps, touchTrigger } from './index';

const form = ref<VueElement | null>(null);

const props = withDefaults(
  defineProps<FormProps>(),
  {
    permanent: true,
    touchBy: 'blur' as touchTrigger.BLUR,
    submitOnEnter: false,
    formKey: 'default' as DefaultFormKey,
  },
);

const emit = defineEmits(['update:modelValue', 'submit', 'validate']);

const {
  handleSubmit,
  reset,
  validate,
} = useForm(props, emit, form);

defineExpose({
  reset,
  handleSubmit,
  validate,
});
</script>

<style lang="scss" module>
.form {}
</style>
