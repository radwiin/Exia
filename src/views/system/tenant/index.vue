<template>
  <div class="page-container">
    <el-form
      class="query-form"
      ref="queryForm"
      :model="queryForm"
      label-width="auto"
      inline
    >
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
    </div>
    <div class="table-container">
      <el-table class="data-table" :data="tableData" border height="100%">
        <el-table-column
          fixed
          type="index"
          label="#"
          width="50"
          align="center"
        />
        <el-table-column prop="id" label="租户ID" />
        <el-table-column prop="name" label="租户名称" />
        <el-table-column prop="contact" label="联系人" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column prop="app_id" label="小程序ID" />
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
    <el-pagination
      class="data-pagination"
      v-bind="paginationBind"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
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
        <el-form-item label="小程序ID" prop="app_id">
          <el-input v-model="form.app_id" />
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
import { query } from "@/api/system/tenant";
const DIALOG_CATEGORY = {
  CREATE: "新 增",
  VIEW: "查 看",
  EDIT: "编 辑"
};
export default {
  name: "tenant",
  data() {
    return {
      queryForm: {
        id: "",
        name: "",
        contact: ""
      },
      tableData: [],
      paginationBind: {
        currentPage: 1,
        pageSize: 10,
        total: 1,
        pageSizes: [10, 20, 50, 100],
        layout: "total, sizes, prev, pager, next, jumper"
      },

      DIALOG_CATEGORY, // for html
      dialogVisible: false,
      dialogCategory: "",
      formLoading: false,
      form: {
        name: "",
        contact: "",
        phone: "",
        app_id: ""
      }
    };
  },
  created() {
    query().then(rsp => {
      this.tableData = rsp.data.records;
      this.paginationBind.currentPage = rsp.data.currentPage;
      this.paginationBind.pageSize = rsp.data.pageSize;
      this.paginationBind.total = rsp.data.total;
    });
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
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

  .data-pagination {
    flex-shrink: 0;
    align-self: flex-end;
    padding-top: 10px;
  }
}
</style>
