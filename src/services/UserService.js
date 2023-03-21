import api from '@/plugins/api'

const UserService = {
  getList (params = {}) {
    const url = '/users'
    return api.get(url, { params })
  },
  createUser (body = {}) {
    const url = '/users'
    return api.post(url, body)
  },
  updateUser (id, body = {}) {
    const url = `/users/${id}`
    return api.put(url, body)
  },
  getCurrentUser () {
    const url = '/users/me'
    return api.get(url)
  }
}

export default UserService
