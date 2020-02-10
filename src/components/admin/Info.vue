<template>
  <div>
    <!-- 修改邮箱对话框 -->
    <el-dialog title="修改邮箱" :visible.sync="isUpdateEmailDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-tabs v-model="activeTab_email" stretch>
          <el-tab-pane label="第一步" name="first" :disabled="isDisabled.step1">
            <el-form>
              <p>为了确保是本人操作，请点击下方的“获取验证码”按钮，服务器将向您的邮箱发送验证码。</p>
              <el-form-item label="验证码">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <el-input type="text"></el-input>
                  <el-button type="primary" plain style="margin-left: 15px;">获取验证码</el-button>
                </div>
              </el-form-item>
            </el-form>
            <el-steps :active="activeStep" finish-status="success">
              <el-step title="步骤 1"></el-step>
              <el-step title="步骤 2"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
            <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 15px;">
              <el-button round @click="isUpdateEmailDialogVisible = false">取消</el-button>
              <el-button round type="primary" @click="next()">下一步</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane label="第二步" name="second" :disabled="isDisabled.step2">
          <el-form :model="updateEmailForm" :rules="updateEmailFormRules" ref="updateEmailFormRef">
            <p>您已完成身份验证，请继续填写新的邮箱地址</p>
            <el-form-item label="新邮箱地址" prop="old_pwd">
              <el-input type="password" v-model="updateEmailForm.email"></el-input>
            </el-form-item>
            <p>请点击下方的“获取验证码”按钮，服务器将向您的新邮箱发送验证码，请注意查收</p>
            <el-form-item label="验证码" prop="verifyCode">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <el-input type="text" v-model="updateEmailForm.verifyCode"></el-input>
                <el-button type="primary" plain style="margin-left: 15px;">获取验证码</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-steps :active="activeStep" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 15px;">
            <el-button round @click="isUpdateEmailDialogVisible = false">取消</el-button>
            <el-button round type="primary" @click="finish()">下一步</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="完成" name="third" :disabled="isDisabled.step3">
          <p>您已成功更改绑定邮箱</p>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="isUpdatePwdDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-form :model="updatePasswordForm" :rules="updatePasswordFormRules" ref="updatePasswordFormRef">
        <el-form-item label="原密码" prop="old_pwd">
          <el-input type="password" v-model="updatePasswordForm.old_pwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input type="password" v-model="updatePasswordForm.new_pwd"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <el-input type="text" v-model="updatePasswordForm.code"></el-input>
            <el-button type="primary" plain style="margin-left: 15px;" @click="getCode()">获取验证码</el-button>
          </div>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button round @click="cancelUpdatePassword('updatePasswordFormRef')">取消</el-button>
        <el-button round type="primary" @click="updatePassword()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" style="margin-top: 15px;">
      <h3>账户信息</h3>
      <div>
        <p style="color: #515151; align-items: center; display: flex;"><i class="icon-id-32px" style="margin-right: 5px;"></i> UID: {{ userInfo.id }}</p>
        <p style="color: #515151; align-items: center; display: flex;"><i class="icon-user-32px" style="margin-right: 5px;"></i> Name: {{ userInfo.username }}</p>
      </div>
      <el-divider></el-divider>
      <h3>账号安全</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="never" body-style="padding: 2px">
            <div style="display: flex; justify-content: flex-start; align-items: center; margin-left: 8px;">
              <i class="icon-mail-64px"></i>
              <div style="margin-left: 15px;">
                <h4 style="margin-bottom: 8px;">验证邮箱</h4>
                <p style="color: grey; font-size: small; margin-top: 0px; margin-bottom: 0px;">
                  含有风险的操作都要经过邮箱验证码验证
                </p>
                <el-button type="text" style="margin-top: 0px;" @click="isUpdateEmailDialogVisible = true">修改></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never" body-style="padding: 2px">
            <div style="display: flex; justify-content: flex-start; align-items: center; margin-left: 8px;">
              <i class="icon-password-64px"></i>
              <div style="margin-left: 15px;">
                <h4 style="margin-bottom: 8px;">账号密码</h4>
                <p style="color: grey; font-size: small; margin-top: 0px; margin-bottom: 0px;">
                  请设置一个含有字母数字和下划线的密码
                </p>
                <el-button type="text" style="margin-top: 0px;" @click="isUpdatePwdDialogVisible = true">修改></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 激活的标签
      activeTab: 'first',
      activeTab_email: 'first',
      // 激活的步骤
      activeStep: 0,
      // 控制修改密码对话框的状态
      isUpdatePwdDialogVisible: false,
      // 控制修改邮件对话框的状态
      isUpdateEmailDialogVisible: false,
      // 步骤是否可以执行
      isDisabled: {
        step1: false,
        step2: true,
        step3: true
      },
      // 用户信息表单
      userInfo: {
        id: '',
        username: '',
        email: ''
      },
      // 修改密码表单
      updatePasswordForm: {
        old_pwd: '',
        new_pwd: '',
        code: ''
      },
      // 修改邮件表单
      updateEmailForm: {
        email: '',
        verifyCode: ''
      },
      // 修改邮件表单验证规则
      updateEmailFormRules: {},
      // 修改密码表单验证规则
      updatePasswordFormRules: {
        old_pwd: [
          { required: true, message: '请输入原密码！', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码！', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码！', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    next () {
      this.activeStep++
      this.activeTab_email = 'second'
      this.isDisabled.step1 = true
      this.isDisabled.step2 = false
      this.isDisabled.step3 = true
    },
    async getUserInfo () {
      const { data: result } = await this.$http.get('/admin/' + window.sessionStorage.getItem('uid'))
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.userInfo = result.data
    },
    // 获取验证码
    async getCode () {
      const { data: result } = await this.$http.get('/verify/update', { params: { id: window.sessionStorage.getItem('uid') } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
    },
    async updatePassword () {
      const { data: result } = await this.$http.put('/admin/' + window.sessionStorage.getItem('uid') + '/password', this.updatePasswordForm)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 取消修改密码
    cancelUpdatePassword (refName) {
      this.isUpdatePwdDialogVisible = false
      this.$refs[refName].resetFields()
    },
    // 取消修改密码
    cancelUpdateEmail (refName) {
      this.isUpdateEmailDialogVisible = false
      this.$refs[refName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
