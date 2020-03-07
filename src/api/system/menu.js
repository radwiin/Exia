import request from "@/utils/request";

export function query() {
  return request({
    url: "/menu/query",
    method: "post"
  });
}
