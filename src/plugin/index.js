// 导入仓库
import store from '@/store/index'
// 导入token
import { getToken, removeToken } from '@/utils/token'
// 导入获取用户信息
import { getUserInfo } from '@/api/user'
// 导入路由
import router from '@/router'
export default function (Vue) {
  // 为Vue原型撒花姑娘添加方法
  Vue.prototype.$isLogin = function () {
  //  返回一个Promise对象
    return new Promise((resolve, reject) => {
    //  判断登录了吗
      if (store.state.isLogin) {
        //  已登录
        resolve()
      } else {
        //  没登录
        //  判断有么有token
        if (getToken()) {
          //  有token
          //  是否能获取用户信息
          getUserInfo().then(res => {
            //   能
          //  储存用户信息
            store.commit('SAVEUSERINFO', res.data)
            //   改变登录状态
            store.commit('SETISLOGIN', true)
            //   成功
            resolve()
          }).catch(() => {
            //   不能
          //  清除token
            removeToken()
            //  打回去
            router.push('/login?redirect=' + this.$route.fullPath)
            //  失败
            reject(new Error('请先登录'))
          })
        } else {
          //  既没登录又没token
          //  清除token
          removeToken()
          //  打回去
          router.push('/login?redirect=' + this.$route.fullPath)
          //  失败
          reject(new Error('请先登录'))
        }
      }
    })
  }
}
