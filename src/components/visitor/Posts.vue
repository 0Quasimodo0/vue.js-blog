<template>
  <el-card shadow="never">
    <!-- 页头 -->
    <el-page-header @back="goBack" content="文章">
    </el-page-header>
    <h1 class="info-title">{{ article.title }}</h1>
    <!-- 基本信息 -->
    <div class="info-header">
      <i class="icon-author-success-48px"></i>
      <div class="info-header-author">
        <h3 class="info-header-author-name">Quasimodo</h3>
        <p class="info-header-author-date">发布时间：{{ article.date }}</p>
      </div>
    </div>
    <div class="info-tags">
      <h4>【 {{ article.category.name }} 】</h4>
      <el-tag v-for="(tag, index) in article.tags" :key="tag.id" :type="tagTypes[index%5]" effect="dark" size="small">
        {{ tag.name }}
      </el-tag>
    </div>
    <!-- 正文 -->
    <div class="markdown-body">
      <div class="content" v-html= "article.content_html">
        {{ article.content_html }}
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      article: '',
      tagTypes: ['success', 'primary', 'warning', 'danger', 'info']
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    // 获取文章
    async getArticle () {
      const { data: result } = await this.$http.get('/article/' + this.$route.params.id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.article = result.data
    },
    // 返回到上一页面
    goBack () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.info-title {
  margin-top: 30px;
  margin-bottom: 30px;
}
.info-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.info-header-author {
  margin-left: 15px;
}
.info-header-author-name {
  margin: 0px;
}
.info-header-author-date {
  margin: 1px;
  color: gray;
  font-size: small;
}
.info-tags {
  margin: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.el-tag {
  margin: 5px;
}
</style>
