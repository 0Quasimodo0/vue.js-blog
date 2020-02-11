<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>链接管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="isAddDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="cancelAdd('addFormRef')">取消</el-button>
        <el-button type="primary" @click="addCategory">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改分类对话框 -->
    <el-dialog title="修改分类" :visible.sync="isUpdateDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="cancelUpdate('updateFormRef')">取消</el-button>
        <el-button type="primary" @click="updateCategory">确定</el-button>
      </span>
    </el-dialog>
    <!-- 删除分类对话框 -->
    <el-dialog title="删除分类" :visible.sync="isDeleteDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <span>确定删除该分类？</span>
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
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="isAddDialogVisible = true">添加分类</el-button>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制添加分类对话框的显示与隐藏
      isAddDialogVisible: false,
      // 控制添加分类对话框的显示与隐藏
      isUpdateDialogVisible: false,
      // 控制添加分类对话框的显示与隐藏
      isDeleteDialogVisible: false,
      // 添加分类的表单数据
      addForm: {
        name: ''
      },
      // 添加分类的表单数据
      updateForm: {
        id: '',
        name: ''
      },
      // 添加表单的验证规则
      addFormRules: {
        name: [
          { required: true, message: '请输入分类名称！', trigger: 'blur' }
        ]
      },
      // 添加表单的验证规则
      updateFormRules: {
        name: [
          { required: true, message: '请输入分类名称！', trigger: 'blur' }
        ]
      },
      // 分类列表
      categoryList: [],
      // 要删除分类的id
      deleteCategoryId: ''
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    // 获取分类列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/classify', { params: { links: false } })
      if (result.status !== 200) {
        this.$message.error(result.message)
      }
      this.categoryList = result.data
    },
    // 添加分类
    async addCategory () {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          const { data: result } = await this.$http.post('/admin/classify', this.addForm)
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
    // 打开修改分类对话框
    openUpdateDialog (category) {
      this.updateForm.id = category.id
      this.updateForm.name = category.name
      this.isUpdateDialogVisible = true
    },
    // 修改分类
    async updateCategory () {
      this.$refs.updateFormRef.validate(async valid => {
        if (valid) {
          console.log(this.updateForm)
          const { data: result } = await this.$http.put(`/admin/classify/${this.updateForm.id}`, this.updateForm)
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
    // 取消修改分类
    cancelUpdate (refName) {
      this.$refs[refName].resetFields()
      this.isUpdateDialogVisible = false
    },
    // 打开删除分类对话框
    openDeleteDialog (id) {
      this.deleteCategoryId = id
      this.isDeleteDialogVisible = true
    },
    // 删除分类
    async deleteCategory (id) {
      this.isDeleteDialogVisible = false
      const { data: result } = await this.$http.delete('/admin/classify/' + id)
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
  font-size: 14px;
}
</style>
