<template>
  <el-card :body-style="{ padding: '1.5rem' }">
    <div class="content-wrapper">
      <span class="icon-container">
        <svg-icon class="icon" icon-class="vue" class-name="vue" />
      </span>
      <h2>36.9k</h2>
      <span>Views</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'CubeCard'
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .icon-container {
    padding: 0.75rem;
    margin-bottom: 1rem;
    width: 45px;
    height: 45px;
    border-radius: 45px;
    background: rgba(30, 30, 30, 0.15);

    .icon {
      color: #1e1e1e;
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    font-size: 24.36px;
    font-weight: 900;
    margin: 0 0 0.25rem;
    line-height: 1.2;
    color: #2c2c2c;
  }

  span {
    color: #626262;
  }
}
</style>
