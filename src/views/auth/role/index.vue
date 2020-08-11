<template>
  <page-container class="page-container">
    <div class="function-container">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreateClick">新 增</el-button>
      <el-button icon="el-icon-setting" @click="handleAuthClick">权限设置</el-button>
    </div>
    <div class="table-container">
      <el-table class="data-table" :data="tableData" border height="100%" @selection-change="handleSelectionChange">
        <el-table-column fixed type="selection" width="50" align="center" />
        <el-table-column fixed type="index" label="#" width="50" align="center" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleAlias" label="角色别名" />
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
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" />
        </el-form-item>
        <el-form-item label="角色别名" prop="roleAlias">
          <el-input v-model="form.roleAlias" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleDialogCancelClick">取消</el-button>
        <el-button type="primary" @click="handleDialogConfirmClick">确定</el-button>
      </div>
    </el-dialog>
    <el-drawer title="权限设置" :visible.sync="drawerVisible">
      <div class="drawer-container" v-loading="drawerLoading">
        <div class="drawer-function-container">
          <el-button type="primary" icon="el-icon-check" @click="handleDrawerSaveClick">保存</el-button>
        </div>
        <div class="drawer-tree-container">
          <el-tree ref="menuTree" :data="menuTree" show-checkbox node-key="value"> </el-tree>
        </div>
      </div>
    </el-drawer>
  </page-container>
</template>

<script>
import { query as queryMenu } from '@/api/system/menu'
import { query, add, update, remove, setAuthority } from '@/api/auth/role'
import { mapTree } from '@/utils'
import _ from 'lodash'

const DIALOG_CATEGORY = {
  CREATE: '新 增',
  VIEW: '查 看',
  EDIT: '编 辑'
}
export default {
  name: 'role',
  data() {
    return {
      DIALOG_CATEGORY, // for html
      currentSelection: [],
      tableData: [],
      paginationBind: {
        currentPage: 1,
        pageSize: 10,
        total: 1,
        pageSizes: [10, 20, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      dialogVisible: false,
      dialogCategory: '',
      formLoading: false,
      form: {
        id: '',
        roleName: '',
        roleAlias: ''
      },
      drawerVisible: false,
      drawerLoading: false,
      menuTree: []
    }
  },
  created() {
    this.refreshTable()
    this.refreshMenuTree()
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
    refreshMenuTree() {
      queryMenu().then(rsp => {
        this.menuTree = mapTree(_.cloneDeep(rsp.data), item => ({
          label: item.meta.title,
          value: item.id,
          children: item.children
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
    handleAuthClick() {
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
        this.drawerVisible = true
        this.$nextTick(() => {
          this.$refs.menuTree.setCheckedKeys(this.currentSelection[0].authMenus, true)
        })
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
      remove(row.id)
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
    },
    handleDrawerSaveClick() {
      const authMenus = this.$refs.menuTree.getCheckedKeys(true)
      this.drawerLoading = true
      setAuthority(this.currentSelection[0].id, authMenus)
        .catch(console.error)
        .finally(() => {
          this.drawerLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button + span {
  margin-left: 10px;
}

.page-container {
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

.drawer-container {
  width: 100%;
  height: 100%;
  padding: 0 20px 20px;
  display: flex;
  flex-flow: column nowrap;

  .drawer-function-container {
    flex-shrink: 0;
    padding-bottom: 10px;
  }

  .drawer-tree-container {
    min-height: 0px;
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
