<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="find">
      <!-- 导航栏 -->
      <AlNavBar :showBack="false" title="发现"></AlNavBar>
      <!-- 面试技巧区域 -->
      <div class="technic-container">
        <AlCell title="面试技巧" value="查看更多"></AlCell>
        <!-- 列表项 -->
        <div class="technic-list">
          <!-- 有图片 -->
          <div class="item" v-for="item in technicList" :key="item.id">
            <div class="left">
              <h3>
                {{ item.title }}
              </h3>
              <div class="detail-box">
                <div class="time">{{ item.created_at | formatTime }}</div>
                <div class="read">
                  <i class="iconfont iconicon_liulanliang"></i>
                  {{ item.read }}
                </div>
                <div class="star">
                  <i class="iconfont iconicon_dianzanliang"></i>
                  {{ item.star }}
                </div>
              </div>
            </div>
            <div v-if="item.cover" class="cover">
              <img :src="item.cover" alt="" />
            </div>
          </div>
        </div>
      </div>
      <!-- 市场数据区域 -->
      <div class="data-container">
        <AlCell title="市场数据" value="查看更多"></AlCell>
        <div class="data-content">
          <div class="tags">
            <span class="tag">{{ hotData.city }}</span>
            <span class="tag">{{ hotData.position }}</span>
          </div>
          <!-- 列表 -->
          <div class="data-list">
            <!-- 箭头上 -->
            <div class="item" v-for="(item, index) in dataList" :key="index">
              <div class="time">{{ item.year }}</div>
              <div class="process">
                <!-- 计算宽度 -->
                <div
                  class="step"
                  :style="{
                    width:
                      ((item.salary / hotData.topSalary) * 100).toFixed(1) + '%'
                  }"
                >
                  ¥{{ item.salary }}
                </div>
              </div>
              <div class="arrow-box">
                <i
                  class="iconfont"
                  :class="{
                    iconicon_shangsheng: item.percent > 0,
                    iconicon_xiajiang: item.percent < 0
                  }"
                ></i>
                <!-- 没有percent 就不显示 -->
                <span v-if="item.percent"> {{ item.percent }}% </span>
              </div>
            </div>
          </div>
          <!-- 更多 -->
          <div class="more" @click="toggleData">
            展开更多
            <i
              class="iconfont iconicon_zhankai "
              :class="{ rotate: isAll }"
            ></i>
          </div>
        </div>
      </div>
      <!-- 面经分享 -->
      <div class="share-container">
        <AlCell title="面经分享" value="查看更多"> </AlCell>
        <div class="share-content">
          <div class="list" >
            <AlItem v-for="item in shareList" :key="item.id" :item="item"></AlItem>
          </div>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
// 导入api
import { technicList, hotData, shareList } from '@/api/find'

export default {
  name: 'find',
  data () {
    return {
      // 面试经验列表
      technicList: [],
      // 热门市场数据
      hotData: {},
      // 专门用来循环的数据
      dataList: [],
      shareList: [],
      // 布尔值标记是否显示所有
      isAll: false,
      // 是否正在加载
      isLoading: false
    }
  },
  // 方法
  methods: {
    // 获取数据的方法
    getData () {
      // 获取面试经验
      technicList().then(res => {
        // console.log(res)
        // 拼接基地址
        res.data.list.forEach(v => {
          // 存在封面采取拼接基地址
          if (v.cover) {
            v.cover = process.env.VUE_APP_URL + v.cover
          }
        })
        // 数据处理完毕
        this.technicList = res.data.list
      })
      // 获取热门市场数据
      hotData().then(res => {
        // console.log(res)
        this.hotData = res.data
        // 数组取反
        this.hotData.yearSalary.reverse()
        // 获取4条数据进行渲染
        this.dataList = this.hotData.yearSalary.slice(0, 4)
      })
      shareList().then(res => {
        res.data.list.forEach(item => {
          if (item.author.avatar) {
            item.author.avatar = process.env.VUE_APP_URL + item.author.avatar
          }
        })
        this.shareList = res.data.list
      })
    },
    // 下拉刷新
    onRefresh () {
      // this.$toast.loading({ duration: 0 })
      setTimeout(() => {
        this.getData()
        // this.$toast.clear()
        // 关闭loading
        this.isLoading = false
      }, 2000)
    },
    // 切换数据显示
    toggleData () {
      // 取反标记
      this.isAll = !this.isAll
      // 修改 渲染的数组中的值即可
      if (this.isAll === true) {
        // 所有
        this.dataList = this.hotData.yearSalary
      } else {
        this.dataList = this.hotData.yearSalary.slice(0, 4)
      }
    }
  },
  created () {
    // 调用获取数据的方法
    this.getData()
  }
}
</script>

<style lang="less">
.find {
  padding-bottom: 80px;
  // 全部设置cell左侧标题
  .van-cell__title span {
    font-size: 16px;
    font-weight: 600;
  }
  // 面试技巧
  .technic-container {
    margin-bottom: 10px;
    .technic-list {
      padding: 0 15px;
      background: @white-color;
     .item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .left {
          flex: 1;
          h3 {
            font-weight: 600;
            font-size: 14px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .detail-box {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: @minor-font-color;
            .time {
              flex: 1;
            }
            .read {
              margin-right: 20px;
              display: flex;
              align-items: center;
              i {
                margin-right: 10px;
                font-size: 14px;
              }
            }
            .star {
              display: flex;
              align-items: center;
              i {
                margin-right: 10px;
                font-size: 14px;
              }
            }
          }
        }
        .cover {
          margin-left: 20px;
          img {
            display: block;
            width: 113px;
            height: 73px;
            border-radius: 8px;
          }
        }
      }
    }
  }
  // 市场数据
  .data-container {
    background: @white-color;
    margin-bottom: 10px;
    .data-content {
      padding: 0 15px;
    }
    .tags {
      margin-bottom: 20px;
      .tag {
        background: @minor-font-color;
        color: @subdominant-font-color;
        font-size: 12px;
        padding: 5px;
        margin-right: 10px;
        border-radius: 8px;
      }
    }
    // 列表
    .data-list {
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .time {
          font-size: 12px;
          color: @subdominant-font-color;
          margin-right: 15px;
        }
        .process {
          height: 12px;
          background: @minor-font-color;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 15px;
          flex: 1;
          .step {
            height: 100%;
            width: 50%;
            background: @error-color;
            color: @white-color;
            text-align: right;
            font-size: 12px;
            padding-right: 5px;
            border-radius: 8px;
          }
        }
        .arrow-box {
          display: flex;
          align-items: center;
          font-size: 12px;
          width: 50px;
          i {
            font-size: 16px;
            // 箭头下
            &.iconicon_xiajiang {
              color: @error-color;
            }
            // 箭头上
            &.iconicon_shangsheng {
              color: @success-color;
            }
          }
        }
      }
    }
    // 更多
    .more {
      display: flex;
      justify-content: center;
      font-size: 12px;
      color: @subdominant-font-color;
      align-items: center;
      i {
        color: @minor-font-color;
        font-size: 14px;
        transition: all 0.2s;
        // 添加旋转的类名
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
  }
  // 面经分享
    .share-container {
    background: @white-color;
    .share-content {
      padding: 0 15px;
    }
    .list {}
    }
}
</style>
