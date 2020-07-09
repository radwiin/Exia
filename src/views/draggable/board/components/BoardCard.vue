<template>
  <div class="board-card-wrapper">
    <div class="board-card">{{ card.content }}</div>
  </div>
</template>

<script>
export default {
  name: 'BoardCard',
  props: {
    card: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.board-card-wrapper {
  margin-bottom: 8px;
  border-radius: 3px;
  background-color: #e2e4ea;

  .board-card {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    cursor: pointer;

    height: 60px;
    text-align: center;
    line-height: 60px;

    &:hover {
      background-color: #f4f5f7;
    }
  }
}
</style>
