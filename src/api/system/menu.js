import request from '@/utils/request'

export function query() {
  return request({
    url: '/menu/query',
    method: 'post'
  })
}

export function add(menu) {
  return request({
    url: '/menu/add',
    method: 'post',
    data: menu
  })
}

export function update(menu) {
  return request({
    url: '/menu/update',
    method: 'post',
    data: menu
  })
}

export function remove(id) {
  return request({
    url: '/menu/remove',
    method: 'post',
    data: { id }
  })
}
