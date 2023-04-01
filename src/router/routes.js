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
        path: '/organizations',
        name: 'Organization List',
        component: () => import('@/views/users/ListPage.vue')
      },
      {
        path: '/organizations/add',
        name: 'Add Organization',
        component: () => import('@/views/organizations/CreatePage.vue')
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
        path: '/users/update/:id',
        name: 'Update User',
        component: () => import('@/views/users/CreateOrUpdatePage.vue')
      },
      {
        path: '/products',
        name: 'Product List',
        component: () => import('@/views/products/ListPage.vue')
      },
      {
        path: '/products/add',
        name: 'Add Product',
        component: () => import('@/views/products/CreateOrUpdatePage.vue')
      },
      {
        path: '/products/update/:id',
        name: 'Update Product',
        component: () => import('@/views/products/CreateOrUpdatePage.vue')
      },
      {
        path: '/products/:id',
        name: 'Product Detail',
        component: () => import('@/views/products/DetailPage.vue')
      }
    ]
  },
  { path: '/login', name: 'login', component: LoginPage },
  {
    path: '/error/404',
    name: 'Not Found',
    component: () => import('@/views/NotFoundPage.vue')
  }
]

export default routes
