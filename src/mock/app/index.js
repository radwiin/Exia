import Mock from "mockjs";

const menus = [
  {
    id: "1",
    sort: 1,
    path: "/auth",
    component: "Layout",
    redirect: "/auth/role",
    meta: { title: "权限管理", icon: "setting", alwaysShow: true },
    children: [
      {
        id: "2",
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
    sort: 1,
    path: "/system",
    component: "Layout",
    redirect: "/system/tenant",
    meta: { title: "系统管理", icon: "setting", alwaysShow: true },
    children: [
      {
        id: "4",
        sort: 1,
        path: "tenant",
        component: "/system/tenant",
        name: "tenant",
        meta: { title: "租户管理", icon: "key" }
      },
      // {
      //   id: "5",
      //   sort: 1,
      //   path: "dept",
      //   component: "/system/dept",
      //   name: "dept",
      //   meta: { title: "机构管理", icon: "key" }
      // },
      {
        id: "6",
        sort: 1,
        path: "user",
        component: "/system/user",
        name: "user",
        meta: { title: "用户管理", icon: "key" }
      },
      {
        id: "7",
        sort: 1,
        path: "menu",
        component: "/system/menu",
        name: "menu",
        meta: { title: "菜单管理", icon: "key" }
      }
    ]
  }
];

Mock.mock("/app/signIn", "post", options => {
  console.info(options);
  return {
    code: 200,
    success: true,
    msg: "操作成功",
    data: {
      token: "EXIA_TOKEN_0"
    }
  };
});

Mock.mock("/app/userInfo", "post", () => {
  return {
    code: 200,
    success: true,
    msg: "操作成功",
    data: {
      account: "root",
      roles: ["root-admin"],
      menus
    }
  };
});
