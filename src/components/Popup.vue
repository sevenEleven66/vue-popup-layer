<template>
  <div
    v-show="visible"
    class="popup-box"
    :style="{
      zIndex: autoIndex ? getMaxZIndex() : zIndex,
      transition: 'transform 0.3s',
      transform: visible ? 'translateX(0)' : 'translateX(101%)',
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { usePopup } from '@/composables/usePopup'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  animation: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 1000,
  },
  autoIndex: {
    type: Boolean,
  },
  getNode: {
    type: [Function, String],
    default: '',
  },
  extra: {
    type: Object,
    default: () => ({}),
  },
  isAsync: Boolean,
})

const {
  getMaxZIndex,
  show,
  hide,
  closePopup,
  backLvBy,
  isSynced,
  id,
} = usePopup(props)

defineExpose({
  show,
  hide,
  closePopup,
  backLvBy,
  isSynced,
  id,
})
</script>

<style scoped>
.popup-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  backface-visibility: hidden;
  background-color: #fff;
}
</style>