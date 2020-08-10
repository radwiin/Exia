<script>
export default {
  name: 'AutoElMenu',
  inheritAttrs: false,
  props: {
    menus: {
      type: Array,
      default: () => [
        {
          component: 'item',
          index: '/dashboard',
          title: 'Dashboard',
          icon: 'dashboard'
        },
        {
          component: 'group',
          title: 'APPS',
          children: [
            {
              component: 'item',
              index: '/email',
              title: 'Email',
              icon: 'edit'
            },
            {
              component: 'submenu',
              index: '/user',
              title: 'User',
              icon: 'user',
              children: [
                {
                  component: 'item',
                  index: '/user/list',
                  title: 'List',
                  icon: 'close'
                }
              ]
            }
          ]
        },
        {
          component: 'group',
          title: 'UI',
          children: [
            {
              component: 'item',
              index: '/color',
              title: 'Color',
              icon: 'edit'
            },
            {
              component: 'submenu',
              index: '/card',
              title: 'Card',
              icon: 'user',
              children: [
                {
                  component: 'item',
                  index: '/card/basic',
                  title: 'Basic',
                  icon: 'close'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  render(h) {
    return h(
      'el-menu',
      {
        props: this.$attrs,
        on: this.$listeners
      },
      this.menus.map(menu => this.renderMenu(h, menu))
    )
  },
  methods: {
    renderMenu(h, menu) {
      if (!menu) return null
      if (menu.component === 'submenu') {
        return h('el-submenu', { props: menu }, [
          h('template', { slot: 'title' }, [
            menu.icon ? h('svg-icon', { props: { 'icon-class': menu.icon } }) : null,
            menu.title ? h('span', menu.title) : null
          ]),
          ...(menu.children ? menu.children.map(child => this.renderMenu(h, child)) : [])
        ])
      } else if (menu.component === 'item') {
        return h('el-menu-item', { props: menu }, [
          menu.icon ? h('svg-icon', { props: { 'icon-class': menu.icon } }) : null,
          menu.title ? h('span', { slot: 'title' }, menu.title) : null
        ])
      } else if (menu.component === 'group') {
        return h('el-menu-item-group', { props: menu }, [
          h('template', { slot: 'title' }, [menu.title ? h('span', menu.title) : null]),
          ...(menu.children ? menu.children.map(child => this.renderMenu(h, child)) : [])
        ])
      }
    }
  }
}
</script>
