import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from '@/store/user'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const whiteList = ['login']
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.name)) {
    next()
  } else {
    const tokenStore = useUserStore()
    if (tokenStore.isAuthenticated) {
      next()
    } else {
      router.push('/login')
    }
  }
})

export default router
