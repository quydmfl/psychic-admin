import DefaultLayout from '../layouts/DefaultLayout.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/AdminPage.vue')
      },
      {
        path: '/users',
        name: 'User List',
        component: () => import('@/views/users/ListPage.vue')
      },
      {
        path: '/users/add',
        name: 'Add User',
        component: () => import('@/views/users/CreatePage.vue')
      },
      {
        path: '/products',
        name: 'Product List',
        component: () => import('@/views/products/ListPage.vue')
      },
      {
        path: '/products/add',
        name: 'Add Product',
        component: () => import('@/views/products/CreatePage.vue')
      }
    ]
  },
  { path: '/login', name: 'login', component: LoginPage }
]

export default routes
