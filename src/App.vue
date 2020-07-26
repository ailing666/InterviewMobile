<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view></router-view>
    <van-tabbar route active-color="#95f" inactive-color="#059">
      <van-tabbar-item
        v-for="(item, index) in $router.options.routes"
        :key="index"
        :to="item.path"
      >
        <span>{{ item.meta.title }}</span>
        <template #icon>
          <i class="iconfont" :class="item.meta.icon"></i> </template
      ></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    window.console.log(this.$router.options)
  }
}
</script>

<style lang="less"></style>
