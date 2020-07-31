<template>
  <div class="editInfo">
    <!-- 导航栏 -->
    <MMNavBar title="修改昵称"></MMNavBar>
    <div class="main-box">
      <!-- 输入框 -->
      <van-field type="text" v-model="inputValue" />
      <!-- 上传组件 -->
      <van-uploader :after-read="afterRead" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'editInfo',
  data () {
    return {
      // 输入框绑定的数据
      inputValue: ''
    }
  },
  methods: {
    afterRead (fileInfo) {
      console.log(fileInfo)
    }
  }
}
</script>

<style lang="less">
.editInfo {
  background-color: @white-color;
  // 设置高度 使用vh的话 ,1vh 等于 1%的屏幕高度
  // 如果用`height:100%`
  height: 100vh;
  .main-box {
    padding: 15px;
    text-align: center;
    .van-field {
      background-color: @bg-color;
      border-radius: 8px;
    }
  }
}
</style>
