export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/',
    icon: 'cil-speedometer'
  },
  {
    component: 'CNavTitle',
    name: 'Users',
    hide: ['staff', 'customer']
  },
  {
    component: 'CNavGroup',
    name: 'User Management',
    to: '/users',
    icon: 'cil-user',
    items: [
      {
        component: 'CNavItem',
        name: 'User List',
        to: '/users'
      },
      {
        component: 'CNavItem',
        name: 'Add User',
        to: '/users/add'
      }
    ],
    hide: ['staff', 'customer']
  },
  {
    component: 'CNavTitle',
    name: 'Products'
  },
  {
    component: 'CNavGroup',
    name: 'Product Management',
    to: '/products',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'Product List',
        to: '/products'
      },
      {
        component: 'CNavItem',
        name: 'Add Product',
        to: '/products/add'
      }
    ]
  }
]
