<template>
  <el-drawer
    title="Setting"
    direction="rtl"
    size="300px"
    :visible="visible"
    @update:visible="handleVisibleUpdate"
  >
    <div class="drawer-container">
      <div class="drawer-item">
        <span>Open Tags-View</span>
        <el-radio-group v-model="tagsView">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
        </el-radio-group>
      </div>

      <div class="drawer-item">
        <span>Fixed Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
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
  data: () => ({
    tagsView: true,
    fixedHeader: true,
    sidebarLogo: true
  }),
  methods: {
    handleVisibleUpdate(val) {
      this.$emit("update:visible", val); // 桥接
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding-left: 20px;
  padding-right: 20px;

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
