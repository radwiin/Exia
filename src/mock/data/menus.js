const menus = [
  {
    id: '1',
    pId: 'root',
    sort: 1,
    path: '/components-demo',
    component: 'Layout',
    redirect: '/components-demo/coordinate-select',
    name: 'components-demo',
    meta: { title: '组件库', icon: 'build', alwaysShow: true },
    children: [
      {
        id: '1-1',
        pId: '1',
        sort: 1,
        path: 'coordinate-select-demo',
        component: '/components-demo/coordinate-select-demo',
        name: 'coordinate-select-demo',
        meta: { title: '坐标选择', icon: 'locate' }
      },

      {
        id: '1-2',
        pId: '1',
        sort: 1,
        path: 'watermark-demo',
        component: '/components-demo/watermark-demo',
        name: 'watermark-demo',
        meta: { title: '水印', icon: 'show' }
      },
      {
        id: '1-3',
        pId: '1',
        sort: 1,
        path: 'icon-demo',
        component: '/components-demo/icon-demo',
        name: 'icon-demo',
        meta: { title: '图标', icon: 'icon' }
      }
    ]
  },
  {
    id: '2',
    pId: 'root',
    sort: 1,
    path: '/utils-demo',
    component: 'Layout',
    redirect: '/utils-demo/operate',
    name: 'utils-demo',
    meta: { title: '工具库', icon: 'component', alwaysShow: true },
    children: [
      {
        id: '2-1',
        pId: '2',
        sort: 1,
        path: 'operate',
        component: '/utils-demo/operate',
        name: 'operate',
        meta: { title: '算术优化', icon: 'calculator' }
      }
    ]
  },
  {
    id: '3',
    pId: 'root',
    sort: 1,
    path: '/workflow',
    component: 'Layout',
    redirect: '/workflow/modeler',
    name: 'workflow',
    meta: { title: '工作流', icon: 'bpmn-io', alwaysShow: true },
    children: [
      {
        id: '3-1',
        pId: '3',
        sort: 1,
        path: 'modeler',
        component: '/workflow/modeler',
        name: 'modeler',
        meta: { title: 'BPMN建模', icon: 'edit' }
      },
      {
        id: '3-2',
        pId: '3',
        sort: 1,
        path: 'viewer',
        component: '/workflow/viewer',
        name: 'viewer',
        meta: { title: 'BPMN查看', icon: 'show' }
      }
    ]
  },
  {
    id: '4',
    pId: 'root',
    sort: 1,
    path: '/draggable',
    component: 'Layout',
    redirect: '/draggable/board',
    name: 'draggable',
    meta: { title: '拖拽', icon: 'trello', alwaysShow: true },
    children: [
      {
        id: '4-1',
        pId: '4',
        sort: 1,
        path: 'board',
        component: '/draggable/board',
        name: 'board',
        meta: { title: '看板', icon: 'trello' }
      }
    ]
  },
  {
    id: '5',
    pId: 'root',
    sort: 1,
    path: '/scrollmagic',
    component: 'Layout',
    redirect: '/scrollmagic/pagescroll',
    name: 'scrollmagic',
    meta: { title: '滚动', icon: 'scrollmagic', alwaysShow: true },
    children: [
      {
        id: '5-1',
        pId: '5',
        sort: 1,
        path: 'pagescroll',
        component: '/scrollmagic/pagescroll',
        name: 'pagescroll',
        meta: { title: '翻页', icon: 'scrollmagic' }
      }
    ]
  },
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
