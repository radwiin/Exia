import request from "@/utils/request";

export function query() {
  return request({
    url: "/role/query",
    method: "post"
  });
}

export function setAuthority() {
  return request({
    url: "/role/setAuthority",
    method: "post",
    data: {
      menuAuthority: [],
      apiAuthority: []
    }
  });
}
