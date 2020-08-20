<template>
  <page-container>
    <el-row :gutter="20">
      <el-col :span="12">
        <demo-1></demo-1>
      </el-col>
      <el-col :span="12">
        <demo-2></demo-2>
      </el-col>
    </el-row>
  </page-container>
</template>

<script>
import Demo1 from './components/Demo1'
import Demo2 from './components/Demo2'
export default {
  name: 'l7-demo',
  components: { Demo1, Demo2 }
}
</script>
