<template>
  <el-card shadow="never">
    <el-tabs v-model="tabsActiveName" stretch>
      <el-tab-pane label="最新动态" name="first">
        <el-card shadow="hover" style="margin-bottom: 5px;" v-for="(item, index) in dynamicList" :key="item.id">
          <h4># {{ userInfo.name }}在【{{ item.category.name }}】目录中发布了一篇新文章</h4>
          <div class="articleLink">
            <div style="display: flex; align-items: center; justify-content: flex-start;">
              <i :class="iconClassList.article[index%5]"></i>
              <div style="margin-left: 8px;">
                <h4 style="margin-top: 2px; margin-bottom: 8px;">{{ item.title }}</h4>
                <el-tag v-for="(tag, i) in item.tags" :key="tag.id" :type="colorList[i%5]" style="margin-right: 5px;" effect="light">
                  {{ tag.name }}
                </el-tag>
              </div>
            </div>
            <el-button type="primary" round icon="el-icon-view" size="small" @click="viewArticle(item.id)">查看</el-button>
          </div>
        </el-card>
        <el-divider content-position="center"><p style="color: grey;">最多只显示10条内容</p></el-divider>
      </el-tab-pane>
      <el-tab-pane label="实用工具" name="second">
        <h3>模块正在开发中...</h3>
      </el-tab-pane>
      <el-tab-pane label="导航链接" name="third">
        <el-row :gutter="10">
          <el-col :span="12" v-for="item in linkList" :key="item.id" style="margin-bottom: 10px;">
            <div class="link-card">
              <el-avatar :src="item.iconUrl" style="background-color: white;"></el-avatar>
              <div style="margin-left: 8px;">
                <h5 style="margin: 0px;">{{ item.name }}</h5>
                <el-link :href="item.linkUrl" :underline="false" style="margin: 0px;">{{ item.linkUrl }}</el-link>
              </div>
            </div>
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px;"></el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 默认激活的tab名
      tabsActiveName: 'first',
      // 链接列表
      linkList: [],
      // 用户信息
      userInfo: {
        name: 'Frank Fang',
        intro: '个性签名'
      },
      // 动态列表
      dynamicList: [],
      // 图标类名列表
      iconClassList: {
        article: ['icon-article-success-64px', 'icon-article-primary-64px', 'icon-article-warning-64px', 'icon-article-danger-64px', 'icon-article-info-64px']
      },
      // 颜色列表
      colorList: ['success', 'primary', 'warning', 'danger', 'info']
    }
  },
  created () {
    this.getDynamicList()
    this.getLinkList()
  },
  methods: {
    // 获取动态列表
    async getDynamicList () {
      const { data: result } = await this.$http.get('/article/dynamic', { params: { size: 10 } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.dynamicList = result.data
    },
    // 获取导航链接
    async getLinkList () {
      const { data: result } = await this.$http.get('/link')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.linkList = result.data
    },
    // 查看文章
    viewArticle (id) {
      this.$router.push('/article/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.nav-left{
  margin: 0;
}
.articleLink {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #F2F6FC;
  border-radius: 10px;
  padding: 20px;
}
.link-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #F2F6FC;
  border-radius: 8px;
  padding: 10px;
}
</style>
