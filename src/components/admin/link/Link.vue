<template>
  <div>
    <!-- 添加链接对话框 -->
    <el-dialog title="添加链接" :visible.sync="isAddDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="formRules" ref="addFormRef">
        <el-form-item label="链接名称" prop="name">
          <el-input placeholder="请输入内容" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="linkUrl">
          <el-input placeholder="请输入内容" v-model="addForm.linkUrl">
            <template slot="append">
              <el-link :underline="false" :href="addForm.linkUrl">测试</el-link>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="图标地址" prop="iconUrl">
          <el-input placeholder="请输入内容" v-model="addForm.iconUrl">
            <template slot="prepend">
              <el-avatar size="small" :src="addForm.iconUrl" style="background-color: white;"></el-avatar>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="classifyId">
          <el-select v-model="addForm.classifyId">
            <el-option v-for="item in classifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="* 快速导航">
          <el-switch v-model="addForm.visible"></el-switch>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button round @click="cancelAdd('addFormRef')">取消</el-button>
        <el-button round type="primary" @click="addLink('addFormRef')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改标签对话框 -->
    <el-dialog title="修改链接" :visible.sync="isUpdateDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-form :model="updateForm" :rules="formRules" ref="updateFormRef">
        <el-form-item label="链接名称" prop="name">
          <el-input placeholder="请输入内容" v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="linkUrl">
          <el-input placeholder="请输入内容" v-model="updateForm.linkUrl">
            <template slot="append">
              <el-link :underline="false" :href="updateForm.linkUrl">测试</el-link>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="图标地址" prop="iconUrl">
          <el-input placeholder="请输入内容" v-model="updateForm.iconUrl">
            <template slot="prepend">
              <el-avatar size="small" :src="updateForm.iconUrl" style="background-color: white;"></el-avatar>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button round @click="cancelUpdate()">取消</el-button>
        <el-button round type="primary" @click="updateLink()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 删除标签对话框 -->
    <el-dialog title="删除标签" :visible.sync="isDeleteDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <span>确定要删除该链接吗？</span>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button round @click="isDeleteDialogVisible = false">取消</el-button>
        <el-button round type="primary" @click="deleteLink(deleteLinkId)">确定</el-button>
      </span>
    </el-dialog>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>链接管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never">
      <!-- 搜索区 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="isAddDialogVisible = true">添加链接</el-button>
        </el-col>
      </el-row>
      <el-table :data="linkList" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="名称" prop="name" width="120px"></el-table-column>
        <el-table-column label="链接地址" prop="linkUrl">
          <template slot-scope="scope">
            <el-link :underline="false" :href="scope.row.linkUrl">{{ scope.row.linkUrl }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="图标地址" prop="iconUrl">
          <template slot-scope="scope">
            <div style="display: flex; align-items: center;">
              <el-avatar size="small" :src="scope.row.iconUrl" style="background-color: white; margin-right: 5px;"></el-avatar>
              <span>{{ scope.row.iconUrl }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所属分类" width="120px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.classify.id" @change="changeClassify(scope.row)">
              <el-option v-for="item in classifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="快速链接" prop="visible" width="80px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.visible" @change="changeVisible(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="success" icon="el-icon-edit" circle size="small " @click="openUpdateDialog(scope.row) "></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" circle size="small" @click="openDeleteDialog(scope.row.id) "></el-button>
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
      // 控制添加对话框
      isAddDialogVisible: false,
      // 控制修改对话框
      isUpdateDialogVisible: false,
      // 控制删除对话框
      isDeleteDialogVisible: false,
      // 删除链接id
      deleteLinkId: '',
      // 链接列表
      linkList: [],
      // 分类列表
      classifyList: [],
      // 添加表单
      addForm: {
        name: '',
        linkUrl: '',
        iconUrl: '',
        visible: false,
        classifyId: ''
      },
      // 修改表单
      updateForm: {
        id: '',
        name: '',
        linkUrl: '',
        iconUrl: ''
      },
      // 验证表单
      formRules: {
        name: [
          { required: true, message: '请输入链接名称！', trigger: 'blur' }
        ],
        linkUrl: [
          { required: true, message: '请输入链接地址！', trigger: 'blur' }
        ],
        iconUrl: [
          { required: true, message: '请输入图标地址！', trigger: 'blur' }
        ],
        classifyId: [
          { required: true, message: '请选择链接所属分类！', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getLinkList()
    this.getClassifyList()
  },
  methods: {
    // 获取链接列表
    async getLinkList () {
      const { data: result } = await this.$http.get('/link', { params: { classify: true } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.linkList = result.data
    },
    // 获取分类列表
    async getClassifyList () {
      const { data: result } = await this.$http.get('/classify', { params: { links: false } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.classifyList = result.data
    },
    // 设置链接为快速链接
    async changeVisible (linkInfo) {
      const { data: result } = await this.$http.put(`/admin/link/${linkInfo.id}?visible=${linkInfo.visible}`)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.getLinkList()
    },
    // 修改链接分类
    async changeClassify (linkInfo) {
      const { data: result } = await this.$http.put(`/admin/link/${linkInfo.id}/classify/${linkInfo.classify.id}`)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.getLinkList()
    },
    // 添加链接
    addLink (refName) {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          const { data: result } = await this.$http.post('/admin/link', this.addForm)
          if (result.status !== 200) {
            return this.$message.error(result.message)
          }
          this.isAddDialogVisible = false
          this.$refs[refName].resetFields()
          this.addForm.visible = false
          this.getLinkList()
          this.$message.success(result.message)
        } else {
          this.$message.warning('请正确填写表单')
        }
      })
    },
    // 取消添加
    cancelAdd (refName) {
      this.$refs[refName].resetFields()
      this.isAddDialogVisible = false
    },
    // 打开修改链接对话框
    openUpdateDialog (link) {
      this.updateForm = link
      this.isUpdateDialogVisible = true
    },
    // 修改链接
    updateLink () {
      this.$refs.updateFormRef.validate(async valid => {
        if (valid) {
          const { data: result } = await this.$http.put('/admin/link', this.updateForm)
          if (result.status !== 200) {
            return this.$message.error(result.message)
          }
          this.isUpdateDialogVisible = false
          this.$message.success(result.message)
          this.getLinkList()
        } else {
          this.$message.warning('请正确填写表单信息！')
        }
      })
    },
    // 取消修改链接
    cancelUpdate (refName) {
      // this.$refs[refName].resetFields()
      this.isUpdateDialogVisible = false
    },
    // 打开删除链接对话框
    openDeleteDialog (id) {
      this.isDeleteDialogVisible = true
      this.deleteLinkId = id
    },
    // 删除链接
    async deleteLink (id) {
      const { data: result } = await this.$http.delete('/admin/link/' + id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.deleteLinkId = ''
      this.isDeleteDialogVisible = false
      this.$message.success(result.message)
      this.getLinkList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
</style>
