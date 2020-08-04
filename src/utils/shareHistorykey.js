// 定义常量作为key
const SHAREHISTORYKEY = 'SHAREHISTORYKEY'

// 保存搜索历史
export function saveHistory (history) {
  // 计算机只能储存二进制和字符串
  localStorage.setItem(SHAREHISTORYKEY, JSON.stringify(history))
}

// 读取搜索历史
export function getHistory () {
  // 格式 string
  const historyStr = localStorage.getItem(SHAREHISTORYKEY)
  // 如果为空 返回空数组
  const history = JSON.parse(historyStr)
  return history || []
}

// 删除搜搜历史
export function removeHistory () {
  localStorage.removeItem(SHAREHISTORYKEY)
}
