// 导入请求对象
import request from '@/utils/request'
export function shareDetail (id) {
  return request({
    url: `/articles/share/${id}`
  })
}
export function commentsDetail (params) {
  // 对象解构
  const { id, start, limit } = params
  return request({
    url: `/articles/comments/${id}`,
    // 赋值
    params: {
      start, limit
    }
  })
}
