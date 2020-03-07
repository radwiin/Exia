import Mock from "mockjs";

const data = [
  {
    id: "1123598816738675201",
    roleName: "超级管理员",
    sort: 1,
    roleAlias: "root-admin"
  },
  {
    id: "1123598816738675202",
    roleName: "小程序管理员",
    sort: 2,
    roleAlias: "mini-program-admin"
  },
  {
    id: "1226473225100234753",
    roleName: "门店管理员",
    sort: 3,
    roleAlias: "shop-admin"
  }
];

Mock.mock("/role/query", "post", () => {
  return {
    code: 200,
    success: true,
    msg: "操作成功",
    data
  };
});

Mock.mock("/role/add", "post", () => {
  return {
    code: 200,
    success: true,
    msg: "操作成功"
  };
});

Mock.mock("/role/update", "post", () => {
  return {
    code: 200,
    success: true,
    msg: "操作成功"
  };
});

Mock.mock("/role/remove", "post", () => {
  return {
    code: 200,
    success: true,
    msg: "操作成功"
  };
});
