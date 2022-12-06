<template>
  <div :class="$style.root">
    <Modal :close-button-show="false">
      <div :class="$style.heading">
        Удалить запись о пробеге?
      </div>
      <div :class="$style.buttons">
        <Button state="danger-wide">
          Удалить
        </Button>
        <Button state="secondary-wide">
          Отменить
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import Modal from '@/components/core/modal/Modal.vue';
import Button from '@/components/core/button/Button.vue';
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  width: rem(300px);
  box-shadow: 0 rem(4px)rem(24px) rgba(41, 48, 77, 0.12);
  border-radius: rem(5px);
  font-family: 'Inter', sans-serif;
}
.heading {
  font-size: rem(16px);
  font-weight: 700;
  color: rgb(var(--color-deep-blue));
}
.buttons {
  margin-top: rem(16px);
  height: rem(88px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
