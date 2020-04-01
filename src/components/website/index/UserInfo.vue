<template>
  <div>
    <h4 style="margin: 0px;"><i class="el-icon-info"></i> 关于</h4>
    <div style="margin-top: 15px;">
      <div style="text-align: center;">
        <el-avatar :size="50" :src="user.avatar"></el-avatar>
        <h3 style="margin: 0px; font-family: '微软雅黑';">{{ user.nickname }}</h3>
        <p style="font-size: small; color: grey;">{{ user.motto }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      // 用户信息
      user: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const { data: result } = await this.$http.get('/user/1')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.user = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
  background: rgba(255, 255, 255, 0.7);
}
</style>
