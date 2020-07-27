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
import './styles/iconfont.css'
// 自己的初始化样式
import './styles/var.less'

// 全局导入组件
import AlNavBar from '@/components/AlNavBar.vue'
// 注册vant
Vue.use(Vant)
// 使用全局组件
Vue.component(AlNavBar.name.AlNavBar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
