<template>
  <div class="page-container">
    <div class="function-container">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreateClick"
        >新 增</el-button
      >
      <el-button icon="el-icon-refresh" @click="handleResetClick"
        >刷 新</el-button
      >
    </div>
    <div class="table-container">
      <el-table
        :data="tableData"
        border
        height="100%"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column fixed type="selection" width="50" align="center" />
        <el-table-column
          fixed
          type="index"
          label="#"
          width="50"
          align="center"
        />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="path" label="路由" />
        <el-table-column prop="component" label="组件" />
        <el-table-column prop="icon" label="图标" width="70" align="center">
          <template slot-scope="scope">
            <svg-icon v-if="scope.row.icon" :icon-class="scope.row.icon" />
          </template>
        </el-table-column>
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
        <el-form-item label="父级" prop="pId">
          <el-cascader
            v-model="form.pId"
            :options="optionData"
            :props="{ checkStrictly: true, emitPath: false }"
            clearable
            style="width:100%;"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="路由" prop="path">
          <el-input v-model="form.path" />
        </el-form-item>
        <el-form-item label="组件" prop="component">
          <el-input v-model="form.component" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="重定向" prop="redirect">
          <el-input v-model="form.redirect" />
        </el-form-item>
        <el-form-item label="常置" prop="alwaysShow">
          <el-select v-model="form.alwaysShow" clearable style="width:100%">
            <el-option label="是" :value="true" />
            <el-option label="否" :value="false" />
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="form.icon" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number
            v-model="form.sort"
            controls-position="right"
            style="width:100%;"
          />
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
import { query, add, update, remove } from "@/api/system/menu";
import { mapTree } from "@/utils";
import _ from "lodash";
const DIALOG_CATEGORY = {
  CREATE: "新 增",
  VIEW: "查 看",
  EDIT: "编 辑"
};
export default {
  name: "menu",
  data() {
    return {
      DIALOG_CATEGORY, // for html
      tableData: [],
      optionData: [],
      dialogVisible: false,
      dialogCategory: "",
      formLoading: false,
      form: {
        id: "",
        pId: "",
        title: "",
        path: "",
        component: "",
        name: "",
        redirect: "",
        alwaysShow: "",
        icon: "",
        sort: 0
      }
    };
  },
  created() {
    this.refreshTable();
  },
  methods: {
    refreshTable() {
      query().then(rsp => {
        this.tableData = mapTree(_.cloneDeep(rsp.data), item => ({
          ...item,
          ...item.meta
        }));
        this.optionData = [
          {
            value: "root",
            label: "根父级",
            children: mapTree(_.cloneDeep(rsp.data), item => ({
              value: item.id,
              label: item.meta.title,
              children: item.children
            }))
          }
        ];
      });
    },
    handleQueryClick() {
      this.refreshTable();
    },
    handleResetClick() {
      this.refreshTable();
    },
    handleCreateClick() {
      this.dialogCategory = DIALOG_CATEGORY.CREATE;
      this.dialogVisible = true;
    },
    handleViewClick({ row }) {
      this.dialogCategory = DIALOG_CATEGORY.VIEW;
      this.dialogVisible = true;
      this.$nextTick(() => {
        Object.assign(this.form, row);
      });
    },
    handleEditClick({ row }) {
      this.dialogCategory = DIALOG_CATEGORY.EDIT;
      this.dialogVisible = true;
      this.$nextTick(() => {
        Object.assign(this.form, row);
      });
    },
    handleDeleteConfirm({ row }) {
      remove(row.id)
        .then(() => {
          this.refreshTable();
        })
        .catch(console.error);
    },
    handleDialogClose() {
      this.$refs.form.resetFields();
    },
    handleDialogCancelClick() {
      this.dialogVisible = false;
    },
    handleDialogConfirmClick() {
      if (this.dialogCategory === DIALOG_CATEGORY.VIEW) {
        this.dialogVisible = false;
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.formLoading = true;
            const promise = {
              [DIALOG_CATEGORY.CREATE]: add,
              [DIALOG_CATEGORY.EDIT]: update
            }[this.dialogCategory];
            promise(this.form)
              .then(() => {
                this.$refs.form.resetFields();
                this.dialogVisible = false;
                this.refreshTable();
              })
              .catch(console.error)
              .finally(() => {
                this.formLoading = false;
              });
          }
        });
      }
    }
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
