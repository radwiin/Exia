<template>
  <el-form class="login-form">
    <el-form-item>
      <el-button type="primary" class="login-submit" style="background-color:#1551b1; border-color:#1551b1;">Facebook</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-submit" style="background-color:#00aaff; border-color:#00aaff">Twitter</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-submit" style="background-color:#4285F4; border-color:#4285F4">Google</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-submit" style="background-color:#333; border-color:#333">Github</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'OtherLogin',
  data() {
    return {}
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
