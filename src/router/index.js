import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import LoginPage from '../views/LoginPage.vue'
import AdminPage from '../views/AdminPage.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/AdminPage.vue')
      }
    ]
  },
  { path: '/login', component: LoginPage },
  { path: '/admin', component: AdminPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
