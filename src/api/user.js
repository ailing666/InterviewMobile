import request from '@/utils/request.js'
/**
 * 获取用户信息,需要携带token
 */
export function getUserInfo () {
  return request({
    url: '/au/info',
    // 标记需要携带token
    needToken: true
  })
}

export function editUserInfo (data) {
  return request({
    url: '/au/edit',
    data,
    method: 'post',
    // 标记需要携带token
    needToken: true
  })
}
