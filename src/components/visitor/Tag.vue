<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="5">
        <!-- 左侧导航栏 -->
        <el-card class="card-nav-left" body-style="padding: 0px" shadow="never">
          <el-menu class="nav-left" :router="true">
            <template>
              <div style="display: flex; align-items: center; justify-content: space-between; margin: 10px;">
                <div style="align-items: center; display: flex;">
                  <i class="icon-write-24px"></i>
                  <h4 style="margin: 5px;">博客随笔</h4>
                </div>
                <el-button icon="el-icon-view" type="text">查看</el-button>
              </div>
            </template>
            <el-submenu :index="category.id + '' " v-for="category in categoryList" :key="category.id">
              <template slot="title">
                <i class="icon-category2-24px" style="margin-right: 5px;"></i>
                <span>{{ category.name }}</span>
              </template>
              <el-menu-item :index=" '/tag/' + tag.id " v-for="tag in category.tags" :key="tag.id">
                <template slot="title">
                  <i class="icon-tag-24px" style="margin-right: 5px;"></i>
                  <span>{{ tag.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card shadow="never">
          <el-tabs v-model="tabsActiveName" stretch>
            <el-tab-pane label="文章列表" name="first">
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
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="5">
        <!-- 右侧工具栏 -->
        <el-card shadow="never" body-style="padding: 0px;">
          <el-menu>
            <template>
              <div style="display: flex; align-items: center; justify-content: space-between; margin: 10px;">
                <div style="align-items: center; display: flex;">
                  <i class="icon-link-24px"></i>
                  <h4 style="margin: 5px;">快速导航</h4>
                </div>
                <el-button type="text">更多 >></el-button>
              </div>
            </template>
            <el-menu-item :index="item.id + ''" v-for="item in fastLinkList" :key="item.id">
              <template slot="title">
                <el-avatar size="small" :src="item.iconUrl" style="background-color: white; margin-right: 5px;"></el-avatar>
                <el-link :underline="false" :href="item.linkUrl">{{ item.name }}</el-link>
              </template>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 路径参数
      params: '',
      tabsActiveName: 'first',
      // 目录表
      categoryList: [],
      // 文章表
      articleList: [],
      // 快速导航列表
      fastLinkList: [
        { id: '1', name: 'Github', linkUrl: 'http://www.github.com', iconUrl: 'https://www.github.com/favicon.ico' },
        { id: '2', name: '码云', linkUrl: 'https://www.gitee.com', iconUrl: 'https://www.gitee.com/favicon.ico' },
        { id: '3', name: '菜鸟教程', linkUrl: 'http://www.runoob.com', iconUrl: 'https://www.runoob.com/favicon.ico' }
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
    // 获取路径中的参数
    async getArticleList () {
      this.params = this.$route.params
      this.articleList = ''
      const { data: result } = await this.$http.post('/article?tid=' + this.params.id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.articleList = result.data
    },
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/category')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.categoryList = result.data
    },
    // 查看文章
    viewArticle (id) {
      this.$router.push('/article/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 80%;
  margin-left: 10%;
}
.ArticleCard {
  margin: 10px;
}
</style>
