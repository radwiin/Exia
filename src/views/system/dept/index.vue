<template>
  <div class="page-container">
    <el-form
      class="query-form"
      ref="queryForm"
      :model="queryForm"
      label-width="auto"
      inline
    >
      <el-form-item label="机构名称" prop="deptName">
        <el-input v-model="queryForm.deptName" placeholder="机构名称" />
      </el-form-item>
      <el-form-item label="所属租户" prop="tenantId">
        <el-input v-model="queryForm.name" placeholder="所属租户" />
      </el-form-item>
      <el-form-item label="机构全称" prop="fullName">
        <el-input v-model="queryForm.contact" placeholder="机构全称" />
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
        >新建</el-button
      >
    </div>
    <div class="table-container">
      <el-table
        :data="tableData"
        border
        row-key="id"
        height="100%"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          fixed
          type="index"
          label="#"
          width="50"
          align="center"
        />
        <el-table-column prop="deptName" label="机构名称" />
        <el-table-column prop="tenantId" label="所属租户" />
        <el-table-column prop="fullName" label="机构全称" />
        <el-table-column prop="deptCategoryName" label="机构类型" />
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
            <el-button type="text" @click="handleEditClick(scope)">
              新增子项
            </el-button>
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
        <el-form-item label="租户名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="form.contact" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="账号额度" prop="quota">
          <el-input v-model="form.quota" />
        </el-form-item>
        <el-form-item label="过期时间" prop="expire">
          <el-input v-model="form.expire" />
        </el-form-item>
        <el-form-item label="绑定域名" prop="domain">
          <el-input v-model="form.domain" />
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
import { query } from "@/api/system/dept";
const DIALOG_CATEGORY = {
  CREATE: "新建",
  VIEW: "查看",
  EDIT: "编辑"
};
export default {
  name: "dept",
  data() {
    return {
      queryForm: {
        id: "",
        name: "",
        contact: ""
      },
      tableData: [],

      DIALOG_CATEGORY, // for html
      dialogVisible: false,
      dialogCategory: "",
      formLoading: false,
      form: {
        name: "",
        contact: "",
        phone: "",
        quota: "",
        expire: "",
        domain: ""
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

<style scope lang="scss">
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
