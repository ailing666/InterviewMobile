// 导入请求对象
import request from '@/utils/request'

// 抽取列表接口
export function companyList (params) {
  return request({
    url: '/companies/list',
    method: 'get',
    params
  })
}
