<template>
  <div class="uploader">
    <input
      ref="uploaderRef"
      id="product-uploader"
      name="uploader"
      type="file"
      multiple
      @change="onChange"
      accept="image/png, image/jpeg"
    />
    <div class="uploader__wrapper">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="uploader__preview"
      >
        <img
          class="w-full"
          :src="getImageURL(img.file)"
          @click="() => (img.isZoom = true)"
        />
        <!-- Remove button -->
        <div class="remove-btn" @click="removeImage(index)">
          <CIcon icon="cil-trash" size="sm" />
        </div>
        <!-- Lightbox -->
        <vue-easy-lightbox
          :visible="img.isZoom"
          :imgs="getImageURL(img.file)"
          @hide="img.isZoom = false"
        />
      </div>
      <label class="uploader__label" for="product-uploader"
        >Click to browse images</label
      >
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

// Props
// const props = defineProps({
//   modelValue: { type: Array, default: () => [] }
// })

// Emit
const emit = defineEmits(['update:modelValue'])

const uploaderRef = ref()
const images = ref([])
// On input change
const onChange = (e) => {
  for (const file of e.target.files) {
    images.value.push({ file, isZoom: false })
  }
  uploaderRef.value.value = null
}
// Get image URL
const getImageURL = (file) => {
  return file ? URL.createObjectURL(file) : ''
}
// Remove image
const removeImage = (index) => {
  images.value.splice(index, 1)
}

watch(images.value, () => {
  emit(
    'update:modelValue',
    images.value.map((item) => item.file)
  )
})
</script>
<style lang="scss" scoped>
.uploader {
  .uploader__wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .uploader__label {
      margin: 5px;
      width: 200px;
      height: 200px;
      border: dashed 2px #ababab;
      color: #ababab;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      font-size: 0.8rem;
      cursor: pointer;
    }

    .uploader__preview {
      margin: 5px;
      width: 200px;
      height: 200px;
      border: solid 2px #cbcbcb;
      border-radius: 5px;
      cursor: pointer;
      position: relative;

      img {
        height: 200px;
        width: 200px;
        object-fit: contain;
      }

      .remove-btn {
        position: absolute;
        right: 5px;
        bottom: 5px;
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        opacity: 0.6;
      }

      &:hover {
        .remove-btn {
          opacity: 1;
          box-shadow: -3px 3px 12px 0px rgba(0, 0, 0, 0.4);
          -webkit-box-shadow: -3px 3px 12px 0px rgba(0, 0, 0, 0.4);
          -moz-box-shadow: -3px 3px 12px 0px rgba(0, 0, 0, 0.4);
        }
      }
    }
  }

  input {
    display: none;
    visibility: hidden;
  }
}
</style>
