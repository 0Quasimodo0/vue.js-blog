<template>
  <el-container>
    <el-header>
      <h3 style="margin: 0px; align-items: center; display: flex; font-size:20pt; color: #409EFF;"><i class="icon-logo-128px"></i>{{ websiteInfo.brand }}</h3>
      <el-menu mode="horizontal" class="nav-head" :router="true">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="small" class="nav-head-input" v-model="input" clearable @input="search()"></el-input>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/category" >博客</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
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
    </el-main>
    <el-footer>
      <div style="width: 70%; margin-left: 15%;">
        <el-row :gutter="20">
          <el-col :span="8">
            <h5>博客</h5>
            <el-row v-for="item in footerInfo.blogLinks" :key="item.id">
              <el-link :underline="false" :href="item.linkUrl">{{ item.name }}</el-link>
            </el-row>
          </el-col>
          <el-col :span="8">
            <h5>教程</h5>
            <el-row v-for="item in footerInfo.courseLinks" :key="item.id">
              <el-link :underline="false" :href="item.linkUrl">{{ item.name }}</el-link>
            </el-row>
          </el-col>
          <el-col :span="8">
            <h5>平台</h5>
            <el-row v-for="item in footerInfo.platformLinks" :key="item.id">
              <el-link :underline="false" :href="item.linkUrl">{{ item.name }}</el-link>
            </el-row>
          </el-col>
        </el-row>
        <div style="text-align: center;">
          <p style="color: grey; font-size: small; margin: 20px;">{{ websiteInfo.copyright }}</p>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      websiteInfo: {
        brand: '',
        Copyright: ''
      },
      footerInfo: {
        blogLinks: [
          { id: '1', name: '博客园', linkUrl: 'https://www.cnblogs.com/', iconUrl: 'https://www.cnblogs.com/favicon.ico' },
          { id: '2', name: 'CSDN', linkUrl: 'https://www.csdn.net/', iconUrl: 'https://www.csdn.net/favicon.ico' }
        ],
        courseLinks: [
          { id: '1', name: '菜鸟教程', linkUrl: 'http://www.runoob.com', iconUrl: 'https://www.runoob.com/favicon.ico' },
          { id: '2', name: 'W3School', linkUrl: 'https://www.w3school.com.cn/', iconUrl: 'https://www.w3school.com/favicon.ico' }
        ],
        platformLinks: [
          { id: '1', name: 'LeetCode', linkUrl: 'https://leetcode-cn.com/', iconUrl: 'https://leetcode.com/favicon.ico' },
          { id: '2', name: '思否', linkUrl: 'https://segmentfault.com/', iconUrl: 'https://segmentfault.com/favicon.ico' }
        ]
      },
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
  created () {
    this.getWebsiteInfo()
  },
  methods: {
    async getWebsiteInfo () {
      const { data: result } = await this.$http.get('/setting')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.websiteInfo = result.data
    },
    // 搜索文章
    search () {
      if (this.input !== '') {
        return this.$router.push('/search/' + this.input)
      }
      this.$router.push('/category')
    },
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
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-head-logo {
  position: absolute;
  left: 0px;
  top: 5px;
}
.nav-head-input {
  width: 200px;
  height: 15px;
  margin: 15px;
}
.nav-head {
  display: flex;
  justify-content: flex-end;
}
.el-main {
  background-color: #F2F6FC;
}
.container{
  width: 40%;
  margin-left: 30%;
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
