<template>
  <div class="user">
    <AlNavBar title="我的资料" @onClickLeft="backToMy"></AlNavBar>
    <div class="userinfo-main">
      <div class="user-data">
        <AlCell title="头像">
          <template>
            <img class="avatar" :src="USERAVATAR" alt="" />
          </template>
        </AlCell>
      </div>
      <div class="user-list">
        <AlCell title="昵称" :value="userInfo.nickname"> </AlCell>
        <AlCell title="性别" :value="GENDER" @click="changeGender"></AlCell>
        <AlCell title="地区" :value="SETAREA"></AlCell>
        <AlCell title="个人简介" value="主任有点懒,什么都没有写"></AlCell>
      </div>
      <van-button class="btn" @click="loginOut" type="default" size="large"
        >退出登录</van-button
      >
    </div>
    <van-popup
      v-model="show"
      position="buttom"
      :style="{ height: '40%', width: '100%' }"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { removeToken } from '@/utils/token.js'
export default {
  data () {
    return {
      show: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  },
  methods: {
    ...mapMutations(['SAVEUSERINFO', 'SETISLOGIN']),
    changeGender () {
      this.show = true
    },
    backToMy () {
      this.$router.push('/my')
    },
    loginOut () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '您确定要退出吗'
        })
        .then(() => {
          removeToken()
          this.SAVEUSERINFO('')
          this.SETISLOGIN(false)
          this.$router.oush('/find')
        })
        .catch(() => {
          window.console.log('我不走了')
        })
    },
    onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onChange (picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel () {
      this.$toast('取消')
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['USERAVATAR', 'CORRECTRATE', 'GENDER', 'SETAREA'])
  }
}
</script>

<style lang="less">
.user {
  background-color: @bg-color;
  .userinfo-main {
    padding: 0 15px;
    .user-data {
      margin: 20px 0 10px 0;
      border-radius: 10px;
      overflow: hidden;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .user-list {
      border-radius: 10px;
      overflow: hidden;
    }
    .btn {
      margin-top: 10px;
      font-size: 16px;
      color: @main-color;
      border-radius: 10px;
    }
  }
}
</style>
