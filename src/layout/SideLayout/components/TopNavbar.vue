<template>
  <header class="top-navbar-wrapper">
    <div class="top-navbar">
      <breadcrumb class="breadcrumb-container" />
      <div class="top-navbar__right">
        <el-dropdown @command="handleCommand">
          <el-avatar style="cursor: pointer;" size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"> </el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Home">Home</el-dropdown-item>
            <el-dropdown-item command="Logout" divided>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'TopNavbar',
  components: {
    Breadcrumb
  },
  methods: {
    handleCommand(command) {
      if (command === 'Home') {
        this.$router.push({ path: '/' }).catch(err => err)
      } else if (command === 'Logout') {
        this.$store.dispatch('app/removeUserInfo').then(() => {
          this.$router.push({ path: '/login' })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$HeaderHeight: 55px;

.top-navbar-wrapper {
  position: absolute;
  z-index: 1900;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(180deg, hsla(0, 0%, 97.3%, 0.95) 44%, hsla(0, 0%, 97.3%, 0.46) 73%, hsla(0, 0%, 100%, 0));

  .top-navbar {
    height: $HeaderHeight;
    border-radius: 0.5rem;
    position: absolute;
    top: 10px;
    left: 15px;
    right: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.05);

    .breadcrumb-container {
      margin-left: 20px;
    }

    &__right {
      height: 100%;
      display: flex;
      align-items: center;
      padding-right: 20px;
    }
  }
}
</style>
