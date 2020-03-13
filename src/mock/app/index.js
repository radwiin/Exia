import Mock from "mockjs";
import menus from "@/mock/data/menus";

Mock.mock("/app/signIn", "post", () => {
  return {
    code: 200,
    msg: "操作成功",
    data: {
      token: "EXIA_TOKEN_0"
    }
  };
});

Mock.mock("/app/userInfo", "post", () => {
  return {
    code: 200,
    msg: "操作成功",
    data: {
      account: "root",
      roles: ["root"],
      menus
    }
  };
});
