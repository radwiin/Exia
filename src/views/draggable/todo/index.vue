<template>
  <div class="page-container">
    <draggable
      class="list-group"
      tag="ul"
      v-model="list"
      v-bind="dragOptions"
      @start="onStart"
      @end="onEnd"
      :move="onMove"
      group="people"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <li
          class="list-group-item"
          v-for="element in list"
          :key="element.order"
        >
          <i
            :class="
              element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
            "
            @click="element.fixed = !element.fixed"
            aria-hidden="true"
          ></i>
          {{ element.name }}
        </li>
      </transition-group>
    </draggable>

    <!-- <draggable
      class="list-group"
      tag="ul"
      v-model="list2"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      group="people"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <li
          class="list-group-item"
          v-for="element in list2"
          :key="element.order"
        >
          <i
            :class="
              element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
            "
            @click="element.fixed = !element.fixed"
            aria-hidden="true"
          ></i>
          {{ element.name }}
        </li>
      </transition-group>
    </draggable> -->
    <div ref="ui-draggable-helper" class="ui-draggable-helper">
      <div ref="ui-draggable-helper-placeholder"></div>
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
  name: "todo",
  components: {
    draggable
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      list2: message.map((name, index) => {
        return { name, order: index + 999 };
      }),
      drag: false,
      uiDraggableHelper: null,
      uiDraggableHelperPlaceholder: null,
      currentDraggingItem: null,
      listenerTrigger: false
    };
  },
  mounted() {
    this.uiDraggableHelper = this.$refs["ui-draggable-helper"];
    this.uiDraggableHelperPlaceholder = this.$refs[
      "ui-draggable-helper-placeholder"
    ];
    document.addEventListener("drag", this.onMouseMove);
  },
  methods: {
    onMouseMove(mouseEvent) {
      if (this.listenerTrigger) {
        this.uiDraggableHelper.style.top = mouseEvent.clientY - 50 + "px";
        this.uiDraggableHelper.style.left = mouseEvent.clientX - 50 + "px";
      }
    },
    onStart(evt) {
      console.info("start", evt);
      this.drag = true;

      this.currentDraggingItem = evt.item.cloneNode(true);
      this.uiDraggableHelper.replaceChild(
        this.currentDraggingItem,
        this.uiDraggableHelperPlaceholder
      );
      this.listenerTrigger = true;
    },
    onEnd(evt) {
      console.info("end", evt);
      this.drag = false;

      this.uiDraggableHelper.replaceChild(
        this.uiDraggableHelperPlaceholder,
        this.currentDraggingItem
      );
      this.listenerTrigger = false;
    },
    onMove(evt) {
      console.info("move", evt);
    },
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        dragClass: "drag"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .list-group {
    min-height: 20px;
    display: flex;
    list-style-type: none;
    padding-left: 0px;
  }
}

.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  // opacity: 0;
  background: #c8ebfb;
}

.drag {
  opacity: 0;
}

.list-group-item {
  cursor: move;
  padding: 0.75rem 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group-item i {
  cursor: pointer;
}

.ui-draggable-helper {
  min-height: 20px;
  display: flex;
  list-style-type: none;
  padding-left: 0px;
  z-index: 1000;
  position: fixed;
  top: 100px;
  left: 100px;
  background: red;
  transform: translateZ(0px) rotate(9deg);
}
</style>
