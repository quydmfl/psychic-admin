import api from '@/plugins/api'

const RoleService = {
  getList (params = {}) {
    const url = '/roles'
    return api.get(url, { params })
  }
}

export default RoleService
