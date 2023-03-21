import api from '@/plugins/api'

const CategoryService = {
  getList (params = {}) {
    const url = '/categories'
    return api.get(url, { params })
  }
}

export default CategoryService
