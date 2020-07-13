<template>
  <div class="page-container">
    <div class="card-wrapper">
      <div class="left-wrapper">
        <svg-icon class="logo" icon-class="vue" class-name="vue" />
      </div>
      <div class="right-wrapper">
        <div class="login-wrapper">
          <header class="login-header">
            <div class="login-header-title">Login Exia</div>
            <div class="login-header-sub-title">Welcome back, please login to your account.</div>
          </header>
          <div class="login-content">
            <user-login />
          </div>
          <footer class="login-footer">
            <div class="new">
              New Here?
              <a class="router-link-active">Create New Account</a>
            </div>
          </footer>
        </div>
      </div>
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
  background: #1e2023;
  display: flex;
  justify-content: center;
  align-items: center;

  .card-wrapper {
    width: 800px;
    min-height: 450px;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.4);

    .left-wrapper {
      width: 50%;
      background-color: #000;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      .logo {
        width: 30%;
        height: 30%;
        color: #fff;
      }
    }

    .right-wrapper {
      width: 50%;
      background-color: #fff;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      .login-wrapper {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        .login-header {
          width: 100%;
          padding: 28px 28px 0;

          .login-header-title {
            margin-bottom: 1rem;
            font-weight: 500;
            line-height: 1.2;
            color: #2c2c2c;
          }

          .login-header-sub-title {
            font-weight: 400;
            color: #626262;
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
  }
}
</style>
