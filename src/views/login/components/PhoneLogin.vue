<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        name="username"
        type="text"
        auto-complete="off"
        placeholder="Phone"
        clearable
      >
        <i slot="prefix" class="el-input__icon el-icon-phone-outline" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <div style="display:flex">
        <el-input
          @keyup.enter.native="handleLogin"
          :type="passwordType"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="Code"
          clearable
          style="flex-grow:1"
        >
          <i slot="prefix" class="el-input__icon el-icon-message" />
          <i class="el-input__icon el-icon-view" slot="suffix" @click="showPassword"></i>
        </el-input>
        <div style="flex:none;display:inline-block;width:70px;height:32px">
          <span class="msg-text" :class="[{ display: false }]">{{ 'Send Code' }}</span>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native.prevent="handleLogin" class="login-submit">{{ 'Sign In' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'PhoneLogin',
  data() {
    return {
      checked: false,
      loginForm: {
        username: '15550001555',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, message: 'Phone required', trigger: 'blur' }],
        password: [{ required: true, message: 'Code required', trigger: 'blur' }]
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
.msg-text {
  display: block;
  width: 100%;
  font-size: 12px;
  text-align: right;
  cursor: pointer;
  color: #909399;
}

.msg-text.display {
  color: #ccc;
}

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
