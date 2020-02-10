<template>
  <div class="container">
    <el-card class="loginCard" shadow="never">
      <el-form class="login_form" :model="loginRuleForm" :rules="loginFormRules" ref="loginFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginRuleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginRuleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div style="display: flex; align-items: center;">
            <el-input type="text" v-model="loginRuleForm.code"></el-input>
            <el-button type="primary" plain round style="margin-left: 10px;" @click="getVerificationCode()">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" round @click="doLogin()">登录</el-button>
          <el-button type="info" round @click="resetLoginForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      loginRuleForm: {
        username: '',
        password: '',
        code: ''
      },
      // 表单的验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置登录表单
    resetLoginForm (refName) {
      this.$refs[refName].resetFields()
      // console.log(this)
    },
    // 获取邮箱验证码
    async getVerificationCode () {
      if (this.loginRuleForm.username !== '') {
        const { data: result } = await this.$http.get('/verify/login', { params: { username: this.loginRuleForm.username } })
        if (result.status !== 200) {
          return this.$message.error(result.message)
        }
        this.$message.success(result.message)
      } else {
        this.$message.error('请填写用户名')
      }
    },
    async login () {
      const { data: result } = await this.$http.post('/verify/check', null, { params: { key: this.loginRuleForm.username, value: this.loginRuleForm.code } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.doLogin()
    },
    // 登录
    doLogin () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const { data: response } = await this.$http.post('/verify/check', null, { params: { key: this.loginRuleForm.username, value: this.loginRuleForm.code } })
          if (response.status !== 200) {
            this.resetLoginForm('loginFormRef')
            return this.$message.error(response.message)
          }
          this.loginForm.username = this.loginRuleForm.username
          this.loginForm.password = this.loginRuleForm.password
          const { data: result } = await this.$http.post('/login', this.loginForm)
          if (result.status !== 200) {
            this.resetLoginForm('loginFormRef')
            return this.$message.error(result.message)
          }
          this.$message.success(result.message)
          window.sessionStorage.setItem('uid', result.data.id)
          window.sessionStorage.setItem('token', result.data.token)
          this.$router.push('/admin')
        } else {
          this.$message.warning('请正确填写表单内容！')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 40%;
  margin-left: 30%;
}
.header{
  height: 15%;
}
.main{
  background-color: #F2F6FC;
}
.footer{
  height: 15%;
}
.loginCard{
  margin: 10%;
  align-items: center;
}
.button{
  display: flex;
  justify-content: flex-end;
}
</style>
