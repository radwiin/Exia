const menus = [
  {
    id: "8",
    pId: "root",
    sort: 1,
    path: "/components-demo",
    component: "Layout",
    redirect: "/components-demo/coordinate-select",
    name: "components-demo",
    meta: { title: "组件库", icon: "bpmn-io", alwaysShow: true },
    children: [
      {
        id: "10",
        pId: "8",
        sort: 1,
        path: "coordinate-select-demo",
        component: "/components-demo/coordinate-select-demo",
        name: "coordinate-select-demo",
        meta: { title: "坐标选择", icon: "locate" }
      },
      {
        id: "11",
        pId: "8",
        sort: 1,
        path: "modeler",
        component: "/components-demo/modeler",
        name: "modeler",
        meta: { title: "BPMN建模", icon: "build" }
      },
      {
        id: "12",
        pId: "8",
        sort: 1,
        path: "viewer",
        component: "/components-demo/viewer",
        name: "viewer",
        meta: { title: "BPMN查看", icon: "show" }
      },
      {
        id: "13",
        pId: "8",
        sort: 1,
        path: "watermark-demo",
        component: "/components-demo/watermark-demo",
        name: "watermark-demo",
        meta: { title: "水印", icon: "show" }
      }
    ]
  },
  {
    id: "9",
    pId: "root",
    sort: 1,
    path: "/utils-demo",
    component: "Layout",
    redirect: "/utils-demo/operate",
    name: "utils-demo",
    meta: { title: "工具库", icon: "bpmn-io", alwaysShow: true },
    children: [
      {
        id: "13",
        pId: "9",
        sort: 1,
        path: "operate",
        component: "/utils-demo/operate",
        name: "operate",
        meta: { title: "算术优化", icon: "calculator" }
      }
    ]
  },
  {
    id: "1",
    pId: "root",
    sort: 1,
    path: "/auth",
    component: "Layout",
    redirect: "/auth/role",
    name: "auth",
    meta: { title: "权限管理", icon: "setting", alwaysShow: true },
    children: [
      {
        id: "2",
        pId: "1",
        sort: 1,
        path: "role",
        component: "/auth/role",
        name: "role",
        meta: { title: "角色管理", icon: "key" }
      }
    ]
  },
  {
    id: "3",
    pId: "root",
    sort: 1,
    path: "/system",
    component: "Layout",
    redirect: "/system/menu",
    name: "system",
    meta: { title: "系统管理", icon: "setting", alwaysShow: true },
    children: [
      {
        id: "6",
        pId: "3",
        sort: 1,
        path: "user",
        component: "/system/user",
        name: "user",
        meta: { title: "用户管理", icon: "key" }
      },
      {
        id: "7",
        pId: "3",
        sort: 1,
        path: "menu",
        component: "/system/menu",
        name: "menu",
        meta: { title: "菜单管理", icon: "key" }
      }
    ]
  }
];

export default menus;
