import Vue from 'vue'
import VueRouter from 'vue-router'
import Question from '@/views/question/Question.vue'
import Find from '@/views/find/Find.vue'
import My from '@/views/my/My.vue'
import Company from '@/views/company/Company.vue'
Vue.use(VueRouter)

// const routes = []

const router = new VueRouter({
  routes: [
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
        icon: 'iconicon_footbar_st_nor'
      }
    }
  ]
})

export default router
