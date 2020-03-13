import Mock from "mockjs";

import users from "@/mock/data/users";

Mock.mock("/user/query", "post", () => {
  return {
    code: 200,
    msg: "操作成功",
    data: {
      records: users,
      currentPage: 1,
      pageSize: 10,
      total: 1
    }
  };
});

Mock.mock("/user/add", "post", () => {
  return {
    code: -1,
    msg: "演示环境暂时无法操作！"
  };
});

Mock.mock("/user/update", "post", () => {
  return {
    code: -1,
    msg: "演示环境暂时无法操作！"
  };
});

Mock.mock("/user/remove", "post", () => {
  return {
    code: -1,
    msg: "演示环境暂时无法操作！"
  };
});

Mock.mock("/user/resetPassword", "post", () => {
  return {
    code: -1,
    msg: "演示环境暂时无法操作！"
  };
});
