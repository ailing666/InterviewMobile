<template>
  <div class="alNavBar">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <i class="iconfont iconbtn_nav_back"></i>
      </template>
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'AlNavBar',
  props: {
    title: {
      type: String
    },
    leftText: {
      type: String
    },
    rightText: {
      type: String
    }

  },
  methods: {
    onClickLeft () {
      this.$emit('onClickLeft')
    },
    onClickRight () {
      this.$emit('onClickRight')
    }
  }
}
</script>

<style lang="less">
.alNavBar {
  .iconbtn_nav_back {
    font-size: 44px;
    color: @black-color;
  }
}
</style>
