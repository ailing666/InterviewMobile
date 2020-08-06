<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view></router-view>
    <van-tabbar
      route
      active-color="#e40137"
      inactive-color="#b4b4bd"
      v-show="$route.meta.tabbarShow"
    >
      <van-tabbar-item
        v-for="(item, index) in routerOptions"
        :key="index"
        :to="item.path"
      >
        <span>{{ item.meta.title }}</span>
        <template #icon>
          <i class="iconfont" :class="item.meta.icon"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }
  },
  computed: {
    routerOptions () {
      return this.$router.options.routes.slice(1, 5)
    }
  }
}
</script>

<style lang="less">
#app {
  box-sizing: border-box;
}
</style>
