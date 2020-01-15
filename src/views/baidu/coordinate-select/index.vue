<template>
  <div class="page-container">
    <el-button type="primary" @click="handleButtonClick">坐标选择 </el-button>
    <coordinate-select-dialog
      :visible.sync="dialogPositionVisible"
      :location.sync="location"
    />
  </div>
</template>

<script>
import CoordinateSelectDialog from "@/components/CoordinateSelectDialog";

export default {
  name: "coordinate-select",
  components: { CoordinateSelectDialog },
  data: () => ({
    dialogPositionVisible: false,
    location: null
  }),
  methods: {
    handleButtonClick() {
      this.dialogPositionVisible = true;
    }
  }
};
</script>

<style></style>
