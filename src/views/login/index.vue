<template>
  <div class="page-container">
    <div class="login-wrapper">
      <header class="login-header">
        <div class="login-header-title">Welcome to <b>Exia</b></div>
      </header>
      <div class="login-content">
        <user-login />
      </div>
      <footer class="login-footer">
        <div class="new">
          New Here?
          <a href="/" class="router-link-active">Create New Account</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import UserLogin from './components/Userlogin'
export default {
  name: 'login',
  components: {
    UserLogin
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('~@/assets/login-bg.jpg');
  background-size: cover;
  background-position: center center;

  .login-wrapper {
    width: 400px;
    background-color: hsla(0, 0%, 100%, 0.35);
    backdrop-filter: saturate(180%) blur(20px);
    border-radius: 20px;
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.4);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: stretch;

    .login-header {
      height: 50px;
      padding: 10px 16px;

      .login-header-title {
        padding: 10px 10px 0;
      }
    }

    .login-content {
      width: 100%;
      padding: 10px 16px 0;
    }

    .login-footer {
      margin: 0 0 10px;
      padding: 0;
      font-size: 0.7rem;

      .new a {
        color: #409eff;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
