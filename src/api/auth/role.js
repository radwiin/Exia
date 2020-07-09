import request from '@/utils/request'

export function query() {
  return request({
    url: '/role/query',
    method: 'post'
  })
}

export function add(role) {
  return request({
    url: '/role/add',
    method: 'post',
    data: role
  })
}

export function update(role) {
  return request({
    url: '/role/update',
    method: 'post',
    data: role
  })
}

export function remove(id) {
  return request({
    url: '/role/remove',
    method: 'post',
    data: { id }
  })
}

export function setAuthority(id, authMenus) {
  return request({
    url: '/role/setAuthority',
    method: 'post',
    data: { id, authMenus }
  })
}
