<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard>
          <CCardBody>
            <CRow>
              <CCol :md="5">
                <div
                  class="slider-container"
                  v-if="product.images && product.images.length"
                >
                  <vueper-slides fixed-height="400px">
                    <vueper-slide
                      v-for="img in product.images"
                      :key="img.originalName"
                      :image="getImageURL(img.fileName)"
                    >
                    </vueper-slide>
                  </vueper-slides>
                </div>
              </CCol>
              <CCol :md="7">
                <h3 class="mb-5">{{ product.name }}</h3>
                <h5>Price: {{ formatPrice(product.price) }}</h5>
                <h5>Status: {{ product.status }}</h5>
              </CCol>
            </CRow>
            <CRow>
              <h6 class="my-3">Descriptions</h6>
              <div v-html="product.description"></div>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import ProductService from '@/services/ProductService'
import { useRouter, useRoute } from 'vue-router'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

const router = useRouter()
const route = useRoute()

const toast = inject('toast')
const loading = inject('loading')

const product = ref({})

// Get product list
const getProduct = async (id) => {
  try {
    loading.show()
    const { data } = await ProductService.getById(id)
    product.value = data.data.product
    product.value.images = JSON.parse(product.value.images)
  } catch (error) {
    toast.error("Can't get product detail")
  } finally {
    loading.hide()
  }
}

// Format price
const formatPrice = (value) => {
  if (typeof value !== 'number') {
    return ''
  }
  const numberFormat = new Intl.NumberFormat('en-US')
  return numberFormat.format(value)
}

// Get image url
const getImageURL = (imageName) => {
  const uploadURL =
    import.meta.env.VITE_UPLOAD_URL || 'http://localhost:8000/public/uploads'
  return uploadURL + '/' + imageName
}

const init = async () => {
  const productId = route.params.id
  await getProduct(productId)
  if (!product.value) {
    router.push({ name: 'Not Found' })
  }
}

onMounted(async () => {
  await init()
})
</script>

<style lang="scss" scoped>
.slider-container {
  height: 400px;
}
</style>
