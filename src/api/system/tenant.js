import request from "@/utils/request";

export function query() {
  return request({
    url: "/tenant/query",
    method: "post",
    data: {
      currentPage: 1,
      pageSize: 10
    }
  });
}

export function add(tenant) {
  return request({
    url: "/tenant/add",
    method: "post",
    data: tenant
  });
}

export function update(tenant) {
  return request({
    url: "/tenant/update",
    method: "post",
    data: tenant
  });
}

export function remove(id) {
  return request({
    url: "/tenant/remove",
    method: "post",
    data: { id }
  });
}
