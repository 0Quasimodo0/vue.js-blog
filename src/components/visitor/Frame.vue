<template>
  <el-container>
    <el-header>
      <div class="container-header">
        <el-link :underline="false" href="http://www.frankfang.cn">
          <h2><i class="icon-logo-128px"></i>{{ websiteInfo.brand }}</h2>
        </el-link>
        <el-menu mode="horizontal" :router="true">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="small" v-model="input" clearable @input="search()"></el-input>
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/category" >博客</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <router-view v-if="isRouterAlive"></router-view>
    </el-main>
    <el-footer>
      <div class="container-footer">
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
        <div style="text-align: center; align-items: center;">
          <p style="color: grey; font-size: small; margin: 20px; margin-bottom: 0px;">{{ websiteInfo.copyright }}</p>
          <el-link :href="footerInfo.miitGovLink">
            <p style="margin: 0px; margin-bottom: 10px; font-size: small; color: grey;">{{ websiteInfo.beianInfo }}</p>
          </el-link>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      input: '',
      isRouterAlive: true,
      websiteInfo: {
        brand: '',
        Copyright: '',
        beianInfo: ''
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
        ],
        miitGovLink: 'http://beian.miit.gov.cn/'
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
      this.$router.back(-1)
    },
    // 重新加载页面
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container-header {
  width: 72%;
  margin-left: 14%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2{
    margin: 0px;
    align-items: center;
    display: flex;
    font-size:20pt;
    color: #409EFF;
  }
  .el-menu{
    display: flex;
    justify-content: flex-end;
    .el-input{
      width: 200px;
      height: 15px;
      margin: 15px;
    }
  }
}
.container-footer{
  width: 72%;
  margin-left: 14%;
}
.el-main {
  background-color: #F2F6FC;
}
</style>
