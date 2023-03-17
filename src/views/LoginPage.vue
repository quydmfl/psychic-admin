<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <!-- Email -->
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autocomplete="email"
                      v-model="loginFormData.email"
                    />
                  </CInputGroup>
                  <div
                    class="input-errors"
                    v-for="error of $v.email.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                  <!-- Password -->
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="loginFormData.password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" @click="submit">
                        Login
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const api = inject('api')
const toast = inject('toast')
const cookies = inject('$cookies')
console.log(cookies)

const loginFormData = ref({
  email: '',
  password: ''
})

const loginFormRules = {
  email: { required, email },
  password: { required }
}

const $v = useVuelidate(loginFormRules, loginFormData)

const submit = async () => {
  try {
    const isValidated = await $v.value.$validate()
    if (!isValidated) {
      return
    }

    const { data } = await api.post('/auth/login', {
      email: loginFormData.value.email,
      password: loginFormData.value.password
    })
    userStore.setToken(data.access_token)
  } catch (error) {
    if (error.response && error.response.data.error) {
      error.response.data.error.forEach((e) => toast.error(e.message))
    } else {
      toast.error('Login failed')
    }
  }
}
</script>
