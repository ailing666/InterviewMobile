<template>
 <div class="interview-search-container">
    <!-- 顶部 -->
    <div class="top-box">
      <AlNavBar title="面试技巧搜索" @onClickLeft ="$router.push('/find')"></AlNavBar>
      <!-- search组件 -->
      <van-search
        shape="round"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        focus
        @search="onSearch"
        @cancel="oncancel"
      >
        <template #left-icon>
          <i class="iconfont iconicon_search"></i>
        </template>
      </van-search>
    </div>
    <!-- 搜索选项 -->
    <div class="option-box" v-if="shareList.length === 0">
      <!-- 热搜区域 -->
      <div class="section">
        <div class="title">大家都在搜索</div>
        <ul class="tags">
           <li class="tag" v-for="(item, index) in topSearch" :key="index" @click="clickSearch(item)">{{item}}</li>
        </ul>
      </div>

      <!-- 历史记录区域 -->
      <div class="section" >
        <div class="title">历史记录 <span @click="clearHistory">清空</span></div>
        <div class="tags">
          <span class="tag"  v-for="(item, index) in history" :key="index" @click="clickSearch(item)">{{item}}</span>
        </div>
      </div>
    </div>
      <!-- 搜索列表区域 -->
   <div v-else>
     <AlItem v-for="item in shareList" :key="item.id" :item="item"></AlItem>
   </div>
  </div>
</template>

<script>
import { shareTopSearch, shareList } from '@/api/find'
import { getHistory, saveHistory, removeHistory } from '@/utils/shareHistorykey'
export default {
  name: 'ShareSearch',
  data () {
    return {
      value: '',
      topSearch: [],
      history: getHistory(),
      focus: true,
      shareList: []
    }
  },
  created () {
    shareTopSearch().then(res => {
      // 获取热搜
      this.topSearch = res.data
    })
  },
  methods: {
    // 搜索
    onSearch () {
      // 将搜索的词加到history中
      this.history.push(this.value)
      // 利用Set去重
      this.history = [...new Set(this.history)]
      // 当历史记录超过长度就删除一个
      this.history.length > 5 && this.history.shift()
      // 储存到本地缓存中,解决刷新消失bug
      saveHistory(this.history)
      //  调用分享列表接口,参数q是用户输入的关键字
      shareList({ q: this.value }).then(res => {
        if (res.data.list.length === 0) {
          this.$toast.fail('我尽力了真的找不到啊')
        } else {
          res.data.list.forEach(item => {
          // 处理用户头像
            item.author.avatar && (item.author.avatar = process.env.VUE_APP_URL + item.author.avatar)
            //  将关键词包裹上一个span标签
            item.title = item.title.replace(this.value, `<span>${this.value}</span>`)
          })
          // 本地保存
          this.shareList = res.data.list
        }
      })
    },
    // 取消事件
    oncancel () {
      this.shareList = []
    },
    // 点击标签搜索
    clickSearch (item) {
      this.value = item
      this.onSearch()
    },
    clearHistory () {
      // 删除缓存
      removeHistory()
      // 本地数组清空
      this.history = []
    }
  }
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
