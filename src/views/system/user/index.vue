<template>
  <div class="page-container">
    <div class="function-container">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreateClick">新 增</el-button>
      <el-button type="primary" plain icon="el-icon-refresh" @click="handleResetPasswordClick">密码重置</el-button>
    </div>
    <div class="table-container">
      <el-table class="data-table" :data="tableData" border height="100%" @selection-change="handleSelectionChange">
        <el-table-column fixed type="selection" width="50" align="center" />
        <el-table-column fixed type="index" label="#" width="50" align="center" />
        <el-table-column prop="account" label="登录账号" />
        <el-table-column prop="realName" label="用户姓名" />
        <el-table-column prop="roleName" label="所属角色">
          <template slot-scope="scope">
            <span>{{ scope.row.roleNames.join() }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleViewClick(scope)">
              查看
            </el-button>
            <el-button type="text" @click="handleEditClick(scope)">
              编辑
            </el-button>
            <el-popconfirm title="确定删除?" @onConfirm="handleDeleteConfirm(scope)">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="data-pagination" v-bind="paginationBind" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <el-dialog :visible.sync="dialogVisible" :title="dialogCategory" width="900px" @close="handleDialogClose">
      <el-form
        v-loading="formLoading"
        ref="form"
        :model="form"
        label-position="left"
        label-width="auto"
        :disabled="dialogCategory === DIALOG_CATEGORY.VIEW"
      >
        <el-form-item label="登录账号" prop="account">
          <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="dialogCategory === DIALOG_CATEGORY.CREATE">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="用户姓名" prop="realName">
          <el-input v-model="form.realName" />
        </el-form-item>
        <el-form-item label="所属角色" prop="roles">
          <el-select v-model="form.roles" multiple clearable style="width:100%">
            <el-option v-for="option in roleOptions" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleDialogCancelClick">取消</el-button>
        <el-button type="primary" @click="handleDialogConfirmClick">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { query as queryRole } from '@/api/auth/role'
import { query, add, update, remove, resetPassword } from '@/api/system/user'
const DIALOG_CATEGORY = {
  CREATE: '新 增',
  VIEW: '查 看',
  EDIT: '编 辑'
}
export default {
  name: 'user',
  data() {
    return {
      currentSelection: [],
      tableData: [],
      paginationBind: {
        currentPage: 1,
        pageSize: 10,
        total: 1,
        pageSizes: [10, 20, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper'
      },

      DIALOG_CATEGORY, // for html
      dialogVisible: false,
      dialogCategory: '',
      formLoading: false,
      form: {
        account: '',
        password: '',
        realName: '',
        roles: []
      },
      tenantOptions: [],
      roleOptions: []
    }
  },
  created() {
    this.refreshTable()
    this.refreshRoleOptions()
  },
  methods: {
    refreshTable() {
      const conditions = Object.assign({}, this.paginationBind)
      query(conditions).then(rsp => {
        this.tableData = rsp.data.records
        this.paginationBind.currentPage = rsp.data.currentPage
        this.paginationBind.pageSize = rsp.data.pageSize
        this.paginationBind.total = rsp.data.total
      })
    },
    refreshRoleOptions() {
      queryRole({ currentPage: 1, pageSize: 1000 }).then(rsp => {
        this.roleOptions = rsp.data.records.map(it => ({
          value: it.id,
          label: it.roleName
        }))
      })
    },
    resetPagination(pageSize) {
      this.paginationBind.currentPage = 1
      this.paginationBind.pageSize = pageSize || this.paginationBind.pageSizes[0]
      this.paginationBind.total = 0
    },
    handleSizeChange(pageSize) {
      this.resetPagination(pageSize)
      this.refreshTable()
    },
    handleCurrentChange() {
      this.refreshTable()
    },
    handleQueryClick() {
      this.resetPagination()
      this.refreshTable()
    },
    handleResetClick() {
      this.resetPagination()
      this.refreshTable()
    },
    handleCreateClick() {
      this.dialogCategory = DIALOG_CATEGORY.CREATE
      this.dialogVisible = true
    },
    handleSelectionChange(selection) {
      this.currentSelection = selection
    },
    handleResetPasswordClick() {
      if (this.currentSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择至少一条数据'
        })
      } else if (this.currentSelection.length > 1) {
        this.$message({
          type: 'warning',
          message: '只能选择一条数据'
        })
      } else {
        this.$confirm('确认重置密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            resetPassword(this.currentSelection[0].id)
              .then(() => {
                this.refreshTable()
              })
              .catch(console.error)
          })
          .catch(console.info)
      }
    },
    handleViewClick({ row }) {
      this.dialogCategory = DIALOG_CATEGORY.VIEW
      this.dialogVisible = true
      this.$nextTick(() => {
        Object.assign(this.form, row)
      })
    },
    handleEditClick({ row }) {
      this.dialogCategory = DIALOG_CATEGORY.EDIT
      this.dialogVisible = true
      this.$nextTick(() => {
        Object.assign(this.form, row)
      })
    },
    handleDeleteConfirm({ row }) {
      remove(row.sysUserId)
        .then(() => {
          this.refreshTable()
        })
        .catch(console.error)
    },
    handleDialogClose() {
      this.$refs.form.resetFields()
    },
    handleDialogCancelClick() {
      this.dialogVisible = false
    },
    handleDialogConfirmClick() {
      if (this.dialogCategory === DIALOG_CATEGORY.VIEW) {
        this.dialogVisible = false
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.formLoading = true
            const promise = {
              [DIALOG_CATEGORY.CREATE]: add,
              [DIALOG_CATEGORY.EDIT]: update
            }[this.dialogCategory]
            promise(this.form)
              .then(() => {
                this.$refs.form.resetFields()
                this.dialogVisible = false
                this.resetPagination()
                this.refreshTable()
              })
              .catch(console.error)
              .finally(() => {
                this.formLoading = false
              })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button + span {
  margin-left: 10px;
}

.page-container {
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;

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
