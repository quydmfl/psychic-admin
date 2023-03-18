export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer'
  },
  {
    component: 'CNavTitle',
    name: 'Users',
    hide: ['staff']
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
    hide: ['staff']
  },
  {
    component: 'CNavTitle',
    name: 'Products'
  },
  {
    component: 'CNavGroup',
    name: 'Pages',
    to: '/pages',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'Login',
        to: '/pages/login'
      },
      {
        component: 'CNavItem',
        name: 'Register',
        to: '/pages/register'
      },
      {
        component: 'CNavItem',
        name: 'Error 404',
        to: '/pages/404'
      },
      {
        component: 'CNavItem',
        name: 'Error 500',
        to: '/pages/500'
      }
    ]
  }
]
