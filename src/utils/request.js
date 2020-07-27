import axios from 'axios'

// 创建 axios副本
const request = axios.create({
  baseURL: process.env.VUE_APP_URL
})

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    if (response.data.code === 200) {
      return response.data
    } else if (
      response.data.code === 401 ||
      response.data.code === 403 ||
      response.data.code === 400
    ) {
      return Promise.reject(new Error(response.data.message))
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 返回请求对象
export default request
