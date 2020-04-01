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
                  <el-input type="text" v-model="checkCode"></el-input>
                  <el-button type="primary" plain style="margin-left: 15px;" @click="getCode()">获取验证码</el-button>
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
              <el-input type="text" v-model="updateEmailForm.email"></el-input>
            </el-form-item>
            <p>请点击下方的“获取验证码”按钮，服务器将向您的新邮箱发送验证码，请注意查收</p>
            <el-form-item label="验证码" prop="verifyCode">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <el-input type="text" v-model="updateEmailForm.code"></el-input>
                <el-button type="primary" plain style="margin-left: 15px;" @click="getActiveCode()">获取验证码</el-button>
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
          <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 15px;">
            <el-button round @click="isUpdateEmailDialogVisible = false">取消</el-button>
            <el-button round type="primary" @click="isUpdateEmailDialogVisible = false">完成</el-button>
          </div>
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
    <el-tabs v-model="Switch.activeName">
      <el-tab-pane label="个人中心" name="first">
        <div>
          <h3><i class="el-icon-user-solid"></i> 个人信息</h3>
          <div style="margin-top: 15px;">
            <div style="text-align: center;">
              <el-avatar :size="50" :src="user.avatar"></el-avatar>
              <h3 style="margin: 0px; font-family: '微软雅黑';">{{ user.nickname }}</h3>
              <p style="font-size: small; color: grey;">{{ user.motto }}</p>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div>
          <h3><i class="el-icon-warning"></i> 账号安全</h3>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card shadow="always" body-style="padding: 2px; background-color: #F2F6FC;" style="background: rgba(255, 255, 255, 0.7);">
                <div style="display: flex; justify-content: flex-start; align-items: center; margin-left: 8px;">
                  <i class="icon-mail-64px" style="width: 30%;"></i>
                  <div>
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
              <el-card shadow="always" body-style="padding: 2px; background-color: #F2F6FC;" style="background: rgba(255, 255, 255, 0.7);">
                <div style="display: flex; justify-content: flex-start; align-items: center; margin-left: 8px;">
                  <i class="icon-password-64px" style="width: 25%;"></i>
                  <div>
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
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改信息" name="second">
        <!-- 头像上传 -->
        <div class="image">
          <h4>头像</h4>
          <el-upload
            class="avatar-uploader"
            :action="policyInfo.host"
            accept=".jpg,.png,.jpeg"
            :data="policyInfo"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.update.info.avatar" :src="form.update.info.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="nickname" style="display: flex; justify-content: flex-start; align-items: center;">
          <h4>昵称:</h4>
          <el-input v-model="form.update.info.nickname" style="width: 300px; margin-left: 15px;"></el-input>
        </div>
        <div class="motto" style="display: flex; justify-content: flex-start; align-items: center;">
          <h4>座右铭:</h4>
          <el-input v-model="form.update.info.motto" style="width: 300px; margin-left: 15px;"></el-input>
        </div>
        <div class="introduction">
          <h4>简介:</h4>
          <el-input v-model="form.update.info.introduction" type="textarea" style="width: 600px;" :rows="5"></el-input>
        </div>
        <div class="button-area" style="display: flex; justify-content: flex-end; margin-top: 15px;">
          <el-button type="success" round icon="el-icon-check" @click="updateInfo()">修改</el-button>
          <el-button type="primary" round icon="el-icon-refresh" @click="getUserInfo()">还原</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单
      form: {
        // 更新
        update: {
          // 展示信息
          info: {
            avatar: '',
            nickname: '',
            motto: '',
            introduction: ''
          },
          // 密码
          password: {
            // 旧密码
            old_pwd: '',
            // 新密码
            new_pwd: '',
            // 邮箱验证码
            code: ''
          },
          // 邮箱
          email: {
            // 新邮箱
            email: '',
            // 邮箱验证码
            code: ''
          }
        }
      },
      // 开关
      Switch: {
        activeName: 'first'
      },
      // OSS对象存储授权信息
      policyInfo: {
        OSSAccessKeyId: '',
        policy: '',
        signature: '',
        key: '',
        dir: '',
        host: '',
        success_action_status: 200
      },
      // 激活的标签
      activeTab: 'first',
      activeTab_email: 'first',
      // 激活的步骤
      activeStep: 0,
      // 控制修改密码对话框的状态
      isUpdatePwdDialogVisible: false,
      // 控制修改邮件对话框的状态
      isUpdateEmailDialogVisible: false,
      // 身份验证
      checkCode: '',
      // 步骤是否可以执行
      isDisabled: {
        step1: false,
        step2: true,
        step3: true
      },
      // 用户信息
      user: {
        nickname: '',
        avatar: '',
        motto: '',
        introduction: ''
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
        code: ''
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
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeAvatarUpload (file) {
      const isType = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg'
      const isSize = file.size < 2097152
      // 判断上传文件的类型是否为指定类型
      if (!isType) {
        this.$message.error('请上传png/jpg/jpeg格式的图片!')
        return false
      }
      // 判断上传文件的大小是否超过限制
      if (!isSize) {
        this.$message.error('图片大小不能超过2MB!')
        return false
      }
      // 返回一个Promise对象
      return new Promise((resolve, reject) => {
        this.$http.get('/admin/aliyun/oss/policy', { params: { id: window.sessionStorage.getItem('uid'), type: 'img', details: 'avatar' } }).then(response => {
          this.policyInfo.OSSAccessKeyId = response.data.accessKeyId
          this.policyInfo.policy = response.data.policy
          this.policyInfo.signature = response.data.signature
          this.policyInfo.key = response.data.dir + '/' + response.data.key + '.' + (file.name).split('.')[1]
          this.policyInfo.dir = response.data.dir
          this.policyInfo.host = response.data.host
          resolve(true)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 文件上传成功时的钩子，参数为(response, file, fileList)
    handleAvatarSuccess (response, file) {
      const url = this.policyInfo.host + '/' + this.policyInfo.key
      this.$http.put(`/admin/${window.sessionStorage.getItem('uid')}/avatar`, { avatar: url }).then(response => {
        const result = response.data
        if (result.status !== 200) {
          this.$message.error(result.message)
        } else {
          this.$message.success(result.message)
          this.getUserInfo()
        }
      })
    },
    // 下一步操作
    async next () {
      const { data: result } = await this.$http.post('/verify/check', null, { params: { key: window.sessionStorage.getItem('uid'), value: this.checkCode } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.activeStep++
      this.activeTab_email = 'second'
      this.isDisabled.step1 = true
      this.isDisabled.step2 = false
      this.isDisabled.step3 = true
    },
    // 完成修改邮箱
    async finish () {
      const { data: result } = await this.$http.put('/admin/' + window.sessionStorage.getItem('uid') + '/email', this.updateEmailForm)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.activeStep++
      this.activeTab_email = 'third'
      this.isDisabled.step1 = true
      this.isDisabled.step2 = true
      this.isDisabled.step3 = false
    },
    // 获取用户信息
    async getUserInfo () {
      const { data: result } = await this.$http.get('/user/' + window.sessionStorage.getItem('uid'))
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.user = result.data
      this.form.update.info = result.data
    },
    // 修改用户信息
    async updateInfo () {
      const { data: result } = await this.$http.put('/admin', { id: window.sessionStorage.getItem('uid'), nickname: this.form.update.info.nickname, motto: this.form.update.info.motto, introduction: this.form.update.info.introduction })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.getUserInfo()
    },
    // 获取验证码
    async getCode () {
      const { data: result } = await this.$http.get('/verify/update', { params: { id: window.sessionStorage.getItem('uid') } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
    },
    // 获取激活码
    async getActiveCode () {
      const { data: result } = await this.$http.get('/verify/active', { params: { to: this.updateEmailForm.email } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
    },
    // 修改密码
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
