// 为了方便维护
// key定义为常量
const TOKEN = 'INTERVIEW_TOKEN'
// 保存token
export function saveToken (token) {
  window.localStorage.setItem(TOKEN, token)
}
// 获取token
export function getToken () {
  return window.localStorage.getItem(TOKEN)
}
// 删除token
export function removeToken () {
  window.localStorage.removeItem(TOKEN)
}
