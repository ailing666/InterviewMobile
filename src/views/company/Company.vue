<template>
  <div class="company-container">
    <van-sticky>
      <div class="top-box">
        <span>公司</span>
        <!-- 搜索 -->
        <van-search v-model="value" placeholder="请输入搜索关键词" />
      </div>

      <!-- 图片 -->
      <div v-if="!showPop" class="banner-box">
        <!-- <img src="../../assets/ios3x_img_banner@3x.png" alt="" /> -->
      </div>
      <!-- 筛选区域 -->
      <div class="filter-box">
        <span class="recommend" @click="suggestFilter">推荐</span>
        <!-- 距离筛选盒子 -->
        <span class="distance" @click="toggleFilter"
          >距离
          <span class="arrow-box">
            <i
              class="iconfont iconicon_xuanze_nor rotate"
              :class="{ actived: distance === 'desc' }"
            ></i>
            <i
              class="iconfont iconicon_xuanze_nor "
              :class="{ actived: distance === 'asc' }"
            ></i>
          </span>
        </span>
        <span class="grade"
          >评分
          <span class="arrow-box">
            <i class="iconfont iconicon_xuanze_nor rotate"></i>
            <i class="iconfont iconicon_xuanze_nor "></i>
          </span>
        </span>
        <span class="filter" @click="showPop = true">筛选</span>
      </div>
    </van-sticky>
    <!-- 主体区域 -->
    <div class="main-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="item van-hairline--bottom"
          v-for="item in companyList"
          :key="item.id"
        >
          <div class="cover">
            <img :src="item.logo" alt="" />
          </div>
          <div class="content-box">
            <div class="top">
              <div class="left">
                <span class="name">{{ item.name }}</span>
                <span class="sub">{{ item.region }} {{ item.distance }}</span>
              </div>
              <div class="score">{{ item.score }}分</div>
            </div>
            <div class="tags">
              <span class="tag">{{ item.type }}</span>
              <span class="tag">{{ item.step }}</span>
              <span class="tag">{{ item.scale }}</span>
            </div>
            <div class="bottom">
              在招职位: <span>{{ item.positions }}</span> / 最后更新时间:
              {{ item.updated_at | formatTime }}
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 弹出层 -->
    <van-popup
      transition="fade"
      v-model="showPop"
      position="top"
      :style="{ height: '70%' }"
      class="company-pop"
    >
      <div>
        <div class="section">
          <h2>距离</h2>
          <div class="items">
            <div class="item">由远及近</div>
            <div class="item">由近及远</div>
          </div>
        </div>
        <div class="section">
          <h2>评分</h2>
          <div class="items">
            <div class="item">4分-5分</div>
            <div class="item">3分-3.9分</div>
          </div>
          <div class="items">
            <div class="item">2分-2.9分</div>
            <div class="item">1分-1.9分</div>
          </div>
          <div class="items">
            <div class="item">1分以下</div>
          </div>
        </div>
        <div class="control-box van-hairline--top">
          <van-button class="clear-btn" type="default">默认按钮</van-button>
          <van-button class="confirm-btn" type="primary">主要按钮</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入api
