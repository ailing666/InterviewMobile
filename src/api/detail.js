// 导入请求对象
import request from '@/utils/request'
export function shareDetail (id) {
  return request({
    url: `/articles/share/${id}`
  })
}
