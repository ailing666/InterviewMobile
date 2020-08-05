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
// 导入全局抽取的插件
import myLogin from './plugin/login'
import myAvatar from './plugin/avatar'
// 导入自己抽取的全局组件注册插件
import globalCom from './components/index'

// 注册vant
Vue.use(Vant)
Vue.use(globalCom)
Vue.use(myLogin)
Vue.use(myAvatar)
Vue.filter('formatTime', value => {
  moment.locale('zh-cn')
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
