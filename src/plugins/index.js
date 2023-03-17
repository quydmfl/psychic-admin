import api from './api'
import Vue3Toasity, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useLoading } from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

export default {
  install: (app, options) => {
    // Toast
    app.use(Vue3Toasity, {
      autoClose: 3000,
      limit: 3,
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true
    })

    app.provide('api', api)
    app.provide('toast', toast)
    app.provide(
      'loading',
      useLoading({
        color: '#5400d9',
        loader: 'dots',
        width: 70,
        height: 70
      })
    )
  }
}
