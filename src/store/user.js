import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'
import jwtDecode from 'jwt-decode'
import UserService from '@/services/UserService'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    role: '',
    token: ''
  }),
  getters: {
    currentToken: (state) => {
      if (state.token) {
        return state.token
      } else if (VueCookies.isKey('token')) {
        return VueCookies.get('token')
      } else {
        return ''
      }
    },
    isAuthenticated: (state) => {
      return state.token || VueCookies.isKey('token')
    }
  },
  actions: {
    setToken (_token) {
      this.token = _token
      const decodedJwt = jwtDecode(_token)
      const expiredTime = decodedJwt.exp - decodedJwt.iat
      VueCookies.set('token', _token, `${expiredTime}s`)
    },
    async setUserInfo () {
      try {
        const { data } = await UserService.getCurrentUser()
        const user = data.data.user
        if (user) {
          this.name = user.name
          this.email = user.email
          this.role = user.role
        }
      } catch (error) {}
    },
    logout () {
      this.token = ''
      VueCookies.remove('token')
    }
  }
})
