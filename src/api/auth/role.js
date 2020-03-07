import request from "@/utils/request";

export function query() {
  return request({
    url: "/role/query",
    method: "post"
  });
}
