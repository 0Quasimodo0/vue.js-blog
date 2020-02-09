<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>网站设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never">
      <el-form :model="websiteInfoForm" :rules="websiteInfoFormRules" ref="websiteInfoFormRef">
        <h4>基本信息</h4>
        <el-form-item label="网站名称" prop="brand">
          <el-input type="text" v-model="websiteInfoForm.brand"></el-input>
        </el-form-item>
        <el-form-item label="版权信息" prop="copyright">
          <el-input type="text" v-model="websiteInfoForm.copyright"></el-input>
        </el-form-item>
        <div class="button-area">
          <el-button type="primary" round @click="updateInfo()">修改</el-button>
          <el-button type="info" round @click="cancelInfo()">取消</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 网站信息表单
      websiteInfoForm: {
        brand: '',
        copyright: ''
      },
      // 验证规则
      websiteInfoFormRules: {
        brand: [
          { required: true, message: '请输入网站名称！', trigger: 'blur' }
        ],
        copyright: [
          { required: true, message: '请输入版权信息！', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getWebsiteInfo()
  },
  methods: {
    // 获取网站配置
    async getWebsiteInfo () {
      const { data: result } = await this.$http.get('/setting')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.websiteInfoForm = result.data
    },
    // 修改配置
    updateInfo () {
      this.$refs.websiteInfoFormRef.validate(async valid => {
        if (valid) {
          const { data: result } = await this.$http.put('/admin/setting', this.websiteInfoForm)
          if (result.status !== 200) {
            return this.$message.error(result.message)
          }
          this.$message.success(result.message)
          this.getWebsiteInfo()
        }
      })
    },
    // 取消修改配置
    cancelInfo () {
      this.getWebsiteInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.button-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
