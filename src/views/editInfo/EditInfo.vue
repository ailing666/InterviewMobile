<template>
  <div class="editInfo">
    <!-- 导航栏 -->
    <AlNavBar
      :title="title"
      @onClickLeft="back"
      @onClickRight="submit"
      rightText="保存"
    ></AlNavBar>
    <div class="main-box">
      <!-- 输入框 -->
      <van-field
        type="text"
        v-if="this.$route.query.prop !== 'avatar'"
        v-model="inputValue"
      />
      <!-- 上传组件 -->
      <van-uploader
        v-else
        :after-read="afterRead"
        v-model="fileList"
        :max-count="1"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { editUserInfo, uploadFile } from '@/api/user.js'
export default {
  name: 'editInfo',
  data () {
    return {
      inputValue: '',
      fileList: [{ url: '' }],
      title: '',
      avatarId: ''
    }
  },
  created () {
    const propName = this.$route.query.prop
    window.console.log(propName)
    const titleObj = {
      avatar: '头像',
      nickname: '昵称',
      intro: '简介',
      position: '职位'
    }
    this.title = `修改${titleObj[propName]}`
    if (propName !== 'avatar') {
      this.inputValue = this.userInfo[propName]
    } else {
      this.fileList[0].url = this.USERAVATAR
    }
  },

  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['USERAVATAR'])
  },
  methods: {
    ...mapMutations(['SETPROPVALUE']),
    // 上传成功后的回调函数
    afterRead (fileInfo) {
      uploadFile(fileInfo.file).then(res => {
        window.console.log(res)
        this.avatarId = res.data[0].id
      })
    },
    back () {
      this.$router.go(-1)
    },
    // 提交
    submit () {
      var propName = this.$route.query.prop
      var propValue = this.inputValue
      // 生成一个动态对象
      const data = {}
      // 向data对象中动态添加键值对
      data[propName] = propName !== 'avatar' ? propValue : this.avatarId
      editUserInfo(data).then(res => {
        this.$toast.loading({ duration: 0 })
        this.$toast.success('修改成功')
        if (propName !== 'avatar') {
          this.SETPROPVALUE({ propName, propValue })
        } else {
          window.console.log('实际传的', res.data)
          this.SETPROPVALUE({
            propName,
            propValue: res.data.avatar
          })
        }
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="less">
.editInfo {
  background-color: @white-color;
  // 设置高度 使用vh的话 ,1vh 等于 1%的屏幕高度
  // 如果用`height:100%`
  height: 100vh;
  .main-box {
    padding: 15px;
    text-align: center;
    .van-field {
      background-color: @bg-color;
      border-radius: 8px;
    }
  }
}
</style>
