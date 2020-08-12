<template>
  <div class="page-container">
    <svg-icon icon-class="bxl-vuejs" class-name="logo" />
    <h1 class="title">You are not authorized!</h1>
    <p class="content">
      paraphonic unassessable foramination Caulopteris worral Spirophyton encrimson esparcet aggerate chondrule restate whistler shallopy biosystematy
      area bertram plotting unstarting quarterstaff.
    </p>
    <el-button type="primary" class="back" size="default">{{ 'Back To Home' }}</el-button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.page-container {
  background: #1e2023;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .logo {
    width: 200px;
    height: 200px;
    color: #fff;
  }

  .title {
    width: 400px;
    text-align: center;
    color: #fff;
  }

  .content {
    width: 600px;
    text-align: center;
    color: #fff;
    margin-bottom: 3rem;
  }

  .back {
    width: 200px;
    letter-spacing: 2px;
    font-weight: 300;
  }
}
</style>
