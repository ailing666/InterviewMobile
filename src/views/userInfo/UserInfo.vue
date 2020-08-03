<template>
  <div class="user">
    <AlNavBar title="我的资料" @onClickLeft="backToMy"></AlNavBar>
    <div class="userinfo-main">
      <div class="user-data">
        <AlCell title="头像" @click="toEdit('avatar')">
          <template>
            <img class="avatar" :src="USERAVATAR" alt="" />
          </template>
        </AlCell>
      </div>
      <div class="user-list">
        <AlCell
          title="昵称"
          :value="userInfo.nickname"
          @click="toEdit('nickname')"
        >
        </AlCell>
        <AlCell
          title="性别"
          :value="GENDER"
          @click="isShowGender = true"
        ></AlCell>
        <AlCell
          title="地区"
          :value="SETAREA"
          @click="isShowArea = true"
        ></AlCell>
        <AlCell
          class="intro"
          title="个人简介"
          :value="userInfo.intro"
          @click="toEdit('intro')"
        ></AlCell>
      </div>
      <van-button class="btn" @click="loginOut" type="default" size="large"
        >退出登录</van-button
      >
    </div>
    <van-popup
      v-model="isShowGender"
      position="buttom"
      @closed="onGenderCancel"
      :style="{ height: '40%', width: '100%' }"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onGenderConfirm"
        @cancel="onGenderCancel"
        :default-index="userInfo.gender"
        ref="genderPicker"
      />
    </van-popup>
    <van-popup
      v-model="isShowArea"
      position="buttom"
      :style="{ height: '40%', width: '100%' }"
    >
      <van-area
        title="标题"
        @confirm="onAreaConfirm"
        @cancel="onAreaCancel"
        :area-list="areaData"
        :columns-num="2"
        ref="area"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { removeToken } from '@/utils/token.js'
import { editUserInfo } from '@/api/user.js'
import areaData from '@/utils/area.js'
export default {
  data () {
    return {
      isShowGender: false,
      isShowArea: false,
      columns: ['未知', '男', '女'],
      areaData
    }
  },
  methods: {
    ...mapMutations(['SAVEUSERINFO', 'SETISLOGIN', 'SETPROPVALUE']),
    backToMy () {
      this.$router.push('/my')
    },
    toEdit (prop) {
      this.$router.push(`editinfo?prop=${prop}`)
    },
    // 退出事件
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
          this.$router.push('/find')
        })
        .catch(() => {
          window.console.log('我不走了')
        })
    },
    onAreaCancel () {
      this.$refs.area.reset(this.userInfo.area)
      this.isShowArea = false
    },
    onAreaConfirm (value, index) {
      this.$toast.loading({ duration: 0 })
      editUserInfo({ area: value[1].code }).then(res => {
        this.$toast.success('修改成功')
        this.isShowArea = false
        this.SETPROPVALUE({
          propName: 'area',
          propValue: value[1].code
        })
      })
    },
    // 选择
    onGenderConfirm (value, index) {
      this.$toast.loading({ duration: 0 })
      editUserInfo({ gender: index }).then(res => {
        this.$toast.success('修改成功')
        this.isShowGender = false
        this.SETPROPVALUE({
          propName: 'gender',
          propValue: index
        })
      })
    },

    onGenderCancel () {
      this.$refs.genderPicker.setColumnIndex(0, this.userInfo.gender)
      this.isShowGender = false
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
      .intro {
        .van-cell__value {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
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
