// 导入 导航栏组件
import AlNavBar from '@/components/AlNavBar.vue'
// 导入 Cell组件
import AlCell from '@/components/AlCell.vue'
// 导入 Cell组件
import AlItem from '@/components/AlItem.vue'

const myPlugin = {
  install (Vue) {
    Vue.component(AlNavBar.name, AlNavBar)
    Vue.component(AlCell.name, AlCell)
    Vue.component(AlItem.name, AlItem)
  }
}
export default myPlugin
