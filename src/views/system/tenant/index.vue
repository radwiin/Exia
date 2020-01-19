<template>
  <div class="page-container">
    <el-form ref="queryForm" :model="queryForm" label-width="auto" inline>
      <el-form-item label="租户ID" prop="id">
        <el-input v-model="queryForm.id" />
      </el-form-item>
      <el-form-item label="租户名称" prop="name">
        <el-input v-model="queryForm.name" />
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="queryForm.contact" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button icon="el-icon-refresh">刷新</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border height="100%" style="width: 100%">
      <el-table-column type="index" label="#" width="50" />
      <el-table-column prop="id" label="租户ID" width="180" />
      <el-table-column prop="name" label="租户名称" width="180" />
      <el-table-column prop="contact" label="联系人" />
      <el-table-column prop="phone" label="联系电话" />
      <el-table-column prop="address" label="账号额度" />
      <el-table-column prop="address" label="过期时间" />
      <el-table-column prop="address" label="绑定域名" />
      <el-table-column prop="address" label="操作" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "tenant",
  data() {
    return {
      queryForm: {
        id: "",
        name: "",
        contact: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.page-container {
  padding: 20px;
}
</style>
