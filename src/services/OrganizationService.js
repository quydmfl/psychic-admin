import api from '@/plugins/api'

const OrganizationService = {
  getList (params = {}) {
    const url = '/organizations'
    return api.get(url, { params })
  },
  add (body = {}) {
    const url = '/organizations'
    return api.post(url, body)
  }
}

export default OrganizationService
