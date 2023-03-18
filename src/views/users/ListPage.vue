<template>
  <div>
    <CRow>
      <CCol :md="12" class="mb-3">
        <CCard>
          <CCardBody>
            <div class="row justify-content-md-end">
              <CCol :md="2">
                <CFormSelect v-model="filterOption.role" @change="filter">
                  <option value="">Filter by role</option>
                  <option
                    v-for="role in roles"
                    :key="role.name"
                    :value="role.name"
                  >
                    {{ role.displayName }}
                  </option>
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
            <CTable :columns="columns" :items="items" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import UserService from '@/services/UserService'

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

const toast = inject('toast')
const loading = inject('loading')

const roles = ref(ROLE_LIST)
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
    key: 'email',
    label: 'Email',
    _props: { scope: 'col' }
  },
  {
    key: 'role',
    label: 'Role',
    _props: { scope: 'col' }
  }
]
const items = ref([])
const users = ref([])
const filterOption = ref({
  role: ''
})
// Methods
// Get user list
const getUsers = async () => {
  try {
    loading.show()
    const { data } = await UserService.getUsers()
    const _users = data.data.users
    users.value = _users.map((e) => e)
    items.value = users.value
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
      items.value = users.value.filter(
        (item) => item.role === filterOption.value.role
      )
    } else {
      items.value = users.value
    }
    loading.hide()
  }, 1000)
}
const init = async () => {
  await getUsers()
}

onMounted(async () => {
  await init()
})
</script>

<style lang="scss" scoped></style>
