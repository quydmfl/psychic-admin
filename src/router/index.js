import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from '@/store/user'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const whiteList = ['login', 'Not Found']
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.name)) {
    next()
  } else {
    const userStore = useUserStore()
    if (userStore.isAuthenticated) {
      if (!userStore.role) {
        userStore.setUserInfo()
      }
      return next()
    } else {
      router.push('/login')
    }
  }
})

export default router
