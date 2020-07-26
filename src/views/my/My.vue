<template>
  <div class="my">
    <div class="top">
      <img class="tool" src="@/assets/tool.jpg" alt="" />
      <div class="user">
        <div class="username">
          <h3>小艾同学</h3>
          <p>嘤嘤嘤嘤嘤嘤</p>
        </div>
        <div>
          <img class="avatar" src="@/assets/avatar.jpg" alt="" />
        </div>
      </div>
      <div class="data">
        <ul>
          <li>
            <div class="number">298</div>
            <p class="info">累计答题</p>
          </li>
          <li>
            <div class="number">98</div>
            <p class="info">收藏题目</p>
          </li>
          <li>
            <div class="number">198</div>
            <p class="info">我的错题</p>
          </li>
          <li>
            <div class="number">76%</div>
            <p class="info">正确率</p>
          </li>
        </ul>
        <van-cell-group>
          <van-cell title="单元格" value="内容" icon="location-o" right-icon />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.my {
  .tool {
    height: 44px;
    width: 100%;
  }
  .top {
    height: 216px;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 15px;
      .username {
        h3 {
          font-size: 21px;
          font-weight: 600;
          text-align: left;
          color: @white-color;
          letter-spacing: 0px;
          margin: 0;
        }
        p {
          opacity: 0.7;
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: @white-color;
          letter-spacing: 0px;
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
  }
  .data {
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        .number {
          width: 31px;
          height: 24px;
          font-size: 21px;
          font-weight: 700;
          text-align: center;
          line-height: 24px;
          letter-spacing: 0px;
          color: @white-color;
        }
        .info {
          height: 17px;
          opacity: 0.7;
          font-size: 12px;
          font-weight: 400;
          text-align: center;
          color: @white-color;
          line-height: 17px;
          letter-spacing: 0px;
        }
      }
    }
  }
}
</style>
