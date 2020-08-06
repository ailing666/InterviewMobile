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
          v-for="(item, index) in commentsList"
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
            <div class="zan-box" @click="starArticle(item, index)">
              <span>{{ commentsList[index].star || 0 }}</span>
              <i
                class="iconfont iconbtn_dianzan_small_nor"
                :class="{ actived: isStarComment(item.id) }"
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
            {{ shareDetail.collect }}
          </div>
          <div class="star" @click="starArticle()">
            <i
              class="iconfont iconbtn_dianzan_small_nor"
              :class="{ actived: isStar }"
            ></i>
            {{ shareDetail.star }}
          </div>
          <div class="share" @click="showSharePop">
            <i class="iconfont iconbtn_share"></i>
            {{ shareDetail.share || 0 }}
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
      <div class="share-box" v-if="!popImgUrl" ref="shareBox">
        <div class="text">
          长按图片下载并分享
        </div>
        <div class="share-content-box">
          <div class="title">
            {{ shareDetail.title }}
          </div>
          <div class="user-box">
            <img :src="USERAVATAR" alt="" />
            <span>{{ userInfo.nickname }}</span>
          </div>
          <div class="content">
            {{ shareDetail.contentText }}
          </div>
          <img class="logo" src="@/assets/img_share_logo@2x.png" alt="" />
          <!-- 二维码图片 -->
          <img class="code" :src="codeUrl" alt="" />
          <div class="direction">长按识别二维码查看原文</div>
        </div>
      </div>
      <!-- 有图就显示图片 -->
      <img v-else :src="popImgUrl" alt="" class="share-img" />
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
// 导入 二维码模块
import QRCode from 'qrcode'
// 导入 截图模块
import html2canvas from 'html2canvas'
import { mapState, mapMutations, mapGetters } from 'vuex'
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
      commentsId: '',
      num: 0,
      // 二维码地址
      codeUrl: '',
      // 弹框图片地址
      popImgUrl: ''
    }
  },
  created () {
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    // 将id作为参数调用接口
    shareDetail(this.$route.params.id).then(res => {
      this.$avatar(res.data.author)
      this.shareDetail = res.data
    })
  },
  // dom加载完毕
  async mounted () {
    // 使用QRCode生成二维码
    const codeUrl = await QRCode.toDataURL(window.location.href)
    this.codeUrl = codeUrl
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
        res.data.list.forEach((item, index) => {
          // 处理头像
          this.$avatar(item.author)
          // 去除空数组
          if (item.content.trim() === '') {
            res.data.list.splice(index, 1)
            this.num++
          }
        })
        // 追加数据
        this.commentsList.push(...res.data.list)
        //  关闭loading
        this.loading = false
        //  累加页码
        this.start += this.limit
        //  判断是否结束
        if (this.commentsList.length + this.num >= res.data.total) {
          this.finished = true
        }
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
        this.$toast.fail('没登录呀')
        this.$router.push(
          `/login?redirect=shareDetail/${this.$route.params.id}`
        )
      }
    },
    // 点赞
    async starArticle (item, index) {
      this.$toast.loading({ duration: 0 })
      try {
        // 判断用户是否登陆
        await this.$isLogin()
        // 调用点赞接口
        if (item) {
          const res = await starComment({ id: item.id })
          this.commentsList[index].star = res.data.num
          this.SETPROPVALUE({
            propName: 'starComments',
            propValue: res.data.list
          })
        } else {
          const res = await starArticle({ article: this.$route.params.id })
          this.SETPROPVALUE({
            propName: 'starArticles',
            propValue: res.data.list
          })
          this.shareDetail.star = res.data.num
        }
        this.$toast.clear()
      } catch {
        this.$router.push('/login')
      }
    },
    // 分享框
    async showSharePop () {
      // 判断是否登陆
      await this.$isLogin()
      // 弹出分享框
      this.showShare = true
      // 滚到顶部,解决有滚动距离时截图留白
      window.scrollTo(0, 0)
      // 保证一定能取到
      this.$nextTick(async () => {
        // 生成弹框截图
        const canvas = await html2canvas(this.$refs.shareBox, {
          // 解决图片不显示问题
          allowTaint: true,
          useCORS: true
        })
        // 转为 url
        const popImgUrl = canvas.toDataURL()
        // 保存url地址
        this.popImgUrl = popImgUrl
      })
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['USERAVATAR']),
    isStar () {
      // 判断用户是否登陆
      if (this.userInfo) {
        // 登陆了,获取当前的文章id 需要转为number
        const id = +this.$route.params.id
        // 获取用户点赞的id数组
        return this.userInfo.starArticles.includes(id)
      } else {
        // 没有登陆
        return false
      }
    },
    isStarComment () {
      return commentId => {
        if (this.userInfo) {
          return this.userInfo.starComments.includes(commentId)
        }
      }
    }
  }
}
</script>

<style lang="less">
.shareDetail {
  background-color: @white-color;
  box-sizing: border-box;
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
    padding-bottom: 85px;

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
    width: 100vw;
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
      text-align: center;
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
    padding: 25px 15px 0 15px;
    overflow: hidden;
    box-sizing: border-box;
    // 弹出层
    .van-cell::after {
      border-bottom: none;
      padding: 25px 85px 0 15px;
    }
    .van-field {
      height: 99px;
      width: 90vw;
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
    background-image: url('../../assets/img_share_bj@2x.png');
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
          opacity: 0.5;
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
  // 分享图片
  .share-img {
    width: 311px;
    height: 553px;
    display: block;
  }
}
</style>
