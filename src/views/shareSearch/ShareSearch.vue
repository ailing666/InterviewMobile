<template>
 <div class="interview-search-container">
    <!-- 顶部 -->
    <div class="top-box">
      <AlNavBar title="面试技巧搜索"></AlNavBar>
      <!-- search组件 -->
      <van-search
        shape="round"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
      >
        <template #left-icon>
          <i class="iconfont iconicon_search"></i>
        </template>
      </van-search>
    </div>
    <!-- 搜索选项 -->
    <div class="option-box">
      <!-- 热搜区域 -->
      <div class="section">
        <div class="title">大家都在搜索</div>
        <ul class="tags">
           <li class="tag" v-for="(item, index) in topSearch" :key="index">{{item}}</li>
        </ul>
      </div>
      <!-- 历史记录区域 -->
      <div class="section">
        <div class="title">历史记录 <span>清空</span></div>
        <div class="tags">
          <span class="tag"  v-for="(item, index) in topSearch" :key="index">{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shareTopSearch } from '@/api/find'
export default {
  name: 'ShareSearch',
  data () {
    return {
      value: '',
      topSearch: []
    }
  },
  created () {
    shareTopSearch().then(res => {
      window.console.log(res)
      this.topSearch = res.data
    })
  },
  methods: {}
}
</script>

<style lang="less">
.interview-search-container {
  .top-box {
    padding-bottom: 11px;
    background: @white-color;
    position: relative;
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
    .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
    .van-search__content {
      background: #f7f4f5;
      font-size: 14px;
      color: #b3b3b3;
      .iconfont {
        font-size: 19px;
        color: #b3b3b3;
      }
    }
  }
  // 搜索选项
  .option-box {
    padding: 15px;

    .section {
      margin-bottom: 27px;
      .title {
        font-size: 18px;
        font-weight: 500;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 12px;
          color: #545671;
        }
      }
      .tags {
        margin-top: 18px;
        display: flex;
        .tag {
          margin-right: 10px;
          margin-bottom: 11px;
          padding: 6px;
          border-radius: 4px;
          font-size: 12px;
          color: @subdominant-font-color;
          background-color: #eceaea;
        }
      }
    }
  }
  .result-box {
    padding: 15px;
  }
}
</style>
