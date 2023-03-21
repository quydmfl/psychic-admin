<template>
  <div>
    <CRow>
      <CCol :md="5">
        <CCard>
          <CCardBody>
            <!-- Product name -->
            <CFormInput
              class="mb-3"
              type="text"
              label="Product name"
              placeholder="Product name"
              v-model="formData.name"
            />
            <div
              class="errors"
              v-for="error of $v.name.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Category -->
            <CFormSelect
              class="mb-3"
              label="Category"
              v-model="formData.categoryId"
            >
              <option>Select category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </CFormSelect>
            <div
              class="errors"
              v-for="error of $v.categoryId.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Price -->
            <div class="form-label">Price</div>
            <PriceInput
              class="mb-3"
              placeholder="Product price"
              v-model="formData.price"
            />
            <div
              class="errors"
              v-for="error of $v.price.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Staff -->
            <CFormSelect class="mb-3" label="Staff" v-model="formData.staffId">
              <option>Select staff</option>
              <option v-for="staff in staffs" :key="staff.id" :value="staff.id">
                {{ staff.name }}
              </option>
            </CFormSelect>
            <div
              class="errors"
              v-for="error of $v.staffId.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <div>
              <div class="form-label">Description</div>
              <QuillEditor ref="editorRef" theme="snow" class="h-[500px]" />
            </div>
            <div
              class="errors"
              v-for="error of $v.description.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol :md="7">
        <CCard>
          <CCardBody>
            <!-- Product images-->
            <div class="mb-3">
              <div class="form-label mb-2">Product images</div>
              <!-- Uploader -->
              <ProductImageUploader v-model="images" />
              <!--<div class="mt-2">You need to add at least 4 images</div>-->
            </div>
            <CButton color="primary" @click="submit">Add Product</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ProductImageUploader from '@/components/uploader/ProductImageUploader.vue'
import UserService from '@/services/UserService'
import CategoryService from '@/services/CategoryService'
import ProductService from '@/services/ProductService'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import PriceInput from '@/components/forms/PriceInput.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const toast = inject('toast')
const loading = inject('loading')

const categories = ref([])
const staffs = ref([])
const editorRef = ref()
const formData = ref({
  name: '',
  description: '',
  price: '',
  categoryId: '',
  staffId: ''
})
const images = ref([])

const formRules = {
  name: { required: helpers.withMessage('Product name is required', required) },
  description: {
    required: helpers.withMessage('Description is required', required)
  },
  price: {
    required: helpers.withMessage('Price is required', required)
  },
  categoryId: {
    required: helpers.withMessage('Category is required', required)
  },
  staffId: {
    required: helpers.withMessage('Staff is required', required)
  }
}

const $v = useVuelidate(formRules, formData)

// Methods
// Submit
const submit = async () => {
  try {
    formData.value.description = editorRef.value.getHTML()
    const isValidated = await $v.value.$validate()
    if (!isValidated) {
      return
    }
    loading.show()

    const _formData = new FormData()
    images.value.forEach((item) => {
      _formData.append('images', item)
    })
    _formData.append('name', formData.value.name)
    _formData.append('price', formData.value.price)
    _formData.append('description', formData.value.description)
    _formData.append('categoryId', formData.value.categoryId)
    _formData.append('staffId', formData.value.staffId)
    await ProductService.add(_formData)
    toast.success('Add product successfully')
    router.push('/products')
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data.error) {
      error.response.data.error.forEach((e) => toast.error(e.message))
    } else {
      toast.error('Add product failed')
    }
  } finally {
    loading.hide()
  }
}
// Get category list
const getCategories = async () => {
  try {
    const { data } = await CategoryService.getList()
    categories.value = data.data.categories
  } catch (error) {
    toast.error("Can't get category list")
  }
}
// Get staff list
const getStaffs = async () => {
  try {
    const { data } = await UserService.getList()
    staffs.value = data.data.users
  } catch (error) {
    toast.error("Can't get staff list")
  }
}

const init = async () => {
  loading.show()
  await Promise.all([getCategories(), getStaffs()])
  loading.hide()
}

onMounted(async () => {
  await init()
})
</script>

<style lang="scss" scoped>
:deep(.ql-container .ql-editor) {
  min-height: 200px !important;
}

.errors {
  width: 100%;
  margin: 1rem 0;
  color: red;
}
</style>
