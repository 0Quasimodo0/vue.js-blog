<template>
  <el-card shadow="never">
    <el-tabs v-model="tabsActiveName" stretch>
      <el-tab-pane label="分类整理" name="first">
        <div class="category" v-for="category in categoryList" :key="category.id">
          <div class="category-header" name="category.id">
            <div class="category-header-title">
              <h4><i class="el-icon-s-unfold" style="margin: 10px;"></i>{{ category.name }}</h4>
            </div>
          </div>
          <div class="category-body">
            <el-row :gutter="10">
              <el-col :span="12" v-for="(tag, index) in category.tags" :key="tag.id">
                <el-card
                body-style="background-color: #F2F6FC; border-radius: 10px; padding: 10px; margin: 5px;"
                shadow="hover">
                  <div class="tag" style="display: flex; justify-content:space-between;">
                    <i :class="tagIconClassList[index%5]"></i>
                    <h4>{{ tag.name }}</h4>
                    <el-button type="text" icon="el-icon-view" size="medium" @click="viewArticleListByTag(tag.id)">查看</el-button>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文章列表" name="second">
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
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 默认激活tab名称
      tabsActiveName: 'first',
      // 目录列表
      categoryList: [],
      // 文章列表
      articleList: [],
      // 获取文章列表的参数对象
      queryInfo: {
        pageNum: '',
        pageSize: ''
      },
      // 文章总数
      total: '',
      // 搜索关键字
      searchInput: '',
      // 自定义图标类名
      tagIconClassList: [
        'icon-tag-success-64px',
        'icon-tag-primary-64px',
        'icon-tag-warning-64px',
        'icon-tag-danger-64px',
        'icon-tag-info-64px'
      ],
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
    this.getCategoryList()
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
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/category')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.categoryList = result.data
    },
    // 获取文章列表
    async getArticleList () {
      const { data: result } = await this.$http.post('/article/list', this.queryInfo)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.articleList = result.data.list
      this.queryInfo = result.data
      this.total = result.data.total
    },
    // 根据标签查找文章列表
    viewArticleListByTag (id) {
      this.$router.push('/tag/' + id)
    },
    async viewArticle (id) {
      this.$router.push('/article/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 15px;
}
</style>
