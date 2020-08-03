<template>
  <div class="experience-list-container">
    <div class="top-box">
      <AlNavBar title="面试技巧"></AlNavBar>
      <div class="search-box">
        <div class="content">
          <i class="iconfont iconicon_search"></i> 请输入关键字
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="experience-box">
      <div class="experience-list">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
       <AlItem v-for="item in shareList" :key="item.id" :item="item"></AlItem>
      </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { shareList } from '@/api/find'
export default {
  name: 'share',
  data () {
    return {
      shareList: [],
      start: 0,
      limit: 5,
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      shareList({ start: this.start, limit: this.limit }).then(res => {
        res.data.list.forEach(item => {
          item.author.avatar && (item.author.avatar = process.env.VUE_APP_URL + item.author.avatar)
        })
        this.shareList.push(...res.data.list)
        this.start += this.limit
        if (this.shareList.length >= res.data.total) {
          // 停止继续加载
          this.finished = true
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
.experience-list-container {
  min-height: 100vh;
  background: @white-color;
  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }
  .search-box {
    position: relative;
    font-size: 14px;
    color: #b3b3b3;
    padding-bottom: 10px;
    .content {
      height: 34px;
      width: 345px;
      margin: 0 auto;
      background: @bg-color;
      border-radius: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 0 solid #ebedf0;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-bottom-width: 0.02667rem;
    }
    .iconfont {
      font-size: 19px;
    }
  }
  .experience-box {
    padding: 0 15px;
    background: @white-color;
  }
}
</style>
