<template>
  <div class="page-container">
    <div class="card">
      <div class="card-left-part">
        <div class="card-value">50%</div>
        <div class="card-title">Saving for Home</div>
        <div class="card-description">Lorem ipsum dolor</div>
      </div>
      <div class="card-right-part">
        <svg-icon icon-class="build" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard"
};
</script>

<style lang="scss" scoped>
.card {
  width: 400px;
  height: 200px;
  background: #5473e8;
  border-radius: 4px;
  display: flex;

  &-left-part {
    flex-grow: 1;

    .card-value {
      font-size: 36px;
      color: #ffffff;
    }

    .card-title {
      font-size: 24px;
      color: #ffffff;
    }

    .card-description {
      font-size: 24px;
      color: #a9baf0;
    }
  }

  &-right-part {
    flex-shrink: 0;
  }
}
</style>
