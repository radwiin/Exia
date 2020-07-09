import request from '@/utils/request'

export function getGitHubUserInfo(username) {
  return request({
    url: `https://api.github.com/users/${username}`,
    method: 'get'
  })
}
