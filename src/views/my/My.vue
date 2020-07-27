<template>
  <div class="my">
    <!-- 顶部区域 -->
    <div class="my-top">
      <!-- 顶部电池啊啥的 -->
      <img class="tool" src="@/assets/tool.jpg" alt="" />
      <!-- 用户信息 -->
      <div class="user-info">
        <!-- 左边,用户名 -->
        <div class="username">
          <h3>{{ userInfo.nickname }}</h3>
          <p>{{ userInfo.intro }}</p>
        </div>
        <!-- 右边用户头像 -->
        <div>
          <img class="avatar" :src="USERAVATAR" alt="" />
        </div>
      </div>
      <!-- 数据区 -->
      <div class="user-data">
        <ul>
          <li>
            <div class="number">{{ userInfo.submitNum }}</div>
            <p class="info">累计答题</p>
          </li>
          <li>
            <div class="number">{{ userInfo.collectQuestions.length }}</div>
            <p class="info">收藏题目</p>
          </li>
          <li>
            <div class="number">{{ userInfo.errorNum }}</div>
            <p class="info">我的错题</p>
          </li>
          <li>
            <div class="number">{{ CORRECTRATE }}%</div>
            <p class="info">正确率</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 主题区域 -->
    <div class="my-main">
      <!-- 我的岗位 -->
      <div class="gangwei">
        <AlCell
          title="我的岗位"
          icon="iconfont iconicon_mine_gangwei"
          :value="userInfo.position"
        ></AlCell>
      </div>
      <!-- 面经数据 -->
      <div class="interview-data">
        <h5 class="interview-data-title">面经数据</h5>
        <ul class="interview-data-body">
          <li>
            <p class="data-change">
              昨日阅读<span>+{{ userInfo.shareData.read.yesterday }}</span>
            </p>
            <div class="data-total-number">
              {{ userInfo.shareData.read.total }}
            </div>
            <p class="data-total-info">阅读总数</p>
          </li>
          <li>
            <p class="data-change">
              昨日获赞<span>+{{ userInfo.shareData.star.yesterday }}</span>
            </p>
            <div class="data-total-number">
              {{ userInfo.shareData.star.total }}
            </div>
            <p class="data-total-info">获赞总数</p>
          </li>
          <li>
            <p class="data-change">
              昨日新增<span>+{{ userInfo.shareData.comment.yesterday }}</span>
            </p>
            <div class="data-total-number">
              {{ userInfo.shareData.comment.total }}
            </div>
            <p class="data-total-info">评论总数</p>
          </li>
        </ul>
      </div>
      <!-- cell区域 -->
      <van-cell-group class="cell-list">
        <AlCell
          title="我的面经分享"
          icon="iconicon_mine_mianjing"
          value="21"
        ></AlCell>
        <AlCell
          title="我的消息"
          icon="iconicon_mine_xiaoxi"
          value="21"
        ></AlCell>
        <AlCell
          title="收藏的题库"
          icon="iconicon_mine_tikushoucang"
          value="21"
        ></AlCell>
        <AlCell
          title="收藏的企业"
          icon="iconicon_mine_qiyeshoucang"
          value="21"
        ></AlCell>
        <AlCell title="我的错题" icon="iconicon_mine_cuoti" value="21"></AlCell>
        <AlCell
          title="收藏的面试经验"
          icon="iconbtn_shoucang_sel"
          value="21"
        ></AlCell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import AlCell from '@/components/AlCell.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  components: { AlCell },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['USERAVATAR', 'CORRECTRATE'])
  }
}
</script>

<style lang="less">
.my {
  .tool {
    width: 100%;
  }
  // 顶部
  .my-top {
    height: 216px;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    color: @white-color;
    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 15px;
      .username {
        h3 {
          font-size: 21px;
          margin: 0;
        }
        p {
          opacity: 0.7;
          font-size: 12px;
        }
      }
      .avatar {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.38);
        img {
          width: 100%;
        }
      }
    }
    .user-data {
      ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          .number {
            font-size: 21px;
            font-weight: 700;
          }
          .info {
            opacity: 0.7;
            font-size: 12px;
          }
        }
      }
    }
  }
  .my-main {
    position: relative;
    padding: 0 15px;
    background-color: @bg-color;
    border: 1px solid transparent;
    .gangwei {
      position: absolute;
      top: -15px;
      width: 345px;
      .van-cell {
        border-radius: 10px;
      }
    }
    .interview-data {
      padding: 10px 15px;
      margin: 40px 0 10px 0;
      border-radius: 10px;
      background-color: @white-color;
      .interview-data-title {
        margin: 10px 0;
      }
      .interview-data-body {
        display: flex;
        justify-content: space-around;
        border-radius: 10px;

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          .data-change {
            font-size: 10px;
            color: @minor-font-color;
            span {
              color: @assist-color;
            }
          }
          .data-total-number {
            font-size: 21px;
            font-weight: 700;
            color: @main-font-color;
          }
          .data-total-info {
            font-size: 12px;
            color: @subdominant-font-color;
          }
        }
      }
    }
    .cell-list {
      border-radius: 10px;
      overflow: hidden;
    }
  }
}
</style>
