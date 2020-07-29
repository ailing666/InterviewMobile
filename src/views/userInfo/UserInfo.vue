<template>
  <div class="user">
    {{ userInfo }}
    <AlNavBar title="我的资料"></AlNavBar>
    <div class="userinfo-main">
      <div class="user-data">
        <AlCell title="头像">
          <template>
            <img class="avatar" src="@/assets/avatar.jpg" alt="" />
          </template>
        </AlCell>
      </div>
      <div class="user-list">
        <AlCell title="昵称" :value="userInfo.nickname"> </AlCell>
        <AlCell title="性别" :value="GENDER" @click="changeGender"></AlCell>
        <AlCell title="地区" :value="userInfo.area"></AlCell>
        <AlCell title="个人简介" value="主任有点懒,什么都没有写"></AlCell>
      </div>
      <van-button class="btn" size="large">退出登录</van-button>
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
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      show: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      genderObj: {
        0: '未知',
        1: '男',
        2: '女'
      }
    }
  },
  methods: {
    changeGender () {
      this.show = true
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
    ...mapGetters(['USERAVATAR', 'CORRECTRATE', 'GENDER'])
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
      .van-cell {
        height: 60px;
      }
      .avatar {
        width: 40px;
        height: 40px;
      }
    }
    .user-list {
      border-radius: 10px;
      overflow: hidden;
    }
    .btn {
      font-size: 16px;
      color: @main-color;
      margin-top: 10px;
      border-radius: 10px;
    }
  }
}
</style>
