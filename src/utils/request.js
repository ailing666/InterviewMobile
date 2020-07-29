import axios from 'axios'
import { Toast } from 'vant'
import { getToken } from '@/utils/token.js'

// 创建 axios副本
const request = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 判断是否需要携带token
    if (config.needToken) {
      // 判断是否有token,如果有,就按照接口需要的格式在请求头添加token
      getToken() && (config.headers.authorization = `Bearer ${getToken()}`)
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    const code = response.data.code
    if (code === 200) {
      return response.data
    } else if (code === 401 || code === 403 || code === 400) {
      Toast.fail(response.data.message)
      return Promise.reject(new Error(response.data.message))
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 返回请求对象
export default request
