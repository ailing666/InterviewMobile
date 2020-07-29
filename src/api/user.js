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
