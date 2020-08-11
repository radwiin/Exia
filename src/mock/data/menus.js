const menus = [
  {
    id: '100',
    pId: 'root',
    sort: 1,
    path: '/auth',
    component: 'Layout',
    redirect: '/auth/role',
    meta: { title: 'Auth', icon: 'setting', alwaysShow: true, group: 'sys' },
    children: [
      {
        id: '100-1',
        pId: '100',
        sort: 1,
        name: 'role',
        path: '/auth/role',
        component: '/auth/role',
        meta: { title: 'Role', icon: 'key' }
      }
    ]
  },
  {
    id: '101',
    pId: 'root',
    sort: 1,
    path: '/system',
    component: 'Layout',
    redirect: '/system/menu',
    meta: { title: 'System', icon: 'setting', alwaysShow: true, group: 'sys' },
    children: [
      {
        id: '101-1',
        pId: '101',
        sort: 1,
        name: 'user',
        path: '/system/user',
        component: '/system/user',
        meta: { title: 'User', icon: 'key' }
      },
      {
        id: '101-2',
        pId: '101',
        sort: 1,
        name: 'menu',
        path: '/system/menu',
        component: '/system/menu',
        meta: { title: 'Menu', icon: 'key' }
      }
    ]
  }
]

export default menus
