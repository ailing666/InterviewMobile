import Vue from 'vue'
import Vuex from 'vuex'
import area from '@/utils/area.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {}
  },
  mutations: {
    SAVEUSERINFO (state, newUserInfo) {
      state.userInfo = newUserInfo
    },
    SETISLOGIN (state, value) {
      state.isLogin = value
      window.console.log('state.isLogin', state.isLogin)
    }
  },
  getters: {
    USERAVATAR (state) {
      return process.env.VUE_APP_URL + state.userInfo.avatar
    },
    CORRECTRATE (state) {
      var totalNum = state.userInfo.submitNum
      var errNum = state.userInfo.errorNum
      return (((totalNum - errNum) / totalNum) * 100).toFixed(1)
    },
    GENDER (state) {
      const genderObj = { 0: '未知', 1: '男', 2: '女' }
      return genderObj[state.userInfo.gender]
    },
    SETAREA (state) {
      return area.city_list[state.userInfo.area]
    }
  },
  actions: {},
  modules: {}
})
