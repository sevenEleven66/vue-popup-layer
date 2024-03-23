<!--
 * @Author: Seven
 * @Date: 2024-03-22 17:01:28
 * @LastEditTime: 2024-03-23 17:43:07
 * @LastEditors: Seven
 * @Description: 
-->
<template>
  <transition name="popup">
    <div v-show="visible" class="popup-box" :style="{ zIndex: autoIndex ? getMaxZIndex() : zIndex }">
      <slot></slot>
    </div>
  </transition>
 
</template>

<script setup lang="ts">
import { usePopup } from '@/composables/usePopup'

const emit = defineEmits(['onClose', 'update:visible', 'onOpen'])

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
  openPopup,
  closePopup,
  backLvBy,
  isSynced,
  id,
} = usePopup(props, emit)

defineExpose({
  show,
  hide,
  closePopup,
  backLvBy,
  isSynced,
  id,
  openPopup
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
.popup-enter-active,
.popup-leave-active {
  transition: transform 0.3s;
}

.popup-enter-from {
  transform: translateX(101%);
}

.popup-leave-to {
  transform: translateX(101%);
}
</style>