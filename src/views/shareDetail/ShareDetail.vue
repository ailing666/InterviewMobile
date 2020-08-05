<template>
  <div class="shareDetail">
    <!-- 导航栏 -->
    <AlNavBar @onClickLeft="$router.push('/find')"></AlNavBar>
    <!-- 骨架屏 -->
    <van-skeleton
      title
      avatar
      :row="20"
      v-if="shareDetail === ''"
    ></van-skeleton>
    <!-- 顶部 -->
    <template v-else>
      <router-view></router-view>
      <div class="top-box">
        <div class="title">
          {{ shareDetail.title }}
        </div>
        <div class="info-box">
          <img :src="shareDetail.author.avatar" alt="" />
          <div class="name-box">
            <span class="name">{{ shareDetail.author.nickname }}</span>
            <span class="time">{{ shareDetail.created_at | formatTime }}</span>
          </div>
        </div>
      </div>
    </template>
    <!-- 内容 -->
    <div class="experience-content" v-html="shareDetail.content"></div>
    <!-- 评论 -->
    <div class="comment-box">
      <!-- 顶部评论 -->
      <div class="title">评论 <span class="num">68</span></div>
      <!-- 每一项 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="comment"
          v-show="item.content !== ''"
          v-for="item in commentsList"
          :key="item.id"
        >
          <!-- 姓名 点赞区域 -->
          <div class="info-box">
            <img :src="item.author.avatar && item.author.avatar" alt="" />
            <div class="name-box">
              <span class="name" @click="showPop(item)">{{
                item.author.nickname
              }}</span>
              <span class="time">{{ item.created_at | formatTime }}</span>
            </div>
            <!-- 点赞 -->
            <div class="zan-box" @click="starArticle(item)">
              <span>{{ item.star || 0 }}</span>
              <i
                class="iconfont iconbtn_dianzan_small_nor"
                :class="{ actived: isComment }"
              ></i>
            </div>
          </div>
          <!-- 评论内容 -->
          <div class="content-box">
            <div class="content">
              {{ item.content }}
            </div>
            <div
              class="reply-box"
              v-for="it in item.children_comments"
              :key="it.id"
            >
              <div class="reply">
                <span class="name">{{ it.author }}</span>
                {{ it.content }}
              </div>
            </div>
          </div>
          <!-- 回复评论 -->
        </div>
      </van-list>
      <div class="comment">
        <!-- 底部盒子 -->
        <div class="bottom-box">
          <!--弹出评论框-->
          <div class="input" @click="showPop()">我来补充两句</div>
          <div class="shoucang">
            <i class="iconfont iconbtn_shoucang_nor"></i>
            234
          </div>
          <div class="star" @click="starArticle()">
            <i
              class="iconfont iconbtn_dianzan_small_nor"
              :class="{ actived: isStar }"
            ></i>
            125
          </div>
          <div class="share" @click="showShare = true">
            <i class="iconfont iconbtn_share"></i>
            998
          </div>
        </div>
      </div>
    </div>
    <!-- 底部回复弹出层 -->
    <van-popup
      class="input-pop"
      v-model="show"
      position="bottom"
      :style="{ height: '24%' }"
    >
      <van-field
        autosize
        type="textarea"
        autofocus
        v-model="value"
        :placeholder="placeholder"
        rows="4"
      />
      <span @click="submit">发送</span>
    </van-popup>
    <!-- 分享弹出层 -->
    <van-popup v-model="showShare">
      <div class="share-box">
        <div class="text">
          长按图片下载并分享
        </div>
        <div class="share-content-box">
          <div class="title">
            拿到百度音乐的offer后，我总结了面试产品实习的几点经验
          </div>
          <div class="user-box">
            <img src="../../assets/logo.png" alt="" />
            <span>热爱生活</span>
          </div>
          <div class="content">
            先说一下我的基本情况，本人是北京大学前沿交叉学院数据科学专业研一学生，本科在兰州大学信息安全专业。之所以选择走产品而不是技术，代码能力马马虎虎，而且对编程不感兴趣，最关键的是我性格比较外向，比起每天闷头敲代码，更喜欢和人打交道。于是乎，我开始从各种渠道了解产品经理的前世今生，从《人人都是产品经理》这本书和人人都是产品经理社区，再到知乎，了解到了很多笼统的概念，但是感觉如果没有亲身经历，理论和框架就显得很空洞，而且产品不像技术，门槛相对略低，所以更需要实习的经历，再加上本科的时候从未有过实习经历，所以我很迫切的想找一份产品实习。在面试了滴滴出行、回家吃饭和百度音乐之后，拿到了后面两家的Offer，最终选择了百度音乐。
          </div>
          <img class="logo" src="../../assets/logo.png" alt="" />
          <img class="code" src="../../assets/logo.png" alt="" />
          <div class="direction">长按识别二维码查看原文</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  shareDetail,
  commentsDetail,
  sendComment,
  starArticle,
  starComment
} from '@/api/detail'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ShareDetail',
  data () {
    return {
      // 弹出框是否显示
      show: false,
      showShare: false,
      // 弹出框对应的value
      value: '',
      // 分享详情数组
      shareDetail: '',
      // 是否加载
      loading: false,
      // 加载完成
      finished: false,
      // 获取数据起始索引
      start: 0,
      // 获取数据页容量
      limit: 5,
      // 评论列表
      commentsList: [],
      // placeholder占位符
      placeholder: '我来补充两句',
      // 回复的评论数据对象
      parentComment: '',
      commentId: ''
    }
  },
  created () {
    // 将id作为参数调用接口
    shareDetail(this.$route.params.id).then(res => {
      this.$avatar(res.data.author)
      this.shareDetail = res.data
    })
  },
  methods: {
    ...mapMutations(['SETPROPVALUE']),
    // 加载事件
    onLoad () {
      // 加载评论列表
      commentsDetail({
        id: this.$route.params.id,
        start: this.start,
        limit: this.limit
      }).then(res => {
        res.data.list.forEach(item => {
          // 处理头像
          this.$avatar(item.author)
        })
        // 追加数据
        this.commentsList.push(...res.data.list)
        //  关闭loading
        this.loading = false
        //  累加页码
        this.start += this.limit
        //  判断是否结束
        this.commentsList.length >= res.data.total && (this.finished = true)
      })
    },
    // 弹出评论框
    showPop (item) {
      // 保存回复评论的对象
      this.parentComment = item
      // 显示弹出框
      this.show = true
      // 修改对应的placeholder
      item
        ? (this.placeholder = `回复: ${item.author.nickname}`)
        : (this.placeholder = '我来补充两句')
    },
    // 发送评论
    async submit () {
      try {
        await this.$isLogin()
        // 登录了
        const data = {
          content: this.value
        }
        // 根据是否有parentComment 生成数据对象
        this.parentComment
          ? (data.parent = this.parentComment.id)
          : (data.article = this.$route.params.id)
        // 调用接口
        if (data.content !== '') {
          const res = await sendComment(data)
          // 根据data中的参数判断是回复别人还是评价文章
          if (res.data.parent) {
            // 添加到父评论中
            this.parentComment.children_comments.push(res.data)
            // 清空父评论
            this.parentComment = ''
          } else {
            this.$avatar(res.data.author)
            // 追加到数组的顶端
            this.commentsList.unshift(res.data)
          }
          // 提示用户成功
          this.$toast.success('发表成功')
          // 关闭框框
          this.show = false
          // 清空输入框
          this.value = ''
        } else {
          this.$toast.fail('你没写东西呀')
        }
      } catch {
        // 没登录
        window.console.log('没登录')
      }
    },
    // 点赞
    async starArticle (item) {
      window.console.log('item', item)
      this.$toast.loading({ duration: 0 })
      // 判断用户是否登陆
      await this.$isLogin()
      // 调用点赞接口
      if (item) {
        this.commentId = item.id
        const res = await starComment({ id: item.id })
        this.SETPROPVALUE({
          propName: 'starComments',
          propValue: res.data.list
        })
        window.console.log('res', res)
      } else {
        const res = await starArticle({ article: this.$route.params.id })
        this.SETPROPVALUE({
          propName: 'starArticles',
          propValue: res.data.list
        })
      }

      this.$toast.clear()
    }
  },
  computed: {
    ...mapState(['userInfo']),
    isStar () {
      // 判断用户是否登陆
      if (this.userInfo) {
        // 登陆了,获取当前的文章id 需要转为number
        const id = +this.$route.params.id

        // 获取用户点赞的id数组
        const isStar = this.userInfo.starArticles.includes(id)
        return isStar
      } else {
        // 没有登陆
        return false
      }
    },
    isComment () {
      if (this.userInfo) {
        const isComment = this.userInfo.starComments.includes(this.commentId)
        return isComment
      } else {
        // 没有登陆
        return false
      }
    }
  }
}
</script>

