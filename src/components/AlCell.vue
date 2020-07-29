<template>
  <div class="alCell">
    <van-cell :title="title" @click="clickCell">
      <template>
        <slot>{{ value }}</slot>
      </template>
      <!-- 左侧图标 -->
      <template #icon>
        <i class="iconfont" :class="icon"></i>
      </template>
      <!-- 右侧图标 -->
      <template #right-icon>
        <i class="iconfont iconicon_more"></i>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'AlCell',
  props: ['title', 'value', 'icon'],
  methods: {
    clickCell () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less">
.alCell {
  .van-cell {
    height: 55px;
  }
  .iconfont {
    font-size: 21px;
  }
  .van-cell__title {
    margin-left: 13px;
  }
  .iconicon_more {
    font-size: 14px;
    margin-left: 9px;
  }
  &::after {
    // 设置线段的颜色为透明
    border-color: transparent;
  }
}
</style>
