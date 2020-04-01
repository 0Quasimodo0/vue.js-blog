<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never" body-style="padding: 15px;">
          <div>
            <h4 style="margin: 0px;"><i class="el-icon-info"></i> 个人信息</h4>
            <div style="margin-top: 15px;">
              <div style="text-align: center;">
                <el-avatar :size="50" :src="user.avatar"></el-avatar>
                <h3 style="margin: 0px; font-family: '微软雅黑';">{{ user.nickname }}</h3>
                <p style="font-size: small; color: grey;">{{ user.motto }}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 style="margin: 0px;"><i class="el-icon-user-solid"></i> 关于我</h4>
            <p style="font-family: '微软雅黑'; font-size: small; color: grey;">{{ user.introduction }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card shadow="never">
          <div>
            <h4 style="margin: 0px;"><i class="el-icon-warning"></i> 声明</h4>
            <p style="font-family: '微软雅黑';">{{ about.declare }}</p>
          </div>
          <div v-if="false">
            <h3 style="margin: 0px;"><i class="el-icon-s-comment"></i>  留言板</h3>
            <el-form>
              <el-form-item label="邮箱">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <el-input type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div style="display: flex; justify-content: flex-end;">
              <el-button type="success" round icon="el-icon-check">提交</el-button>
              <el-button type="primary" round icon="el-icon-refresh">重置</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用户信息
      user: {},
      // 关于
      about: {
        declare: ''
      }
    }
  },
  created () {
    this.getUserInfo()
    this.getWebsiteInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const { data: result } = await this.$http.get('/user/1')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.user = result.data
    },
    // 获取网站信息
    async getWebsiteInfo () {
      const { data: result } = await this.$http.get('/setting')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.about.declare = result.data.statement
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 66%;
  margin-left: 17%;
}
.el-card {
  background: rgba(255, 255, 255, 0.7);
  height: 500px;
}
</style>
