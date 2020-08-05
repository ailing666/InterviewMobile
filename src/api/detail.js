// 导入请求对象
import request from '@/utils/request'

// 文章详情
export function shareDetail (id) {
  return request({
    url: `/articles/share/${id}`
  })
}
// 评论列表
export function commentsDetail (params) {
  // 对象解构
  const { id, start, limit } = params
  return request({
    url: `/articles/comments/${id}`,
    // 赋值
    params: {
      start,
      limit
    }
  })
}

// 发送评论
export function sendComment (data) {
  // 解构
  return request({
    url: '/articles/comments',
    method: 'post',
    needToken: true,
    data
  })
}
// 文章点赞
export function starArticle (data) {
  return request({
    url: '/articles/star',
    method: 'post',
    needToken: true,
    data
  })
}
// 评论点赞
export function starComment (data) {
  return request({
    url: '/article-comments/star',
    method: 'post',
    data,
    needToken: true
  })
}
