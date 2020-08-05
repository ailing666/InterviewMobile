export default function (Vue) {
  Vue.prototype.$avatar = function (obj) {
    if (obj.avatar) {
      obj.avatar = process.env.VUE_APP_URL + obj.avatar
    }
  }
}
