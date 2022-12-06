<template>
  <div
    :class="$style.root"
  >
    <div
      :class="{
        [$style.dropzone]: true,
        [$style.dropzoneActive]: isActive,
      }"
      @dragenter.prevent="makeActive"
      @dragover.prevent
      @dragleave.prevent="makeUnactive"
      @drop.prevent="drop"
    >
      <div :class="$style.text">
        {{ t('filepicker.add-photo') }}
      </div>
      <div :class="$style.uploadWrap">
        <Button state="secondary">
          {{ t('filepicker.download') }}
        </Button>
        <input
          type="file"
          :class="$style.fileUpload"
          @change="uploadFile"
        >
      </div>
    </div>
    <div :class="$style.pictures">
      <div
        v-for="(pic, index) in preview"
        :key="index"
        :class="$style.pictureWrapper"
      >
        <div
          :class="{
            [$style.deletePicture]: true
          }"
          @click="removeImg(index)"
        >
          x
        </div>
        <img
          v-if="pic"
          :src="pic"
          :class="$style.picture"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/core/button/Button.vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  modelValue: [],
}>();
const { t } = useI18n();

const emit = defineEmits([
  'update:modelValue',
]);

const localValue = computed({
  get: () => props.modelValue,
  set: (value: []) => emit('update:modelValue', value),
});
const isActive = ref(false);
const makeActive = () => {
  isActive.value = true;
};
const makeUnactive = () => {
  isActive.value = false;
};
const file = ref('');
const preview = ref([]);
const link = ref('');
const drop = (e: any) => {
  file.value = e.dataTransfer.files[0];
  isActive.value = false;
  link.value = URL.createObjectURL(file.value);
  preview.value.push(link.value);
  localValue.value = file.value;
  console.log(file.value);
};
const uploadFile = (e: any) => {
  file.value = e.target.files[0];
  isActive.value = false;
  link.value = URL.createObjectURL(file.value);
  preview.value.push(link.value);
  localValue.value = file.value;
};
const removeImg = (id: any) => {
  preview.value.splice(id, 1);
};
</script>

<style lang="scss" module>
@import "src/assets/styles/utils";

.root {
  width: 100%;
  height: 100%;
  font-family: 'Inter', sans-serif;
}

.dropzone {
  padding: rem(50px);
  margin-top: rem(10px);
  width: 100%;
  height: 100%;
  border: rem(2px)dashed rgb(var(--color-light-blue-3));
  border-radius: rem(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.uploadWrap {
  width: rem(30px);
  height: rem(30px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 3;
}

.fileUpload {
  opacity: 0;
  position: absolute;
  width: rem(120px);
  height: rem(37px);
  z-index: 4;
}

.uploadPic {
  width: rem(20px);
  height: rem(20px);
  position: absolute;
}

.dropzoneText {
  display: flex;
}

.dropzoneActive {
  border: rem(2px) solid rgb(var(--color-light-blue-3));
}

.text {
  font-size: rem(13px);
  font-weight: 700;
  color: rgb(var(--color-deep-blue));
  text-align: center;
  margin-bottom: rem(20px);
  text-transform: uppercase;
}
.pictures {
  margin-top: rem(20px);
  display: flex;
  overflow: hidden;
}
.pictureWrapper {
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: rem(15px);
  overflow: hidden;
}
.picture {
  width: 100%;
  height: 100%;
}
.deletePicture {
  color: darkred;
  text-transform: uppercase;
  font-weight: bold;
  position: absolute;
  top: rem(10px);
  right: rem(10px);
  cursor: pointer;
}
</style>
