const menus = [
  {
    id: '100',
    pId: 'root',
    sort: 1,
    path: '/auth',
    component: 'Layout',
    redirect: '/auth/role',
    name: 'auth',
    meta: { title: '权限管理', icon: 'setting', alwaysShow: true },
    children: [
      {
        id: '100-1',
        pId: '100',
        sort: 1,
        path: 'role',
        component: '/auth/role',
        name: 'role',
        meta: { title: '角色管理', icon: 'key' }
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
    name: 'system',
    meta: { title: '系统管理', icon: 'setting', alwaysShow: true },
    children: [
      {
        id: '101-1',
        pId: '101',
        sort: 1,
        path: 'user',
        component: '/system/user',
        name: 'user',
        meta: { title: '用户管理', icon: 'key' }
      },
      {
        id: '101-2',
        pId: '101',
        sort: 1,
        path: 'menu',
        component: '/system/menu',
        name: 'menu',
        meta: { title: '菜单管理', icon: 'key' }
      }
    ]
  }
]

export default menus
