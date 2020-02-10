<template>
  <el-card>
    <div style="display: flex; align-items: center;">
      <el-input type="text" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <!-- 文章列表 -->
    <el-card v-for="(article, index) in articleList" :key="article.id" shadow="hover" class="ArticleCard">
      <div style="display: flex; align-items: center; justify-content: flex-start;">
        <i :class="iconClassList.article[index%5]"></i>
        <div style="margin-left: 8px;">
          <h3 style="margin-bottom: 10px;">{{ article.title }}</h3>
          <p style="color: grey; font-size: small; margin-top: 0px;">简介：{{ article.introduction }}</p>
        </div>
      </div>
      <div style="align-items: center; display: flex; justify-content: space-between;">
        <div style="align-items: center; display: flex;">
          <div style="align-items: center; display: flex;">
            <i class="icon-category2-24px"></i>
            <h5 style="margin-left: 5px; margin-right: 5px;">{{ article.category.name }}</h5>
          </div>
          <el-tag v-for="(tag, index) in article.tags" :key="tag.id"
          :type="tagTypes[index%5]" style="margin: 5px;" effect="light">
            {{ tag.name }}
          </el-tag>
        </div>
        <el-button icon="el-icon-view"
        type="primary"
        size="small"
        round
        style="justify-content: flex-end;"
        @click="viewArticle(article.id)">查看</el-button>
      </div>
    </el-card>
    <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background>
        </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      articleList: [],
      // 获取文章列表的参数对象
      queryInfo: {
        key: '',
        pageNum: 1,
        pageSize: 10
      },
      // 文章总数
      total: '',
      // 标签类型
      tagTypes: ['success', 'primary', 'warning', 'danger', 'info'],
      // 图标类名列表
      iconClassList: {
        article: ['icon-article-success-64px', 'icon-article-primary-64px', 'icon-article-warning-64px', 'icon-article-danger-64px', 'icon-article-info-64px']
      }
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getArticleList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getArticleList()
    },
    // 获取文章列表
    async getArticleList () {
      this.queryInfo.key = this.$route.params.key
      const { data: result } = await this.$http.post('/search/article', this.queryInfo)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.articleList = result.data.list
      this.queryInfo.pageNum = result.data.pageNum
      this.queryInfo.pageSize = result.data.pageSize
      this.total = result.data.total
    },
    // 查看文章
    async viewArticle (id) {
      this.$router.push('/article/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.ArticleCard {
  margin: 10px;
}
</style>
