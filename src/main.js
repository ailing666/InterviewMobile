import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 整合normalize
import 'normalize.css'
// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入flexible
import 'amfe-flexible'
// 导入字体图标
import '@/styles/iconfont.css'
import '@/styles/common.css'
// 自己的初始化样式
import '@/styles/var.less'
// 导入moment
import moment from 'moment'
// 导入自己抽取的全局组件注册插件
import globalCom from './components/index'
// 全局导入组件
import AlNavBar from '@/components/AlNavBar.vue'
import AlCell from '@/components/AlCell.vue'
// 注册vant
Vue.use(Vant)
Vue.use(globalCom)
// 使用全局组件
Vue.component(AlCell.name, AlCell)
Vue.component(AlNavBar.name, AlNavBar)
Vue.filter('formatTime', value => {
  value = value.slice(0, value.length - 2)
  //  计算时间差
  const detayTime = moment().diff(moment(value), 'days')
  if (detayTime > 1) {
    return moment(value).format('YYYY年MM月DD日')
  } else {
    return moment(value).fromNow()
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
