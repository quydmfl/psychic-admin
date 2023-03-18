import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'
import jwtDecode from 'jwt-decode'

export const useUserStore = defineStore('user', {
  state: () => ({
    email: ''
  }),
  getters: {
    currentToken: (state) => {
      if (VueCookies.isKey('token')) {
        return VueCookies.get('token')
      } else {
        return ''
      }
    },
    isAuthenticated: (state) => {
      return VueCookies.isKey('token')
    }
  },
  actions: {
    setToken (_token) {
      const decodedJwt = jwtDecode(_token)
      const expiredTime = decodedJwt.exp - decodedJwt.iat
      VueCookies.set('token', _token, `${expiredTime}s`)
    },
    logout () {
      VueCookies.remove('token')
    }
  }
})
