import request from '@/utils/request'

export function login({ account, password }) {
  return request({
    url: '/app/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function getUserInfo() {
  return request({
    url: '/app/userInfo',
    method: 'post'
  })
}
