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

export function add(user) {
  return request({
    url: "/user/add",
    method: "post",
    data: user
  });
}

export function update(user) {
  return request({
    url: "/user/update",
    method: "post",
    data: user
  });
}

export function remove(id) {
  return request({
    url: "/user/remove",
    method: "post",
    data: { id }
  });
}
