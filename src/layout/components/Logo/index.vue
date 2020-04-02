<template>
  <div class="logo-wrapper">
    <img class="logo" src="@/assets/logo.png" alt="logo" />
  </div>
</template>

<script>
export default {
  name: "Logo"
};
</script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  .logo {
    width: 24px;
    height: 24px;
  }
}
</style>
