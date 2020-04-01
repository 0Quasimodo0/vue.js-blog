<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>目录管理</el-breadcrumb-item>
      <el-breadcrumb-item>目录列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加目录对话框 -->
    <Add
    :visible.sync="isAddDialogVisible"
    @cancel="handleCancel"
    @success="handleSuccess"
    @error="handleError"
    @warn="handleWarn"></Add>
    <!-- 修改目录对话框 -->
    <Update
    :visible.sync="isUpdateDialogVisible"
    :datasource="form.update"
    @cancel="handleCancel"
    @success="handleSuccess"
    @error="handleError"
    @warn="handleWarn"></Update>
    <!-- 删除目录对话框 -->
    <Delete
    :visible.sync="isDeleteDialogVisible"
    :id="deleteCategoryId"
    @cancel="handleCancel"
    @success="handleSuccess"></Delete>
    <!-- 卡片视图区域 -->
    <el-card shadow="never">
      <!-- 搜索区 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="category.query.pageInfo.key" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getCategoryList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="isAddDialogVisible = true">添加目录</el-button>
        </el-col>
      </el-row>
      <!-- 列表区 -->
      <List :list="category.list" @update="openUpdateDialog" @delete="openDeleteDialog"></List>
      <!-- 分页区 -->
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="category.query.pageInfo.pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="category.query.pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="category.total"
            background>
          </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Add from '@/components/admin/category/Add.vue'
import Update from '@/components/admin/category/Update.vue'
import List from '@/components/admin/category/List.vue'
import Delete from '@/components/admin/category/Delete.vue'
export default {
  name: 'category',
  components: {
    Add,
    Update,
    List,
    Delete
  },
  data () {
    return {
      // 目录信息
      category: {
        // 列表
        list: [],
        // 总数
        total: 0,
        // 请求参数
        query: {
          // 路径参数
          params: {},
          // 分页信息
          pageInfo: {
            key: '',
            pageNum: 1,
            pageSize: 10,
            orderBy: ['level'],
            reverse: false
          }
        }
      },
      // 表单
      form: {
        // 修改表单
        update: {
          // id
          id: '',
          // 名称
          name: '',
          // 等级
          level: '',
          // 上级目录id
          parentId: '',
          // 类型
          type: '',
          // 描述
          description: '',
          // 图标链接
          icon: ''
        }
      },
      deleteCategoryId: 0,
      // 控制添加目录对话框的显示与隐藏
      isAddDialogVisible: false,
      // 控制添加目录对话框的显示与隐藏
      isUpdateDialogVisible: false,
      // 控制添加目录对话框的显示与隐藏
      isDeleteDialogVisible: false
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.category.query.pageInfo.pageSize = newSize
      this.getCategoryList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.category.query.pageInfo.pageNum = newPage
      this.getCategoryList()
    },
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.post('/category', this.category.query.pageInfo, { params: this.category.query.params })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.category.list = result.data.records
      this.category.query.pageInfo.pageNum = result.data.current
      this.category.query.pageInfo.pageSize = result.data.size
      this.category.total = result.data.total
    },
    // 处理成功事件
    handleSuccess (message, name) {
      if (name === 'add') {
        this.isAddDialogVisible = false
      }
      if (name === 'update') {
        this.isUpdateDialogVisible = false
      }
      if (name === 'delete') {
        this.isDeleteDialogVisible = false
      }
      this.getCategoryList()
      this.$message.success(message)
    },
    // 处理错误事件
    handleError (message, name) {
      this.$message.error(message)
    },
    // 处理警告事件
    handleWarn (message, name) {
      this.$message.warning(message)
    },
    // 处理取消事件
    handleCancel (name) {
      if (name === 'add') {
        this.isAddDialogVisible = false
      }
      if (name === 'update') {
        this.isUpdateDialogVisible = false
      }
      if (name === 'delete') {
        this.isDeleteDialogVisible = false
      }
    },
    // 打开修改标签对话框
    openUpdateDialog (category) {
      /* if (category.level > 0) {
        this.getParentCategory(category.level - 1, category.type)
      } */
      this.form.update.id = category.id
      this.form.update.name = category.name
      this.form.update.level = category.level
      this.form.update.type = category.type
      this.form.update.parentId = category.parent_id
      this.form.update.description = category.description
      this.form.update.icon = category.icon
      this.isUpdateDialogVisible = true
    },
    // 打开删除标签对话框
    openDeleteDialog (id) {
      this.deleteCategoryId = id
      this.isDeleteDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.el-table {
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 14px;
}
</style>
