<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        name="username"
        type="text"
        auto-complete="off"
        placeholder="Email"
        clearable
      >
        <i slot="prefix" class="el-input__icon el-icon-message" />
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native.prevent="handleLogin" class="login-submit">{{ 'Recover Password' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'EmailRecover',
  data() {
    return {
      checked: false,
      loginForm: {
        username: '',
        password: 'root'
      },
      loginRules: {
        username: [{ required: true, message: 'Email required', trigger: 'blur' }],
        password: [{ required: true, message: 'Password required', trigger: 'blur' }]
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
          let loading = this.$loading({
            lock: true,
            text: 'Sign In...',
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

  ::v-deep i,
  ::v-deep .el-checkbox__label {
    color: #000 !important;
  }

  a {
    font-size: 0.8rem;
    opacity: 0.5;
    color: #000;
    float: right;

    &:hover {
      opacity: 1;
    }
  }

  .login-submit {
    width: 100%;
    letter-spacing: 2px;
    font-weight: 300;
  }
}
</style>
