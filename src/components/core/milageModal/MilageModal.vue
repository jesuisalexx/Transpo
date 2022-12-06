<template>
  <div :class="$style.root">
    <Modal>
      <div :class="$style.heading">
        Добавить пробег
      </div>
      <div :class="$style.subHeading">
        Выберите дату измерения
      </div>
      <Datepicker
        inline="true"
        :class="$style.calendar"
        :enable-time-picker="false"
        :auto-apply="true"
      />
      <Input
        :class="$style.input"
        placeholder="Введите значение"
      />
      <div :class="$style.buttons">
        <Button state="primary-wide">
          сохранить
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
import Datepicker from '@/components/core/datepicker/Datepicker.vue';
import Input from '@/components/core/input/Input.vue';
import Button from '@/components/core/button/Button.vue';
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  width: rem(300px);
  box-shadow: 0 rem(4px)rem(24px) rgba(41, 48, 77, 0.12);
  border-radius: rem(5px);
}
.heading {
  font-size: rem(24px);
  font-weight: 700;
  color: rgb(var(--color-deep-blue));
}
.subHeading {
  font-size: rem(14px);
  font-weight: 700;
  margin-top: rem(19px);
  color: rgb(var(--color-deep-blue));
  text-transform: uppercase;
}
.calendar {
  margin-top: rem(10px);
}
.input {
  margin-top: rem(16px);
}
.buttons {
  margin-top: rem(16px);
  height: rem(88px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
