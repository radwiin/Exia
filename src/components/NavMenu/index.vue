<script>
export default {
  name: "NavMenu",
  props: {
    collapse: {
      type: Boolean,
      required: true
    },
    textColor: {
      type: String
    },
    activeTextColor: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    menu: {
      type: Array,
      required: true
    }
  },
  render(h) {
    return h(
      "el-menu",
      {
        props: {
          collapse: this.collapse,
          textColor: this.textColor,
          activeTextColor: this.activeTextColor,
          backgroundColor: this.backgroundColor
        },
        on: {
          open: () => this.$emit("open"),
          close: () => this.$emit("close")
        }
      },
      this.menu.map(child => this.menuItem(h, child))
    );
  },
  methods: {
    visibleRule(item) {
      return !item.hidden;
    },
    menuItem(h, item) {
      const isLeaf = !item.children;
      const visibleChildren = isLeaf
        ? []
        : item.children.filter(this.visibleRule);
      const hasVisibleChildren = visibleChildren.length > 0;
      const isOnlyOneVisibleChildren = visibleChildren.length === 1;
      if (isLeaf) {
        return h(
          "el-menu-item",
          {
            props: {
              index: item.path
            }
          },
          [
            h("svg-icon", {
              props: {
                "icon-class": item.meta.icon
              }
            }),
            h(
              "span",
              {
                slot: "title"
              },
              item.meta.title
            )
          ]
        );
      } else {
        return h(
          "el-submenu",
          {
            props: {
              index: item.path
            }
          },
          [
            h(
              "template",
              {
                slot: "title"
              },
              [
                h("svg-icon", {
                  props: {
                    "icon-class": item.meta.icon
                  }
                }),
                h(
                  "span",
                  {
                    slot: "title"
                  },
                  item.meta.title
                )
              ]
            ),
            ...item.children.map(child => this.menuItem(h, child))
          ]
        );
      }
    }
  }
};
</script>
