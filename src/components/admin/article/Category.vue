<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>目录管理</el-breadcrumb-item>
      <el-breadcrumb-item>目录列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加目录对话框 -->
    <el-dialog title="添加目录" :visible.sync="isAddDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="目录名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="cancelAdd('addFormRef')">取消</el-button>
        <el-button type="primary" @click="addCategory">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改目录对话框 -->
    <el-dialog title="修改目录" :visible.sync="isUpdateDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef">
        <el-form-item label="目录名称" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="cancelUpdate('updateFormRef')">取消</el-button>
        <el-button type="primary" @click="updateCategory">确定</el-button>
      </span>
    </el-dialog>
    <!-- 删除目录对话框 -->
    <el-dialog title="删除目录" :visible.sync="isDeleteDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <span>确定删除该目录？</span>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="isDeleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteCategory(deleteCategoryId)">确定</el-button>
      </span>
    </el-dialog>
    <!-- 卡片视图区域 -->
    <el-card shadow="never">
      <!-- 搜索区 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="pageInfo.key">
            <el-button slot="append" icon="el-icon-search" @click="getCategoryList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="isAddDialogVisible = true">添加目录</el-button>
        </el-col>
      </el-row>
      <!-- 列表区 -->
      <el-table :data="categoryList" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="标签ID" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" circle size="small" @click="openUpdateDialog(scope.row)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" circle size="small" @click="openDeleteDialog(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageNum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background>
          </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制添加目录对话框的显示与隐藏
      isAddDialogVisible: false,
      // 控制添加目录对话框的显示与隐藏
      isUpdateDialogVisible: false,
      // 控制添加目录对话框的显示与隐藏
      isDeleteDialogVisible: false,
      // 添加目录的表单数据
      addForm: {
        name: ''
      },
      // 添加目录的表单数据
      updateForm: {
        id: '',
        name: ''
      },
      // 添加表单的验证规则
      addFormRules: {
        name: [
          { required: true, message: '请输入目录名称！', trigger: 'blur' }
        ]
      },
      // 添加表单的验证规则
      updateFormRules: {
        name: [
          { required: true, message: '请输入目录名称！', trigger: 'blur' }
        ]
      },
      // 目录列表
      categoryList: [],
      // 要删除目录的id
      deleteCategoryId: '',
      // 页面信息
      pageInfo: {
        key: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.pageInfo.pageSize = newSize
      this.getCategoryList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.pageInfo.pageNum = newPage
      this.getCategoryList()
    },
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/admin/category', { params: this.pageInfo })
      if (result.status !== 200) {
        this.$message.error(result.message)
      }
      this.categoryList = result.data.list
      this.pageInfo.pageNum = result.data.pageNum
      this.pageInfo.pageSize = result.data.pageSize
      this.total = result.data.total
    },
    // 添加目录
    async addCategory () {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          const { data: result } = await this.$http.post('/admin/category', this.addForm)
          if (result.status !== 200) {
            return this.$message.error(result.message)
          }
          this.$message.success(result.message)
          this.isAddDialogVisible = false
          this.getCategoryList()
        } else {
          this.$message.warning('请正确填写表单信息！')
        }
      })
    },
    // 取消添加
    cancelAdd (refName) {
      this.$refs[refName].resetFields()
      this.isAddDialogVisible = false
    },
    // 打开修改标签对话框
    openUpdateDialog (category) {
      this.updateForm.id = category.id
      this.updateForm.name = category.name
      this.isUpdateDialogVisible = true
    },
    // 修改目录
    async updateCategory () {
      this.$refs.updateFormRef.validate(async valid => {
        if (valid) {
          const { data: result } = await this.$http.put('/admin/category', this.updateForm)
          if (result.status !== 200) {
            return this.$message.error(result.message)
          }
          this.$message.success(result.message)
          this.isUpdateDialogVisible = false
          this.getCategoryList()
        } else {
          this.$message.warning('请正确填写表单信息！')
        }
      })
    },
    // 取消修改标签
    cancelUpdate (refName) {
      this.$refs[refName].resetFields()
      this.isUpdateDialogVisible = false
    },
    // 打开删除标签对话框
    openDeleteDialog (id) {
      this.deleteCategoryId = id
      this.isDeleteDialogVisible = true
    },
    // 删除标签
    async deleteCategory (id) {
      this.isDeleteDialogVisible = false
      const { data: result } = await this.$http.delete('/admin/category/' + id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.getCategoryList()
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
