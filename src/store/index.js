import Vue from 'vue'
import Vuex from 'vuex'

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
      if (state.userInfo.gender === 0) {
        return '未知'
      } else if (state.userInfo.gender === 1) {
        return '男'
      } else {
        return '女'
      }
    }
  },
  actions: {},
  modules: {}
})
