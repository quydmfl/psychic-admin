<template>
  <div>
    <CRow>
      <CCol :md="12" class="mb-3">
        <CCard>
          <CCardBody>
            <div class="row justify-content-md-end">
              <CCol :md="2">
                <CFormSelect v-model="filterOption.role" @change="filter">
                  <option value="">Filter</option>
                </CFormSelect>
              </CCol>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol :md="12">
        <CCard>
          <CCardBody>
            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell
                    v-for="col in columns"
                    :key="col.key"
                    scope="col"
                    >{{ col.label }}</CTableHeaderCell
                  >
                </CTableRow>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="row in items" :key="row.id">
                  <CTableHeaderCell scope="row">{{ row.id }}</CTableHeaderCell>
                  <CTableDataCell>{{ row.name }}</CTableDataCell>
                  <CTableDataCell>{{ row.category }}</CTableDataCell>
                  <CTableDataCell>{{ row.price }}</CTableDataCell>
                  <CTableDataCell>{{ row.staff }}</CTableDataCell>
                  <CTableDataCell>
                    <div class="text-end">
                      <!-- View detail -->
                      <div class="action-icon" @click="viewDetail(row)">
                        <CIcon icon="cil-search" />
                      </div>
                      <div class="action-icon" @click="updateProduct(row.id)">
                        <CIcon icon="cil-pencil" />
                      </div></div
                  ></CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CModal
      size="xl"
      alignment="center"
      :visible="showModal"
      @close="
        () => {
          showModal = false;
        }
      "
    >
      <CModalHeader> </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol :md="5">
            <CCard> </CCard>
          </CCol>
          <CCol :md="7">
            <CCard>
              <CCardBody> </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CModalBody>
    </CModal>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import ProductService from '@/services/ProductService'
import { useRouter } from 'vue-router'
import 'vue3-carousel/dist/carousel.css'

const router = useRouter()

const toast = inject('toast')
const loading = inject('loading')

const columns = [
  {
    key: 'id',
    label: '#',
    _props: { scope: 'col' }
  },
  {
    key: 'name',
    label: 'Name',
    _props: { scope: 'col' }
  },
  {
    key: 'category',
    label: 'Category',
    _props: { scope: 'col' }
  },
  {
    key: 'price',
    label: 'Price',
    _props: { scope: 'col' }
  },
  {
    key: 'staff',
    label: 'Staff',
    _props: { scope: 'col' }
  }
]
const items = ref([])
const products = ref([])
const filterOption = ref({
  role: ''
})
const showModal = ref(false)
const productDetail = ref(null)
// Methods
const viewDetail = (_product) => {
  productDetail.value = _product
  // showModal.value = true
  router.push({
    name: 'Product Detail',
    params: {
      id: _product.id
    }
  })
}
// Update product
const updateProduct = (id) => {
  router.push({
    name: 'Update Product',
    params: {
      id
    }
  })
}
// Get product list
const getProducts = async () => {
  try {
    loading.show()
    const { data } = await ProductService.getList()
    const _products = data.data.products
    products.value = _products.map((item) => ({
      ...item,
      staff: item.user.name,
      category: item.categories.map((e) => e.name).join(', '),
      price: formatPrice(item.price),
      images: JSON.parse(item.images)
    }))
    items.value = products.value
  } catch (error) {
    toast.error("Can't get user list")
  } finally {
    loading.hide()
  }
}
// Filter
const filter = async () => {
  loading.show()
  setTimeout(() => {
    if (filterOption.value.role) {
      items.value = products.value.filter(
        (item) => item.role === filterOption.value.role
      )
    } else {
      items.value = products.value
    }
    loading.hide()
  }, 1000)
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
// const getImageURL = (imageName) => {
//   const uploadURL =
//     import.meta.env.VITE_UPLOAD_URL || 'http://localhost:8000/public/uploads'
//   return uploadURL + '/' + imageName
// }

const init = async () => {
  await getProducts()
}

onMounted(async () => {
  await init()
})
</script>

<style lang="scss" scoped>
.action-icon {
  display: inline-block;
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin: 0 0.5rem;
}
</style>
