import api from '@/plugins/api'

const ProductService = {
  getList (params = {}) {
    const url = '/products'
    return api.get(url, { params })
  },
  getById (id, params = {}) {
    const url = `/products/${id}`
    return api.get(url, { params })
  },
  add (body = {}) {
    const url = '/products'
    return api.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  update (id, body = {}) {
    const url = `/products/${id}`
    return api.put(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default ProductService
