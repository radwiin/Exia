const menus = [
  {
    id: '98',
    pId: 'root',
    sort: 1,
    path: '/standard/authentication',
    component: 'Layout',
    meta: { title: 'Authentication', icon: 'bx-pie-chart-alt', alwaysShow: true, group: 'standard' },
    children: [
      {
        id: '98-1',
        pId: '98',
        sort: 1,
        path: '/forgot-password',
        meta: { title: 'Forgot Password', icon: 'bx-hash', link: true }
      }
    ]
  },
  {
    id: '99',
    pId: 'root',
    sort: 1,
    path: '/standard/miscellaneous',
    component: 'Layout',
    meta: { title: 'Miscellaneous', icon: 'bx-coffee', alwaysShow: true, group: 'standard' },
    children: [
      {
        id: '99-1',
        pId: '99',
        sort: 1,
        path: '/401',
        meta: { title: 'Not Authorized', icon: 'bx-hash', link: true }
      },
      {
        id: '99-2',
        pId: '99',
        sort: 1,
        path: '/404',
        meta: { title: 'Not Found', icon: 'bx-hash', link: true }
      },
      {
        id: '99-3',
        pId: '99',
        sort: 1,
        path: '/500',
        meta: { title: 'Server Error', icon: 'bx-hash', link: true }
      },
      {
        id: '99-4',
        pId: '99',
        sort: 1,
        path: '/maintenance',
        meta: { title: 'Maintenance', icon: 'bx-hash', link: true }
      },
      {
        id: '99-5',
        pId: '99',
        sort: 1,
        path: '/coming-soon',
        meta: { title: 'Coming Soon', icon: 'bx-hash', link: true }
      }
    ]
  },
  {
    id: '100',
    pId: 'root',
    sort: 1,
    path: '/rbac/auth',
    component: 'Layout',
    redirect: '/rbac/auth/role',
    meta: { title: 'Auth', icon: 'bx-lock', alwaysShow: true, group: 'RBAC' },
    children: [
      {
        id: '100-1',
        pId: '100',
        sort: 1,
        name: 'role',
        path: '/rbac/auth/role',
        component: '/rbac/auth/role',
        meta: { title: 'Role', icon: 'bx-hash' }
      }
    ]
  },
  {
    id: '101',
    pId: 'root',
    sort: 1,
    path: '/rbac/system',
    component: 'Layout',
    redirect: '/rbac/system/menu',
    meta: { title: 'System', icon: 'bx-cog', alwaysShow: true, group: 'RBAC' },
    children: [
      {
        id: '101-1',
        pId: '101',
        sort: 1,
        name: 'user',
        path: '/rbac/system/user',
        component: '/rbac/system/user',
        meta: { title: 'User', icon: 'bx-hash' }
      },
      {
        id: '101-2',
        pId: '101',
        sort: 1,
        name: 'menu',
        path: '/rbac/system/menu',
        component: '/rbac/system/menu',
        meta: { title: 'Menu', icon: 'bx-hash' }
      }
    ]
  },
  {
    id: '102',
    pId: 'root',
    sort: 1,
    path: 'https://github.com/radwiin/Exia',
    meta: { title: 'GitHub', icon: 'bxl-github', group: 'other' }
  }
]

export default menus
