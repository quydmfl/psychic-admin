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
              v-model="formData.name"
            />
            <div
              class="errors"
              v-for="error of $v.name.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Email -->
            <CFormInput
              class="mb-3"
              type="text"
              label="Email"
              placeholder="Email"
              v-model="formData.email"
            />
            <div
              class="errors"
              v-for="error of $v.email.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Password -->
            <CFormInput
              class="mb-3"
              type="password"
              label="Password"
              placeholder="Password"
              v-model="formData.password"
            />
            <div
              class="errors"
              v-for="error of $v.password.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Confirm password -->
            <CFormInput
              class="mb-3"
              type="password"
              label="Confirm password"
              placeholder="Confirm password"
              v-model="formData.confirmPassword"
            />
            <div
              class="errors"
              v-for="error of $v.confirmPassword.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Roles -->
            <CFormSelect v-model="formData.role" class="mb-3" label="Role">
              <option value="">Select role</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.display_name }}
              </option>
            </CFormSelect>
            <div
              class="errors"
              v-for="error of $v.role.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <!-- Organization -->
            <CFormSelect
              v-model="formData.organizationId"
              class="mb-3"
              label="Organization"
            >
              <option value="">Select organization</option>
              <option
                v-for="org in organizations"
                :key="org.id"
                :value="org.id"
              >
                {{ org.name }}
              </option>
            </CFormSelect>
            <div
              class="errors"
              v-for="error of $v.organizationId.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
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
import { ref, inject, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useRoute, useRouter } from 'vue-router'
import {
  required,
  email,
  minLength,
  maxLength,
  helpers
} from '@vuelidate/validators'
import UserService from '@/services/UserService'
import RoleService from '@/services/RoleService'
import OrganizationService from '@/services/OrganizationService'

const route = useRoute()
const router = useRouter()

const toast = inject('toast')
const loading = inject('loading')

const user = ref({})
const organizations = ref([])
const roles = ref([])

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: null,
  organizationId: ''
})

const formRules = {
  name: { required: helpers.withMessage('User name is required', required) },
  email: {
    required: helpers.withMessage('Email is required', required),
    email
  },
  password: {
    required: helpers.withMessage('Password is required', required),
    minLength: helpers.withMessage(
      'Password must be more than 8 characters',
      minLength(8)
    ),
    maxLength: helpers.withMessage(
      'Password must be less than 32 characters',
      maxLength(32)
    )
  },
  confirmPassword: {
    required: helpers.withMessage('Confirm password is required', required),
    sameAsPassword: helpers.withMessage(
      'Confirm password must be equal to password',
      (value) => {
        return value ? formData.value.password === value : true
      }
    )
  },
  role: { required: helpers.withMessage('Role is required', required) },
  organizationId: {
    required: helpers.withMessage('Organization is required', required)
  }
}

const $v = useVuelidate(formRules, formData)
// Methods
// Get organization list
const getOrganizations = async () => {
  try {
    const { data } = await OrganizationService.getList()
    organizations.value = data.data.organizations
  } catch (error) {
    toast.error("Can't get role list")
  }
}
// Get role list
const getRoles = async () => {
  try {
    const { data } = await RoleService.getList()
    roles.value = data.data.roles
  } catch (error) {
    toast.error("Can't get role list")
  }
}
// Get user
const getUser = async (id) => {
  try {
    const { data } = await UserService.getById(id)
    user.value = data.data.user
  } catch (error) {
    toast.error("Can't get user")
  }
}
// Submit
const submit = async () => {
  try {
    const isValidated = await $v.value.$validate()
    if (!isValidated) {
      return
    }
    loading.show()

    await UserService.createUser({
      ...formData.value,
      role: Number(formData.value.role),
      organization: Number(formData.value.organizationId),
      passwordConfirm: formData.value.confirmPassword
    })
    toast.success('Add user successfully')
    router.push('/users')
  } catch (error) {
    if (error.response && error.response.data.error) {
      error.response.data.error.forEach((e) => toast.error(e.message))
    } else if (
      error.response &&
      error.response.data.message === 'Validation error'
    ) {
      toast.error('Email already exists')
    } else {
      toast.error('Add user failed')
    }
  } finally {
    loading.hide()
  }
}

const init = async () => {
  loading.show()
  const userId = route.params.id
  if (userId) {
    await getUser(userId)
    if (!user.value) {
      router.push({ name: 'Not Found' })
      return
    }
    formData.value = {
      name: user.value.name,
      email: user.value.email,
      role: user.value.role,
      organizationId: user.value.organizationId
    }
  }

  await Promise.all([getRoles(), getOrganizations()])
  loading.hide()
}

onMounted(async () => {
  await init()
})
</script>

<style lang="scss" scoped>
.errors {
  width: 100%;
  margin: 1rem 0;
  color: red;
}
</style>
