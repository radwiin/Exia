import Mock from "mockjs";

const records = [
  {
    id: "1123598821738675201",
    account: "root",
    tenantId: "000000",
    tenantName: "测试组",
    name: "超级管理员",
    phone: "123333333333",
    roleId: "1123598816738675201",
    roleName: "超级管理员"
  }
];

Mock.mock("/user/query", "post", options => {
  console.info(options);
  return {
    code: 200,
    success: true,
    msg: "操作成功",
    data: {
      records,
      currentPage: 1,
      pageSize: 10,
      total: 1
    }
  };
});

Mock.mock("/user/add", "post", () => {
  return {
    code: 200,
    success: true,
    msg: "操作成功"
  };
});

Mock.mock("/user/update", "post", () => {
  return {
    code: 200,
    success: true,
    msg: "操作成功"
  };
});

Mock.mock("/user/remove", "post", () => {
  return {
    code: 200,
    success: true,
    msg: "操作成功"
  };
});
