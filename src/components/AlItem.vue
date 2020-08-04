<template>
  <div class="item van-hairline--bottom" >
<!--    点击跳转携带id-->
    <h3 v-html="item.title" @click="$router.push(`/shareDetail/${item.id}`)"></h3>
    <div class="desc" @click="$router.push(`/shareDetail/${item.id}`)">{{item.content}}</div>
    <div class="detail-box">
      <div class="user">
        <img :src="item.author.avatar" alt="" />
      {{item.author.nickname}}
      </div>
      <div class="time">{{item.created_at | formatTime}}</div>
      <div class="comment">
        <i class="iconfont iconicon_pinglunliang"></i>
       {{item.article_comments}}
      </div>
      <div class="star">
        <i class="iconfont iconicon_dianzanliang"></i>
       {{item.star}}
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'AlItem',
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {

  }
}
</script>

<style lang="less">

      .item {
        h3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 14px;
          font-weight: 600;
            span {
              color: @main-color;
            }
        }
        .desc {
          font-size: 12px;
          color: @subdominant-font-color;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .detail-box {
          display: flex;
          align-items: center;
          .user {
            display: flex;
            align-items: center;
            color: @subdominant-font-color;
            font-size: 12px;
            flex: 1;
            img {
              width: 22px;
              height: 22px;
              border-radius: 50%;
            }
          }
          .time,
          .comment,
          .star {
            font-size: 12px;
            color: @minor-font-color;
          }
          .time {
            margin-right: 20px;
          }
          .comment {
            margin-right: 20px;
            display: flex;
            align-items: center;
            i {
              font-size: 16px;
            }
          }
          .star {
            display: flex;
            align-items: center;
            i {
              font-size: 16px;
            }
          }
    }
  }

</style>
