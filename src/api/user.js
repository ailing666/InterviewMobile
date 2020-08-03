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
// 修改用户信息
export function editUserInfo (data) {
  return request({
    url: '/au/edit',
    data,
    method: 'post',
    // 标记需要携带token
    needToken: true
  })
}
export function uploadFile (file) {
  const formData = new FormData()
  formData.append('files', file)
  return request({
    url: '/upload',
    method: 'post',
    needToken: 'token',
    data: formData
  })
}
