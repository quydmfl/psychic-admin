import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/store/user'

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
})
// api.defaults.withCredentials = true
// Request
api.interceptors.request.use((request) => {
  const userStore = useUserStore()
  const token = userStore.currentToken
  if (token && !request.url.includes('login')) {
    request.headers.Authorization = 'Bearer ' + token
  }
  return request
})
// Response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      error.response?.status === 419
    ) {
      const userStore = useUserStore()
      userStore.logout()
      router.push('/login')
      return
    }
    return Promise.reject(error)
  }
)
export default api
