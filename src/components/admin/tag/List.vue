<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
      <el-breadcrumb-item>标签列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加标签对话框 -->
    <el-dialog title="添加标签" :visible.sync="isAddDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="formRules" ref="addFormRef">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="categoryId">
          <p>* 所属标签</p>
          <el-select v-model="addForm.categoryId" clearable placeholder="请选择所属目录" @focus="getCategoryList">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-button type="primary" plain icon="el-icon-plus" style="margin-left: 10px;" @click="addCategory">新建</el-button>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button round @click="cancelAdd('addFormRef')">取消</el-button>
        <el-button round type="primary" @click="addTag('addFormRef')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改标签对话框 -->
    <el-dialog title="修改标签" :visible.sync="isUpdateDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="categoryId">
          <p>* 所属目录</p>
          <el-select v-model="updateForm.categoryId" clearable placeholder="请选择所属目录" @focus="getCategoryList">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-button type="primary" plain icon="el-icon-plus" style="margin-left: 10px;" @click="addCategory">新建</el-button>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button round @click="cancelUpdate('updateFormRef')">取消</el-button>
        <el-button round type="primary" @click="updateTag">确定</el-button>
      </span>
    </el-dialog>
    <!-- 删除标签对话框 -->
    <el-dialog title="删除标签" :visible.sync="isDeleteDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <span>确定要删除该标签吗？</span>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button round @click="isDeleteDialogVisible = false">取消</el-button>
        <el-button round type="primary" @click="deleteTag(deleteTagId)">确定</el-button>
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
          <el-button type="primary" @click="isAddDialogVisible = true">添加标签</el-button>
        </el-col>
      </el-row>
      <!-- 列表区 -->
      <el-table :data="tagList" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="标签ID" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="所属目录" prop="category.name"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" circle size="small" @click="openUpdateDialog (scope.row) "></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" circle size="small" @click="openDeleteDialog (scope.row.id) "></el-button>
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
      // 控制添加目录对话框的显示与隐藏
      isAddDialogVisible: false,
      // 控制添加目录对话框的显示与隐藏
      isUpdateDialogVisible: false,
      // 控制确认删除对话框的显示与隐藏
      isDeleteDialogVisible: false,
      // 添加目录的表单数据
      addForm: {
        name: '',
        categoryId: ''
      },
      // 添加表单的验证规则
      formRules: {
        name: [
          { required: true, message: '请输入标签名称！', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择所属目录！', trigger: 'change' }
        ]
      },
      // 添加表单的验证规则
      updateFormRules: {
        name: [
          { required: true, message: '请输入标签名称！', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择所属目录！', trigger: 'change' }
        ]
      },
      // 标签列表
      tagList: [],
      // 目录列表
      categoryList: [],
      // 修改的标签
      updateForm: {
        id: '',
        name: '',
        categoryId: ''
      },
      // 要删除的标签id
      deleteTagId: ''
    }
  },
  created () {
    this.getTagList()
  },
  methods: {
    // 获取标签列表
    async getTagList () {
      const { data: result } = await this.$http.get('/admin/tag/list')
      if (result.status !== 200) {
        this.$message.error(result.message)
      }
      this.tagList = result.data
    }, // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/admin/category/list')
      if (result.status !== 200) {
        this.$message.error(result.message)
      }
      this.categoryList = result.data
    },
    // 添加标签
    async addTag (refName) {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          console.log(this.addForm)
          const { data: result } = await this.$http.post('/admin/tag/add', this.addForm)
          if (result.status !== 200) {
            return this.$message.error(result.message)
          }
          this.$message.success(result.message)
          this.isAddDialogVisible = false
          // 重置表单
          this.$refs[refName].resetFields()
          this.getTagList()
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
    // 添加目录
    addCategory () {
      this.$router.push('/admin/category/list')
    },
    // 打开修改标签对话框
    openUpdateDialog (tag) {
      this.updateForm.id = tag.id
      this.updateForm.name = tag.name
      if (tag.category !== null) {
        this.updateForm.categoryId = tag.category.id
      } else {
        this.updateForm.categoryId = ''
      }
      this.isUpdateDialogVisible = true
    },
    // 修改目录
    async updateTag () {
      this.$refs.updateFormRef.validate(async valid => {
        if (valid) {
          const { data: result } = await this.$http.put('/admin/tag/update', this.updateForm)
          if (result.status !== 200) {
            return this.$message.error(result.message)
          }
          this.isUpdateDialogVisible = false
          this.$message.success(result.message)
          this.getTagList()
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
      this.isDeleteDialogVisible = true
      this.deleteTagId = id
    },
    // 删除标签
    async deleteTag (id) {
      const { data: result } = await this.$http.delete('/admin/tag/delete/' + id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.deleteTagId = ''
      this.isDeleteDialogVisible = false
      this.$message.success(result.message)
      this.getTagList()
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
