import Mock from "mockjs";

Mock.mock("/tenant/query", "post", () => {
  return {
    code: 200,
    success: true,
    msg: "操作成功",
    data: [
      {
        id: "000000",
        name: "管理组",
        contact: "admin",
        phone: "666666",
        quota: "2333",
        expire: "2099-01-01 00:00:00",
        domain: "http://saber.bladex.vip"
      },
      {
        id: "763196",
        name: "用户组",
        contact: "user",
        phone: "13888888888",
        quota: "23333",
        expire: "2030-02-01 12:00:00",
        domain: "http://user.bladex.vip"
      },
      {
        id: "648897",
        name: "测试组",
        contact: "test",
        phone: "13888888888",
        quota: "不限制",
        expire: "不限制",
        domain: "http://test.bladex.vip"
      }
    ]
  };
});
