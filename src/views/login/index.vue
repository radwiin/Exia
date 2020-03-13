<template>
  <div class="page-container">
    <div class="left-container">
      <div style="width:65%">
        <div>EXIA</div>
        <user-login />
      </div>
    </div>
    <div class="right-container"></div>
  </div>
</template>

<script>
import UserLogin from "./components/Userlogin";

export default {
  name: "login",
  components: {
    UserLogin
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  background-image: url("~@/assets/4.jpg");
  background-size: cover;
  background-position: center center;

  .left-container {
    width: 600px;
    flex-shrink: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background: #ffffffaa;
  }

  .right-container {
    flex-grow: 1;
  }
}
</style>