import { companyList } from '../../api/company'
export default {
  name: 'company',
  data () {
    return {
      showPop: false,
      value: '',
      // 是否正在加载
      loading: false,
      // 是否加载完毕
      finished: false,
      // 起始索引
      start: 0,
      // 个数
      limit: 5,
      // 距离的筛选条件 空字符串传递到接口中 会出现错误提示 ,可以用undefined解决
      // axios发送请求时,对于undefined的参数直接 不发送
      distance: undefined,
      // 定义企业列表
      companyList: []
    }
  },
  methods: {
    suggestFilter () {
      // 清空ditance的值
      this.distance = undefined
    },
    // 切换筛选的高亮
    toggleFilter () {
      console.log('你点啦')
      // 如果没有值 向上
      if (this.distance === undefined) {
        this.distance = 'desc'
      } else {
        // 如果有值 取反
        if (this.distance === 'desc') {
          this.distance = 'asc'
        } else {
          this.distance = 'desc'
        }
      }
      // 重置数据
      this.companyList = []
      // 起始索引
      this.start = 0
      this.onLoad()
    },
    // 加载的回调函数
    async onLoad () {
      const listRes = await companyList({
        start: this.start,
        limit: this.limit,
        distance: this.distance
      })
      // 处理头像
      listRes.data.list.forEach(v => {
        if (v.logo) {
          v.logo = process.env.VUE_APP_URL + v.logo
        }
      })
      // 添加
      this.companyList.push(...listRes.data.list)
      // 关闭loading
      this.loading = false
      // 累加起始索引
      this.start += this.limit
      // 判断是否完结
      if (this.companyList.length >= listRes.data.total) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less">
.company-container {
  background-color: @white-color;
  padding-bottom: 70px;

  // 筛选条件的高亮效果
  i.iconfont.actived {
    color: @main-color !important;
  }

  .top-box {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    background-color: @white-color;
    .van-search {
      padding-right: 0;
      flex: 1;
    }
    .van-search__content {
      border-radius: 16px;
    }
    span {
      font-size: 18px;
      font-weight: 600;
      margin-right: 19px;
    }
  }
  .search-box {
    width: 345px;
    flex: 1;
    margin: 0 auto;
    height: 34px;
    background: @bg-color;
    border-radius: 17px;
    font-size: 14px;
    color: #b3b3b3;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 19px;
    }
  }
  .banner-box {
    padding: 0px 15px 0px;
    img {
      width: 100%;
    }
  }
  .filter-box {
    padding: 0 15px 0;
    display: flex;
    align-items: center;
    background-color: white;
    span:not(.arrow-box) {
      font-size: 14px;
      margin-right: 40px;
      font-weight: normal;
      display: flex;
      align-items: center;
      line-height: 20px;
      letter-spacing: 0px;
      i {
        font-size: 15px;
        color: #b4b4bc;
        width: 12px;
        height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .arrow-box {
        display: flex;
        flex-direction: column;
        margin-left: 5px;
        .rotate {
          transform: rotate(180deg);
        }
      }
    }
    span.filter {
      flex: 1;
      justify-content: flex-end;
      margin: 0;
    }
  }
  .main-box {
    padding: 0 15px;
    .item {
      display: flex;
      height: 156px;
      padding-top: 24px;
      .cover {
        margin-right: 15px;
        img {
          width: 66px;
          height: 66px;
        }
      }
      .content-box {
        flex: 1;
        .top {
          display: flex;
          align-items: center;
          .left {
            flex: 1;
            span {
              display: block;
            }
            .name {
              font-size: 18px;
              color: #19232b;
              margin-bottom: 5px;
            }
            .sub {
              font-size: 12px;
              color: #545671;
            }
          }
          .score {
            font-size: 12px;
            color: #545671;
          }
        }
        .tags {
          margin-top: 13px;
          display: flex;
          .tag {
            display: block;
            font-size: 12px;
            color: #b4b4bd;
            padding: 2px 7px;
            background: #f7f4f5;
            margin-right: 7px;
          }
        }
        .bottom {
          margin-top: 16px;
          font-size: 12px;
          color: #b4b4bd;
          span {
            color: #53b5d1;
          }
        }
      }
    }
  }
  // 弹出层
  .company-pop {
    .section {
      padding: 11px 15px 18px;
      h2 {
        font-size: 18px;
        margin-bottom: 18px;
      }
      .items {
        margin-bottom: 9px;
        display: flex;
      }
      .item {
        width: 165px;
        height: 32px;
        background: #f9f8f8;
        border-radius: 4px;
        font-size: 12px;
        text-align: center;
        line-height: 32px;
        &:first-child {
          margin-right: 15px;
        }
      }
    }
  }
  // 弹出层
  .van-overlay {
    top: 100px;
  }
  .van-popup {
    top: 100px;
  }
  // 按钮盒子
  .control-box {
    display: flex;
    padding: 15px;
    .van-button {
      border-color: transparent;
    }
    .clear-btn {
      width: 125px;
      height: 50px;
      background: #ffe2e9;
      border-radius: 7px;
      margin-right: 10px;
      font-size: 16px;
      color: #e40137;
    }
    .confirm-btn {
      flex: 1;
      height: 50px;
      background: #e40137;
      border-radius: 7px;
    }
  }
}
</style>
