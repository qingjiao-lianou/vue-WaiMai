<template>
  <div class="login">
    <!-- 顶部标题 -->
    <div class="login_title">
      <van-icon class="login_back" name="arrow-left" @click="handleBack" />
      <div class="login_name">密码登录</div>
    </div>
    <!-- 表单 -->
    <van-cell-group style="margin-top:10px">
      <van-field v-model="username" placeholder="账号" />
      <van-field
        :type="type"
        v-model="password"
        placeholder="密码"
        :right-icon="rightIcon"
        @click-right-icon="handleIcon"
      />
      <van-field v-model="captcha_code" placeholder="验证码" />
    </van-cell-group>
    <!-- 验证码 -->
    <div class="AuthCode">
      <img class="code_img" :src="AuthCode" alt />
      <div class="code_text" @click="handleCode">
        <div class="code_text_one">看不清？</div>
        <div class="code_text_two">换一张</div>
      </div>
    </div>
    <!-- 温馨提示 -->
    <div class="hint">
      <div class="hint_title hint_title_css">温馨提示：未注册过的账号，登录时将自动注册</div>
      <div class="hint_title">注册过的用户可凭账号密码登录</div>
    </div>
    <!-- 登录按钮 -->
    <van-button type="primary" size="large" url="#" @click="handleLogin">登录</van-button>
    <!-- 重置密码 -->
    <router-link class="reset" to="#">重置密码？</router-link>
  </div>
</template>

<script>
import { getAuthCode,mobileCode } from "@/api/homeApi";
import { Dialog } from "vant";

export default {
  data() {
    return {
      username: "",
      password: "",
      captcha_code: "", //验证码
      rightIcon: "eye-o", //密码显示图标
      type: "text", //输入框类型
      AuthCode: "" //验证码图片
    };
  },
  methods: {
    //  返回
    handleBack() {
      this.$router.push({ name: "home" });
    },
    // 改变密码框状态
    handleIcon() {
      this.rightIcon = this.rightIcon === "eye-o" ? "closed-eye" : "eye-o";
      this.type = this.type === "text" ? "password" : "text";
    },
    // 获取验证码图片
    async getCode() {
      const res = await getAuthCode();
      console.log(res);
      
      this.AuthCode = res.data.code;
    },
    // 切换验证码
    handleCode() {
      this.getCode();
    },
    // 登录
    handleLogin() {
      // 验证用户名
      if (this.username === "") {
        Dialog.alert({
          title: "提示！",
          message: "账号不能为空"
        });
        return;
      }
      // 验证密码
      if (this.password === "") {
        Dialog.alert({
          title: "提示！",
          message: "密码不能为空"
        });
        return;
      }
      // 验证验证码
      if (this.captcha_code === "") {
        Dialog.alert({
          title: "提示！",
          message: "验证码不能为空"
        });
        return;
      }
    }
  },
  mounted() {
    this.getCode();
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  // width: 100%;
  background-color: #f5f5f5;
  .login_title {
    height: 50px;
    background-color: #3190e8;
    .login_back {
      color: aliceblue;
      line-height: 50px;
    }
    .login_name {
      position: absolute;
      font-size: 20px;
      font-weight: 600;
      color: aliceblue;
      top: 15px;
      left: 146px;
    }
  }
  .AuthCode {
    display: flex;
    // float: right;
    position: absolute;
    right: 0px;
    top: 155px;
    .code_img {
      margin-right: 15px;
    }
    .code_text {
      .code_text_one {
        font-size: 12px;
        padding-bottom: 5px;
      }
      .code_text_two {
        font-size: 12px;
        color: #3190e8;
      }
    }
  }
  .hint {
    display: inline-block;
    padding: 10px;
    .hint_title {
      font-size: 12px;
      color: rgb(255, 51, 0);
    }
    .hint_title_css {
      margin-bottom: 15px;
    }
  }
  /deep/ .van-button--large {
    width: 95%;
    margin-left: 2.5%;
    border-radius: 10px;
  }
  .reset {
    font-size: 14px;
    color: #3190e8;
    float: right;
    margin-right: 5px;
    margin-top: 20px;
  }
}
</style>