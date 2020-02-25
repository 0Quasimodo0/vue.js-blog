<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/article/list' }">文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>文章查看</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 文章显示区域 -->
      <div class="markdown-body">
          <div class="content" v-html= "this.article.content_html">
            {{ this.article.content_html }}
          </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: ''
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    async getArticle () {
      const { data: result } = await this.$http.get('/article/' + this.$route.params.id)
      if (result.status !== 200) {
        return this.$message.error('读取文章内容失败！')
      }
      this.article = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
</style>
