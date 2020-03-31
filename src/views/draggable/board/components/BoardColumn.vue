<template>
  <div class="column-wrapper">
    <div class="column">
      <div class="column-header">
        <div
          class="column-header-target"
          v-if="!isEditing"
          @click="onHeaderTargetClick"
        />
        <textarea
          ref="column-header-title"
          v-model="column.title"
          class="column-header-title"
          spellcheck="false"
          maxlength="512"
          @blur="onHeaderTitleBlur"
        />
      </div>
      <draggable
        class="column-content"
        v-model="column.cards"
        v-bind="dragOptions"
      >
        <board-card v-for="card in column.cards" :key="card.id" :card="card" />
      </draggable>
      <div class="column-footer">
        <div
          v-if="!isInputing"
          class="column-footer-add"
          @click="isInputing = true"
        >
          <svg-icon icon-class="add" class-name="icon-add" />
          <span>添加卡片</span>
        </div>
        <div v-else class="column-footer-new-container">
          <div class="column-footer-input-wrapper">
            <textarea
              class="column-footer-input"
              v-model="inputContent"
              spellcheck="false"
              maxlength="512"
            />
          </div>
          <div class="column-footer-function-container">
            <input
              class="column-footer-new-confirm"
              type="submit"
              value="添加卡片"
            />
            <svg-icon
              icon-class="close"
              class-name="icon-close"
              @click="isInputing = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import BoardCard from "./BoardCard";
export default {
  name: "BoardColumn",
  props: {
    column: {
      type: Object
    }
  },
  components: {
    draggable,
    BoardCard
  },
  data() {
    return {
      isEditing: false,
      dragOptions: {
        group: "column",
        animation: 200,
        forceFallback: true,
        ghostClass: "ghost",
        dragClass: "drag"
      },
      isInputing: false,
      inputContent: ""
    };
  },
  methods: {
    onHeaderTargetClick() {
      this.isEditing = true;
      this.$refs["column-header-title"].focus();
    },
    onHeaderTitleBlur() {
      this.isEditing = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.column-wrapper {
  width: 272px;
  margin: 0 4px;
  height: 100%;
  display: inline-block;
  white-space: nowrap;

  &:first-child {
    margin-left: 8px;
  }

  .column {
    display: flex;
    flex-flow: column nowrap;
    max-height: 100%;
    border-radius: 3px;
    white-space: normal;
    background-color: #ebecf0;

    .column-header {
      flex: 0 0 auto;
      padding: 10px 8px;
      position: relative;
      min-height: 20px;

      .column-header-target {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .column-header-title {
        width: 100%;
        height: 28px;
        overflow: hidden;
        overflow-wrap: break-word;
        resize: none;
        background: transparent;
        border-radius: 3px;
        box-shadow: none;
        font-weight: 600;
        margin: -4px 0;
        min-height: 20px;
        max-height: 256px;
        padding: 4px 8px;
        border: none;
        line-height: 20px;
        font-size: 14px;
        color: #172b4d;
        display: block;
        cursor: pointer;

        &:focus {
          background: #fff;
          border: none;
          box-shadow: inset 0 0 0 2px #0079bf;
        }
      }
    }

    .column-content {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      margin: 0 4px;
      padding: 0 4px;
    }

    .column-footer {
      flex: 0 0 auto;
      min-height: 38px;

      .column-footer-add {
        height: 28px;
        margin: 2px 8px 8px;
        padding: 4px 8px;

        display: flex;
        align-items: center;

        cursor: pointer;
        color: #5e6c84;

        &:hover {
          background-color: rgba(9, 30, 66, 0.08);
          color: #172b4d;
        }

        .icon-add {
          width: 20px;
          height: 20px;
          margin-right: 2px;
        }

        span {
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
        }
      }

      .column-footer-new-container {
        padding-bottom: 8px;
        margin: 0 8px;

        .column-footer-input-wrapper {
          padding: 6px 8px 2px;
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
          margin: 0 0 8px;

          .column-footer-input {
            display: block;
            width: 100%;
            height: 54px;
            overflow: hidden;
            overflow-wrap: break-word;
            resize: none;
            background: transparent;
            border-radius: 3px;
            box-shadow: none;
            min-height: 20px;
            max-height: 256px;
            border: none;
            outline: none;
            line-height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #172b4d;
            padding: 0px;
            margin-bottom: 4px;
          }
        }

        .column-footer-function-container {
          display: flex;
          align-items: center;

          .column-footer-new-confirm {
            background-color: #5aac44;
            box-shadow: none;
            border: none;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            margin: 0 4px 0 0;
            padding: 6px 12px;
            text-align: center;
            border-radius: 3px;

            &:hover {
              background-color: #61bd4f;
              box-shadow: none;
              border: none;
              color: #fff;
            }
          }

          .icon-close {
            width: 20px;
            height: 20px;
            margin-left: 6px;
            cursor: pointer;
            color: #6b778c;

            &:hover {
              color: #172b4d;
            }
          }
        }
      }
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
