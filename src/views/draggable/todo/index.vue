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
        <draggable class="list-content" v-model="list" v-bind="dragOptions">
          <div
            class="list-card-wrapper"
            v-for="element in list"
            :key="element.order"
          >
            <div class="list-card">{{ element.name }}</div>
          </div>
        </draggable>
        <div class="list-footer">
          <div v-if="showAdd" class="list-footer-new-container">
            <div class="list-footer-input-wrapper">
              <textarea
                class="list-footer-input"
                v-model="listHeaderName"
                spellcheck="false"
                maxlength="512"
              />
            </div>
            <div class="list-footer-function-container">
              <input
                class="list-footer-new-confirm"
                type="submit"
                value="添加卡片"
              />
              <svg-icon
                icon-class="close"
                class-name="icon-close"
                @click="showAdd = false"
              />
            </div>
          </div>
          <div v-else class="list-footer-add" @click="showAdd = true">
            <svg-icon icon-class="add" class-name="icon-add" />
            <span>添加卡片</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list-wrapper">
      <div class="list">
        <div class="list-header">
          <textarea
            v-model="listHeaderName2"
            class="list-header-name"
            spellcheck="false"
            maxlength="512"
          />
        </div>
        <draggable class="list-content" v-model="list2" v-bind="dragOptions">
          <div
            class="list-card-wrapper"
            v-for="element in list2"
            :key="element.order"
          >
            <div class="list-card">{{ element.name }}</div>
          </div>
        </draggable>
        <div class="list-footer">
          <div class="list-footer-add">
            <svg-icon icon-class="add" class-name="icon-add" />
            <span>添加卡片</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list-wrapper">
      <div class="list">
        <div class="list-header">
          <textarea
            v-model="listHeaderName3"
            class="list-header-name"
            spellcheck="false"
            maxlength="512"
          />
        </div>
        <draggable class="list-content" v-model="list3" v-bind="dragOptions">
          <div
            class="list-card-wrapper"
            v-for="element in list3"
            :key="element.order"
          >
            <div class="list-card">{{ element.name }}</div>
          </div>
        </draggable>
        <div class="list-footer">
          <div class="list-footer-add">
            <svg-icon icon-class="add" class-name="icon-add" />
            <span>添加卡片</span>
          </div>
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
      showAdd: false,
      board: {
        name: "exia",
        lists: [
          {
            name: "todo",
            cards: []
          }
        ]
      },
      dragOptions: {
        group: "description",
        animation: 200,
        forceFallback: true,
        ghostClass: "ghost",
        dragClass: "drag"
      },
      listHeaderName: "todo",
      listHeaderName2: "doing",
      listHeaderName3: "done",

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
      // display: table;

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
        margin: -4px 0;
        min-height: 20px;
        max-height: 256px;
        padding: 4px 8px;
        border: none;
        line-height: 20px;
        font-size: 14px;
        color: #172b4d;
        display: block;

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
      min-height: 38px;

      .list-footer-add {
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

      .list-footer-new-container {
        padding-bottom: 8px;
        margin: 0 8px;

        .list-footer-input-wrapper {
          padding: 6px 8px 2px;
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
          margin: 0 0 8px;

          .list-footer-input {
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

        .list-footer-function-container {
          display: flex;
          align-items: center;

          .list-footer-new-confirm {
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
