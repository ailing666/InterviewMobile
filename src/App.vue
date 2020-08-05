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
