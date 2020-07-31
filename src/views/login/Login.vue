<template>
  <div class="login">
    <AlNavBar @onClickLeft="onClickLeft"></AlNavBar>
    <div class="login-main">
      <h4>您好,请登录</h4>
      <van-form @submit="onSubmit" ref="loginForm">
        <van-field
          v-model="mobile"
          name="mobile"
          type="tel"
          placeholder="请输入手机号"
          :rules="[
            {
              pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
              message: '这都不会,干什么吃的',
              required: true
            }
          ]"
        >
          <template #left-icon>
            <i class="iconfont iconbianzu1"></i>
          </template>
        </van-field>
        <van-field
          v-model="code"
          name="code"
          type="number"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #left-icon>
            <i class="iconfont iconyanzhengma"></i>
          </template>
          <template #button>
            <span @click="getCode">{{
              time === 0 ? '获取验证码' : `${time}s后重新获取`
            }}</span>
          </template>
        </van-field>
        <p class="link">
          登录即同意<span>《用户登录协议》</span>和<span>《隐私协议》</span>
        </p>
        <van-button class="btn" type="danger" size="large">确定</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getCode, login } from '@/api/login.js'
import { saveToken } from '@/utils/token.js'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      mobile: '',
      code: '',
      time: 0
    }
  },
  methods: {
    ...mapMutations(['SAVEUSERINFO', 'SETISLOGIN']),
    // 提交事件
    onSubmit (value) {
      login(value).then(res => {
        saveToken(res.data.jwt)
        this.SAVEUSERINFO(res.data.user)
        this.SETISLOGIN(true)
        // 看看他有没有上一个的redirect
        if (this.$route.query.redirect) {
          // 登录成功返回上一页
          this.$router.push(`${this.$route.query.redirect}`)
        } else {
          // 登录失败去发现页
          this.$router.push('/finder')
        }
      })
    },
    // 点击左侧返回按钮
    onClickLeft () {
      if (this.$route.query.redirect) {
        // 打过来的 返回发现页
        this.$router.push('/find')
      } else {
        // 是用户直接访问的 直接返回
        this.$router.go(-1)
      }
    },
    // 获取验证码
    getCode () {
      // 当倒计时不为0时,return
      if (this.time !== 0) {
        return
      }
      // 局部校验手机号
      this.$refs.loginForm.validate('mobile').then(res => {
        // 一个不消失的loading轻提示
        this.$toast.loading({
          duration: 0
        })
        // 设置倒计时时间为30
        this.time = 30
        // 开启定时器
        const interId = setInterval(() => {
          this.time--
          // 当时间到0时
          if (this.time === 0) {
            clearInterval(interId)
          }
        }, 1000)
        getCode({ mobile: this.mobile }).then(res => {
          this.$toast.success(res.data)
        })
      })
    }
  }
}
</script>

<style lang="less">
.login {
  .login-main {
    padding: 15px;
    .link {
      font-size: 12px;
      color: @main-font-color;
    }
    span {
      color: @assist-color;
    }
    .btn {
      margin-top: 20px;
      border-radius: 22px;
    }
  }
}
</style>
