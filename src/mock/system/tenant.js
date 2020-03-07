import Mock from "mockjs";

const records = [
  {
    id: "000000",
    name: "测试组",
    contact: "项目经理A",
    phone: "666666",
    domain: "http://saber.bladex.vip",
    app_id: "9999999"
  }
];

Mock.mock("/tenant/query", "post", options => {
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
