// 导入请求对象
import request from '@/utils/request'

// 面试技巧

function technicList (params) {
  return request({
    url: '/articles/technic',
    method: 'get',
    needToken: true,
    params
  })
}
// 热门数据
function hotData () {
  return request({
    url: '/chart-data/hot',
    method: 'get'
  })
}

// 面经分享
function shareList (params) {
  return request({
    url: '/articles/share',
    method: 'get',
    needToken: true,
    params
  })
}

// 面经热搜
export function shareTopSearch () {
  return request({
    url: '/articles/shareTopSearch'
  })
}
// 暴露出去
export { technicList, hotData, shareList }
