import request from "@/utils/request";

export function query() {
  return request({
    url: "/user/query",
    method: "post",
    data: {}
  });
}

export function queryDept() {
  return request({
    url: "/dept/query",
    method: "post",
    data: {
      id: "1"
    }
  });
}
