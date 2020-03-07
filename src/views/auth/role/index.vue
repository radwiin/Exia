<template>
  <div class="page-container">
    <el-form
      class="query-form"
      ref="queryForm"
      :model="queryForm"
      label-width="auto"
      inline
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="queryForm.roleName" placeholder="机构名称" />
      </el-form-item>
      <el-form-item label="角色别名" prop="roleAlias">
        <el-input v-model="queryForm.roleAlias" placeholder="机构全称" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleQueryClick"
          >查询</el-button
        >
        <el-button icon="el-icon-delete">清空</el-button>
      </el-form-item>
    </el-form>
    <div class="function-container">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreateClick"
        >新 增</el-button
      >
      <el-button icon="el-icon-setting">权限设置</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border height="100%">
        <el-table-column fixed type="selection" width="50" align="center" />
        <el-table-column
          fixed
          type="index"
          label="#"
          width="50"
          align="center"
        />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleAlias" label="角色别名" />
        <el-table-column prop="sort" label="排序" width="50" align="center" />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleViewClick(scope)">
              查看
            </el-button>
            <el-button type="text" @click="handleEditClick(scope)">
              编辑
            </el-button>
            <el-popconfirm
              title="确定删除?"
              @onConfirm="handleDeleteConfirm(scope)"
            >
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogCategory"
      width="900px"
      @open="handleDialogOpen"
      @close="handleDialogClose"
    >
      <el-form
        v-loading="formLoading"
        ref="form"
        :model="form"
        label-position="left"
        label-width="auto"
        :disabled="dialogCategory === DIALOG_CATEGORY.VIEW"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" />
        </el-form-item>
        <el-form-item label="角色别名" prop="roleAlias">
          <el-input v-model="form.roleAlias" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleDialogCancelClick">取消</el-button>
        <el-button type="primary" @click="handleDialogConfirmClick"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { query } from "@/api/auth/role";
const DIALOG_CATEGORY = {
  CREATE: "新 增",
  VIEW: "查 看",
  EDIT: "编 辑"
};
export default {
  name: "role",
  data() {
    return {
      queryForm: {
        roleName: "",
        roleAlias: ""
      },
      tableData: [],

      DIALOG_CATEGORY, // for html
      dialogVisible: false,
      dialogCategory: "",
      formLoading: false,
      form: {
        roleName: "",
        roleAlias: "",
        sort: ""
      }
    };
  },
  created() {
    query().then(rsp => {
      this.tableData = rsp.data;
    });
  },
  methods: {
    handleQueryClick() {
      query().then(rsp => {
        rsp;
      });
    },
    handleCreateClick() {
      this.dialogCategory = DIALOG_CATEGORY.CREATE;
      this.dialogVisible = true;
    },
    handleViewClick(scope) {
      this.dialogCategory = DIALOG_CATEGORY.VIEW;
      this.dialogVisible = true;
      this.$nextTick(() => {
        Object.assign(this.form, scope.row);
      });
    },
    handleEditClick(scope) {
      this.dialogCategory = DIALOG_CATEGORY.EDIT;
      this.dialogVisible = true;
      this.$nextTick(() => {
        Object.assign(this.form, scope.row);
      });
    },
    handleDeleteConfirm(scope) {
      console.info(scope);
    },

    handleDialogOpen() {},
    handleDialogClose() {
      this.$refs.form.resetFields();
    },
    handleDialogCancelClick() {
      this.dialogVisible = false;
    },
    handleDialogConfirmClick() {}
  }
};
</script>

<style lang="scss" scoped>
.el-button + span {
  margin-left: 10px;
}

span + .el-button {
  margin-left: 10px;
}

.page-container {
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;

  .query-form {
    flex-shrink: 0;
  }

  .function-container {
    flex-shrink: 0;
    padding-bottom: 10px;
  }

  .table-container {
    min-height: 0px;
    flex-grow: 1;
  }
}
</style>
