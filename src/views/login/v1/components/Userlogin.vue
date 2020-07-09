<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        name="username"
        type="text"
        auto-complete="on"
        placeholder="请输入账号"
      >
        <i slot="prefix" class="el-icon-user el-input__icon" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="on" placeholder="请输入密码">
        <i slot="prefix" class="el-icon-lock el-input__icon" />
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native.prevent="handleLogin" class="login-submit">{{ 'Sign In' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Userlogin',
  data() {
    return {
      loginForm: {
        username: 'root',
        password: 'root'
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      passwordType: 'password'
    }
  },
  methods: {
    showPassword() {
      this.passwordType == '' ? (this.passwordType = 'password') : (this.passwordType = '')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '登录中,请稍后...',
            spinner: 'el-icon-loading'
          })
          this.$store
            .dispatch('app/signIn', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/' }).catch(err => err)
            })
            .finally(() => {
              loading.close()
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  margin: 10px 0;

  .login-submit {
    width: 100%;
    letter-spacing: 2px;
    font-weight: 300;
  }
}
</style>
