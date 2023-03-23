<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      v-bind="$attrs"
      v-maska="boundObject"
      data-maska="###,###,###,###,###"
      data-maska-reversed
      v-model="maskedValue"
      @maska="onMaska"
    />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { vMaska } from 'maska'

// Props
const props = defineProps({
  modelValue: { type: String, default: '' }
})

// Emit
const emit = defineEmits(['update:modelValue'])

const maskedValue = ref()
const boundObject = ref({})

const onMaska = () => {
  emit('update:modelValue', boundObject.value.unmasked)
}

watchEffect(() => {
  maskedValue.value = props.modelValue
})
</script>
