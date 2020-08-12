<template>
  <div class="page-container">
    <div class="card-wrapper">
      <div class="left-wrapper">
        <svg-icon icon-class="bxl-vuejs" class-name="logo" />
      </div>
      <div class="right-wrapper">
        <div class="forgot-password-wrapper">
          <header class="forgot-password-header">
            <div class="forgot-password-header-title">Recover your password</div>
            <div class="forgot-password-header-sub-title">
              Please enter your email address and we'll send you instructions on how to reset your password.
            </div>
          </header>
          <div class="forgot-password-content">
            <email-recover />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmailRecover from './components/EmailRecover'
export default {
  name: 'forgot-password',
  components: {
    EmailRecover
  },
  data() {
    return {}
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
    flex: none;
    width: 800px;
    min-height: 250px;
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
        width: 40%;
        height: 40%;
        color: #fff;
      }
    }

    .right-wrapper {
      width: 50%;
      background-color: #fff;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      .forgot-password-wrapper {
        min-height: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        .forgot-password-header {
          flex: none;
          width: 100%;
          padding: 28px 28px 0;

          .forgot-password-header-title {
            margin-bottom: 1rem;
            font-weight: 500;
            line-height: 1.2;
            color: #2c2c2c;
          }

          .forgot-password-header-sub-title {
            font-weight: 400;
            color: #626262;
          }
        }

        .forgot-password-content {
          flex: auto;
          width: 100%;
          padding: 10px 28px 0;
        }

        .login-footer {
          flex: none;
          margin: 0 0 10px;
          padding: 0;
          font-size: 0.7rem;

          .new a {
            color: #409eff;

            &:hover {
              color: #66b1ff;
            }
          }
        }
      }
    }
  }
}
</style>
