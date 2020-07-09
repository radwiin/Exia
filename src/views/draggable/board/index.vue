<template>
  <div class="page-container">
    <draggable v-model="board.columns" v-bind="boardDragOptions">
      <board-column v-for="column in board.columns" :key="column.id" :column="column" />
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BoardColumn from './components/BoardColumn'
export default {
  name: 'todo-native',
  components: {
    draggable,
    BoardColumn
  },
  data() {
    return {
      board: {
        name: 'EXIA',
        columns: [
          {
            id: 'todo',
            title: 'TODO',
            editTitle: false,
            cards: [
              { content: 'A', id: 'A' },
              { content: 'B', id: 'B' },
              { content: 'C', id: 'C' },
              { content: 'D', id: 'D' },
              { content: 'E', id: 'E' },
              { content: 'F', id: 'F' },
              { content: 'G', id: 'G' },
              { content: 'H', id: 'H' },
              { content: 'I', id: 'I' }
            ]
          },
          {
            id: 'doing',
            title: 'DOING',
            cards: [
              { content: 'J', id: 'J' },
              { content: 'K', id: 'K' },
              { content: 'L', id: 'L' },
              { content: 'M', id: 'M' },
              { content: 'N', id: 'N' },
              { content: 'O', id: 'O' },
              { content: 'P', id: 'P' },
              { content: 'Q', id: 'Q' },
              { content: 'R', id: 'R' }
            ]
          },
          {
            id: 'done',
            title: 'DONE',
            cards: [
              { content: 'S', id: 'S' },
              { content: 'T', id: 'T' },
              { content: 'U', id: 'U' },
              { content: 'V', id: 'V' },
              { content: 'W', id: 'W' },
              { content: 'X', id: 'X' },
              { content: 'Y', id: 'Y' },
              { content: 'Z', id: 'Z' }
            ]
          }
        ]
      },
      boardDragOptions: {
        group: 'board',
        animation: 200,
        forceFallback: true,
        dragClass: 'drag',
        touchStartThreshold: 30
      },
      dragOptions: {
        group: 'column',
        animation: 200,
        forceFallback: true,
        ghostClass: 'ghost',
        dragClass: 'drag'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
