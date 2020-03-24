<template>
  <el-drawer
    title="设置"
    direction="rtl"
    size="300px"
    :visible="visible"
    @update:visible="handleVisibleUpdate"
  >
    <div class="drawer-container">
      <div class="drawer-item">
        <span>布局</span>
        <el-radio-group v-model="layout">
          <el-radio-button label="SideMenuLayout">布局A</el-radio-button>
          <el-radio-button label="SideAllLayout">布局B</el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "SettingDrawer",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    layout: {
      get() {
        return this.$store.state.settings.layout;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "layout",
          value: val
        });
      }
    }
  },
  methods: {
    handleVisibleUpdate(val) {
      this.$emit("update:visible", val); // 桥接
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 0 20px;

  .drawer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }
}
</style>
