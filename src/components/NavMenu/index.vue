<script>
export default {
  name: "NavMenu",
  props: {
    collapse: {
      type: Boolean,
      required: true
    },
    backgroundColor: {
      type: String
    },
    textColor: {
      type: String
    },
    activeTextColor: {
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
          backgroundColor: this.backgroundColor,
          textColor: this.textColor,
          activeTextColor: this.activeTextColor
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
    menuItem(h, item) {
      if (!item.children) {
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
