<template>
  <div>
    <CRow class="row justify-content-md-center">
      <CCol :md="8">
        <CCard>
          <CCardBody>
            <!-- User name -->
            <CFormInput
              class="mb-3"
              type="text"
              label="User name"
              placeholder="User name"
            />
            <!-- Email -->
            <CFormInput
              class="mb-3"
              type="text"
              label="Email"
              placeholder="Email"
            />
            <!-- Password -->
            <CFormInput
              class="mb-3"
              type="password"
              label="Password"
              placeholder="Password"
            />
            <!-- Confirm password -->
            <CFormInput
              class="mb-3"
              type="password"
              label="Confirm password"
              placeholder="Confirm password"
            />
            <!-- Roles -->
            <CFormSelect class="mb-3" label="Role">
              <option>Select role</option>
              <option v-for="role in roles" :key="role.name" :value="role.name">
                {{ role.displayName }}
              </option>
            </CFormSelect>
            <CButton color="primary" class="px-4" @click="submit">
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
import { required, email, helpers } from '@vuelidate/validators'

const ROLE_LIST = [
  {
    name: 'admin',
    displayName: 'Admin'
  },
  {
    name: 'manager',
    displayName: 'Manager'
  },
  {
    name: 'customer',
    displayName: 'Customer'
  },
  {
    name: 'staff',
    displayName: 'Staff'
  }
]

const api = inject('api')
const toast = inject('toast')
const loading = inject('loading')

const roles = ref(ROLE_LIST)

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: ''
})

const formRules = {
  name: { required: helpers.withMessage('Name is required', required) },
  email: {
    required: helpers.withMessage('Email is required', required),
    email
  },
  password: { required: helpers.withMessage('Password is required', required) },
  confirmPassword: {
    required: helpers.withMessage('Confirm password is required', required)
  },
  role: { required: helpers.withMessage('Role is required', required) }
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

    const { data } = await api.post('/auth/login', {
      email: formData.value.email,
      password: formData.value.password
    })
    console.log(data)
  } catch (error) {
    if (error.response && error.response.data.error) {
      error.response.data.error.forEach((e) => toast.error(e.message))
    } else {
      toast.error('Add user failed')
    }
  } finally {
    loading.hide()
  }
}
</script>

<style lang="scss" scoped></style>
