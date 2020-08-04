import Vue from 'vue'
import VueRouter from 'vue-router'
import Question from '@/views/question/Question.vue'
import Find from '@/views/find/Find.vue'
import My from '@/views/my/My.vue'
import Company from '@/views/company/Company.vue'
import Login from '@/views/login/Login.vue'
import UserInfo from '@/views/userInfo/UserInfo.vue'
import EditInfo from '@/views/editInfo/EditInfo.vue'
import ShareList from '@/views/shareList/ShareList'
import ShareSearch from '@/views/shareSearch/ShareSearch'
import ShareDetail from '@/views/shareDetail/ShareDetail'
import store from '@/store/index.js'
import { getToken, removeToken } from '@/utils/token.js'
import { getUserInfo } from '@/api/user.js'
import { Toast } from 'vant'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/find'
    },
    {
      path: '/company',
      component: Company,
      meta: {
        tabbarShow: true,
        title: '公司',
        icon: 'iconicon_footbar_gs_nor'
      }
    },
    {
      path: '/question',
      component: Question,
      meta: {
        tabbarShow: true,
        title: '刷题',
        icon: 'iconicon_footbar_wode_nor'
      }
    },
    {
      path: '/find',
      component: Find,
      meta: {
        tabbarShow: true,
        title: '发现',
        icon: 'iconicon_liulanliang'
      }
    },
    {
      path: '/my',
      component: My,
      meta: {
        tabbarShow: true,
        title: '我的',
        icon: 'iconicon_footbar_st_nor',
        needLogin: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shareList',
      component: ShareList
    },
    {
      path: '/shareSearch',
      component: ShareSearch
    },
    {
      // 动态匹配路由
      path: '/shareDetail/:id',
      component: ShareDetail
    },
    {
      path: '/userInfo',
      component: UserInfo,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/editInfo',
      component: EditInfo,
      meta: {
        needLogin: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 判断是否需要登录才能访问
  if (to.meta.needLogin) {
    // 判断用户是否已经登录
    if (store.state.isLogin) {
      // 已经登录直接放走
      next()
    } else {
      // 没有登录,再判断是否有token
      if (getToken()) {
        // 有token,获取用户信息
        getUserInfo()
          .then(res => {
            // 设置vuex中的userinfo和islogin
            store.commit('SAVEUSERINFO', res.data)
            store.commit('SETISLOGIN', true)
            // 放他过去
            next()
          })
          // 用户信息获取失败,说明token无效
          .catch(err => {
            window.console.log(err)
            // 删除token
            removeToken()
            // 提示用户
            Toast.fail('你没登录啊弟弟')
            // 去上一个页面
            next(`/login?redirect=${to.fullPath}`)
          })
      } else {
        // 既没有用户信息,也没有token
        Toast.fail('你没登录啊弟弟')
        // 返回上一个页面
        next(`/login?redirect=${to.fullPath}`)
      }
    }
  } else {
    next()
  }
})
export default router