<style lang="less">
.shareDetail {
  background-color: @white-color;
  .van-nav-bar__left {
    padding-left: 0;
  }
  .actived {
    color: @main-color !important;
  }
  .iconbtn_nav_back {
    font-size: 44px;
  }
  .top-box {
    background-color: @white-color;
    padding: 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }
  .info-box {
    margin-top: 15px;
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 9px;
    }
    .name-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .name {
        font-size: 12px;
        font-weight: 600;
        color: @subdominant-font-color;
      }
      .time {
        font-size: 12px;
        color: @minor-font-color;
      }
    }
    .zan-box {
      span {
        color: @minor-font-color;
        font-size: 12px;
      }
      .iconfont {
        color: @minor-font-color;
        font-size: 24px;
      }
    }
  }
  .experience-content {
    padding: 15px;
    font-size: 16px;
    color: @main-font-color;
    background-color: @white-color;
    img {
      width: 100%;
      display: block;
    }
  }
  .comment-box {
    margin-top: 10px;
    background-color: @white-color;
    padding: 26px 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
      position: relative;
      span {
        color: @minor-font-color;
        font-size: 12px;
        position: absolute;
        left: 40px;
        top: -5px;
      }
    }
    .content-box {
      padding-left: 44px;
      .content {
        margin-top: 11px;
        font-size: 16px;
        color: @main-font-color;
        line-height: 27px;
      }
      .reply-box {
        margin-top: 5px;
        padding-top: 5px;
        padding-left: 15px;
        padding-bottom: 12px;
        background: @border-color;
        .reply {
          font-size: 14px;
          color: @subdominant-font-color;
          word-break: break-all;
          &:not(:first-child) {
            margin-top: 15px;
          }
          .name {
            font-weight: 500;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .bottom-box {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 85px;
    display: flex;
    box-sizing: border-box;
    padding: 10px 15px 0;
    background-color: @white-color;
    width: 100%;
    justify-content: space-between;
    .input {
      height: 34px;
      background: @border-color;
      border-radius: 4px;
      flex: 1;
      font-size: 14px;
      margin-top: 10px;
      color: @subdominant-font-color;
      margin-right: 24px;
      line-height: 34px;
      padding-left: 6px;
    }
    div:not(.input) {
      font-size: 12px;
      color: @subdominant-font-color;
      i {
        display: block;
        font-size: 28px;
      }
    }
    .shoucang {
      margin-right: 24px;
    }
    .star {
      margin-right: 24px;
    }
  }
  .input-pop {
    padding: 25px 15px 0;
    overflow: hidden;
    box-sizing: border-box;
    // 弹出层
    .van-cell::after {
      border-bottom: none;
    }
    .van-field {
      height: 99px;
      width: 100%;
      background: @border-color;
      border-radius: 4px;
    }
    span {
      font-size: 16px;
      color: @subdominant-font-color;
      float: right;
      margin-top: 11px;
    }
  }
  // 底部弹出层
  .share-box {
    width: 311px;
    height: 553px;
    background-size: 100% 100%;
    background-position-x: 0;
    background-position-y: 0;
    padding: 0 15px 15px;
    // background-image: url('../../assets/ios3x_img_share_bj@3x.png');
    display: flex;
    flex-direction: column;
    .text {
      text-align: center;
      font-size: 12px;
      color: @white-color;
      padding: 15px;
    }
    .share-content-box {
      flex: 1;
      background-color: @white-color;
      border-radius: 10px;
      padding: 0 15px;
      .title {
        font-size: 16px;
        margin-top: 20px;
      }
      .user-box {
        margin-top: 15px;
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-right: 5px;
        }
        span {
          font-size: 12px;
        }
      }
      .content {
        font-size: 16px;
        margin-top: 20px;
        height: 165px;
        overflow: hidden;
        position: relative;
        &::after {
          content: '';
          width: 100%;
          bottom: 0;
          left: 0;
          height: 25px;
          background-color: @white-color;
          opacity: 0.9;
          position: absolute;
        }
      }
      .logo {
        width: 150px;
        display: block;
        margin: 20px auto;
      }
      .code {
        margin: 0 auto;
        display: block;
        width: 80px;
      }
      .direction {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
        color: @minor-font-color;
      }
    }
  }
}
</style>
