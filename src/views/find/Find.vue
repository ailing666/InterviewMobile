<template>
  <van-tabbar v-model="active">
    <van-tabbar-item name="question" icon="home-o">标签</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data () {
    return {
      active: 'question'
    }
  }
}
</script>

<style></style>
