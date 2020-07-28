// 导入navBar组件
import AlNavBar from './AlNavBar.vue'
import AlCell from './AlCell.vue'
// Vue是Vue.use传递进来的 Vue的构造函数
export default function (Vue) {
  // 全局注册 AlNavBar组件
  Vue.component(AlNavBar.name, AlNavBar)
  // 全局注册 AlCell
  Vue.component(AlCell.name, AlCell)
}
