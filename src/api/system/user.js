import request from "@/utils/request";

export function query() {
  return request({
    url: "/user/query",
    method: "post",
    data: {
      currentPage: 1,
      pageSize: 10
    }
  });
}
