<template>
  <div class="page-container">
    <div class="list-wrapper">
      <div class="list">
        <div class="list-header">
          <textarea
            v-model="listHeaderName"
            class="list-header-name"
            spellcheck="false"
            maxlength="512"
          />
        </div>
        <draggable
          class="list-content"
          v-model="list"
          v-bind="dragOptions"
          @start="onStart"
          @end="onEnd"
        >
          <div
            class="list-card-wrapper"
            v-for="element in list"
            :key="element.order"
          >
            <div class="list-card">{{ element.name }}</div>
          </div>
        </draggable>
        <div class="list-footer">
          footer
        </div>
      </div>
    </div>
    <div class="list-wrapper">
      <div class="list">
        <div class="list-header">
          doing
        </div>
        <draggable
          class="list-content"
          v-model="list2"
          v-bind="dragOptions"
          @start="onStart"
          @end="onEnd"
        >
          <div
            class="list-card-wrapper"
            v-for="element in list2"
            :key="element.order"
          >
            <div class="list-card">{{ element.name }}</div>
          </div>
        </draggable>
        <div class="list-footer">
          footer
        </div>
      </div>
    </div>
    <div class="list-wrapper">
      <div class="list">
        <div class="list-header">
          done
        </div>
        <draggable
          class="list-content"
          v-model="list3"
          v-bind="dragOptions"
          @start="onStart"
          @end="onEnd"
        >
          <div
            class="list-card-wrapper"
            v-for="element in list3"
            :key="element.order"
          >
            <div class="list-card">{{ element.name }}</div>
          </div>
        </draggable>
        <div class="list-footer">
          footer
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];
export default {
  name: "todo-native",
  components: {
    draggable
  },
  data() {
    return {
      listHeaderName: "todo",
      dragOptions: {
        group: "description",
        animation: 200,
        forceFallback: true,
        ghostClass: "ghost",
        dragClass: "drag"
      },
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      list2: message.map((name, index) => {
        return { name, order: index + 100 };
      }),
      list3: message.map((name, index) => {
        return { name, order: index + 200 };
      })
    };
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
  overflow-x: auto;
  white-space: nowrap;
}

.list-wrapper {
  width: 272px;
  margin: 0 4px;
  height: 100%;
  display: inline-block;
  white-space: nowrap;

  &:first-child {
    margin-left: 8px;
  }

  .list {
    display: flex;
    flex-flow: column nowrap;
    max-height: 100%;
    border-radius: 3px;
    white-space: normal;
    background-color: #ebecf0;

    .list-header {
      flex: 0 0 auto;
      padding: 10px 8px;
      position: relative;
      min-height: 20px;

      .list-header-name {
        width: 100%;
        height: 28px;
        overflow: hidden;
        overflow-wrap: break-word;
        resize: none;
        background: transparent;
        border-radius: 3px;
        box-shadow: none;
        font-weight: 600;
        margin: -8px 0;
        min-height: 20px;
        max-height: 256px;
        padding: 4px 8px;
        border: none;
        line-height: 20px;
        font-size: 14px;
        color: #172b4d;

        &:focus {
          background: #fff;
          border: none;
          box-shadow: inset 0 0 0 2px #0079bf;
        }
      }
    }

    .list-content {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      margin: 0 4px;
      padding: 0 4px;

      .list-card-wrapper {
        margin-bottom: 8px;
        border-radius: 3px;
        background-color: #e2e4ea;

        .list-card {
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
    }

    .list-footer {
      flex: 0 0 auto;
      height: 38px;
      text-align: center;
      line-height: 38px;
    }
  }
}

.ghost {
  & > .list-card {
    opacity: 0;
  }
}

.drag {
  opacity: 1 !important;
  transform: rotate(7deg);
}
</style>
