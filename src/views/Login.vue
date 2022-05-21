<template>
  <div class="p-login">
    <!-- 增加进入的过渡动画 -->
    <transition name="fade-down" appear>
      <div class="p-login-bar">
        <div class="p-title">便利淘后台管理系统</div>
        <!-- 利用form组件构造的结构 -->
        <el-form :model="formData" ref="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user"
              clearable
              v-model="formData.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-key"
              clearable
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-btn">
            <el-button type="primary" @click="handleLogin">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import { login } from "../api/user-api.js";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不可以为空", trigger: "change" },
        ],
        password: [
          { required: true, message: "密码不可以为空", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["getActiveMenu"]),
  },
  methods: {
    ...mapActions(["fetchMenuByRoleId"]),
    async handleLogin() {
      let valid = await this.$refs.loginForm.validate().catch((err) => err);
      if (valid) {
        let res = await login(this.formData.username, this.formData.password);
        if (res.data.code === 200) {
          if (res.data.roleId === 1 || res.data.roleId === 0) {
            sessionStorage.userInfo = JSON.stringify(res.data.userInfo);
            sessionStorage.token = res.data.token;
            sessionStorage.roleId = res.data.roleId;
            await this.fetchMenuByRoleId(res.data.roleId);
            this.$router.push("/echars");
          } else {
            this.$notify({
              type: "error",
              title: "提示",
              message: "登录失败",
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped="scoped">
.p-login {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/bg.jpg);
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: 100% 100%;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #cccccc;

  .p-login-bar {
    position: absolute;
    left: 35%;
    top: 48%;
    width: 300px;
    height: 400px;
    transform: translate(-50%, -50%);
    padding: 15px 30px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 9px;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
    .p-title {
      margin: 10px 0 30px 0;
      color: #fff;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      padding: 15px 0px;
    }
    .el-input {
      margin: 10px 0 10px 0;
      background-color: rgba(255, 255, 255, 0.3) !important;
    }
    .el-button--primary {
      margin-top: 20px;
      width: 100%;
    }
    .form-btn {
      text-align: center;
    }
  }
  .fade-down-enter-active {
    animation: fade-down 0.3s;
  }
  .fade-down-leave-active {
    animation: fade-down 0.3s reverse;
  }
  @keyframes fade-down {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
