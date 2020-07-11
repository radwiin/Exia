<script>
import _ from 'lodash'
import path from 'path'
export default {
  name: 'NavMenu',
  props: {
    collapse: {
      type: Boolean,
      default: false
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
    defaultActive: {
      type: String
    },
    data: {
      type: Array,
      required: true
    },
    mode: {
      //must be one of `horizontal / vertical`
      type: String,
      default: 'vertical'
    }
  },
  data() {
    return {
      theMenu: _.cloneDeep(this.data)
    }
  },
  render(h) {
    return h(
      'el-menu',
      {
        class: {
          'app-menu': true
        },
        props: {
          mode: this.mode,
          collapse: this.collapse,
          textColor: this.textColor,
          activeTextColor: this.activeTextColor,
          backgroundColor: this.backgroundColor,
          defaultActive: this.defaultActive,
          router: true
        },
        on: {
          open: () => this.$emit('open'),
          close: () => this.$emit('close')
        }
      },
      this.theMenu.map(child => this.menuItem(h, child))
    )
  },
  methods: {
    menuItem(h, item) {
      const checkHidden = it => it.meta && it.meta.hidden
      const checkAlwaysShow = it => it.meta && it.meta.alwaysShow
      const checkLeaf = it => !it.children
      const isHidden = checkHidden(item)
      const isAlwaysShow = checkAlwaysShow(item)
      const isLeaf = checkLeaf(item)
      const visibleChildren = isLeaf ? [] : item.children.filter(child => !checkHidden(child))
      const hasVisibleChildren = visibleChildren.length > 0
      const hasOnlyOneVisibleChildren = visibleChildren.length === 1

      // 对于设置隐藏的路由，不显示其菜单
      if (isHidden) {
        return null
      }

      // 以下是对要显示的路由进行的逻辑处理，暂不支持外链
      if (hasVisibleChildren && (!hasOnlyOneVisibleChildren || isAlwaysShow)) {
        // 存在可见子节点，且要么有一个以上的子节点，要么只有一个子节点但设置alwaysShow属性。此时渲染为el-submenu
        return h(
          'el-submenu',
          {
            props: {
              index: item.path,
              'popper-class': 'r-popper-class'
            }
          },
          [
            h(
              'template',
              {
                slot: 'title'
              },
              [
                h('svg-icon', {
                  props: {
                    'icon-class': item.meta.icon
                  }
                }),
                h(
                  'span',
                  {
                    slot: 'title'
                  },
                  item.meta.title
                )
              ]
            ),
            ...item.children.map(child => {
              const theChild = _.cloneDeep(child)
              theChild.path = path.resolve(item.path, theChild.path)
              return this.menuItem(h, theChild)
            })
          ]
        )
      } else if (hasVisibleChildren && hasOnlyOneVisibleChildren) {
        // 存在可见子节点，但只有一个节点且没有设置alwaysShow属性。此时默认将path传入子节点，且只渲染子节点
        const theOnlyOneVisibleChild = _.cloneDeep(visibleChildren[0])
        theOnlyOneVisibleChild.path = path.resolve(item.path, theOnlyOneVisibleChild.path)
        return this.menuItem(h, theOnlyOneVisibleChild)
      } else {
        // 不存在可见子节点。此时渲染为el-menu-item
        return h(
          'el-menu-item',
          {
            props: {
              index: item.path
            }
          },
          [
            h('svg-icon', {
              props: {
                'icon-class': item.meta.icon
              }
            }),
            h(
              'span',
              {
                slot: 'title'
              },
              item.meta.title
            )
          ]
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-menu {
  ::v-deep .el-menu-item.is-active,
  ::v-deep .el-submenu.is-active .el-submenu__title {
    background: #1e2023 !important;
    color: #fff !important;
  }
}
</style>

<style lang="scss">
.r-popper-class {
  color: #000;

  .el-menu-item.is-active {
    background: #1e2023 !important;
    color: #fff !important;
  }
}
</style>
