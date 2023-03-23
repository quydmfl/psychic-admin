<template>
  <div>
    <CRow class="row justify-content-md-center">
      <CCol :md="8">
        <CCard>
          <CCardBody>
            <!-- Name -->
            <CFormInput
              class="mb-3"
              type="text"
              label="Name"
              placeholder="Name"
              v-model="formData.name"
            />
            <div
              class="errors"
              v-for="error of $v.name.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Address -->
            <CFormInput
              class="mb-3"
              type="text"
              label="Address"
              placeholder="Address"
              v-model="formData.address"
            />
            <div
              class="errors"
              v-for="error of $v.address.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Description -->
            <CFormTextarea
              class="mb-3"
              label="Description"
              rows="3"
              v-model="formData.description"
            />
            <div
              class="errors"
              v-for="error of $v.description.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <CButton color="primary" class="px-4 mt-3" @click="submit">
              Add
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import OrganizationService from '@/services/OrganizationService'

const toast = inject('toast')
const loading = inject('loading')

const formData = ref({
  name: '',
  address: '',
  description: ''
})

const formRules = {
  name: { required: helpers.withMessage('User name is required', required) },
  address: { required: helpers.withMessage('Address is required', required) },
  description: {
    required: helpers.withMessage('Description is required', required)
  }
}

const $v = useVuelidate(formRules, formData)
// Methods
// Submit
const submit = async () => {
  try {
    const isValidated = await $v.value.$validate()
    if (!isValidated) {
      return
    }
    loading.show()

    await OrganizationService.add(formData.value)
    toast.success('Add organization successfully')
  } catch (error) {
    if (error.response && error.response.data.error) {
      error.response.data.error.forEach((e) => toast.error(e.message))
    } else {
      toast.error('Add organization failed')
    }
  } finally {
    loading.hide()
  }
}
</script>

<style lang="scss" scoped>
.errors {
  width: 100%;
  margin: 1rem 0;
  color: red;
}
</style>
