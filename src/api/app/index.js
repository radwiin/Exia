import request from "@/utils/request";

export function signIn({ account, password }) {
  return request({
    url: "/app/signIn",
    method: "post",
    data: {
      account,
      password
    }
  });
}

export function getUserInfo() {
  return request({
    url: "/app/userInfo",
    method: "post"
  });
}
