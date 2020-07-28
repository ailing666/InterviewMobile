<template>
  <div class="userinfo">
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
        <AlCell title="昵称" value="续命咖啡"></AlCell>
        <AlCell title="性别" value="男"></AlCell>
        <AlCell title="地区" value="北京市"></AlCell>
        <AlCell title="个人简介" value="主任有点懒,什么都没有写"></AlCell>
      </div>
      <van-button class="btn" size="large">退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less">
.userinfo {
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
