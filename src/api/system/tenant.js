import request from "@/utils/request";

export function query() {
  return request({
    url: "/tenant/query",
    method: "post",
    params: {}
  });
}
