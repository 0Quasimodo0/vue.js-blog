<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
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
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" body-style="padding: 0px;">
          <!-- 博客随笔 -->
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
          <!-- 快速导航 -->
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
      params: '',
      article: '',
      tagTypes: ['success', 'primary', 'warning', 'danger', 'info'],
      // 目录表
      categoryList: [],
      // 快速导航列表
      fastLinkList: [
        { id: '1', name: 'Github', linkUrl: 'http://www.github.com', iconUrl: 'https://www.github.com/favicon.ico' },
        { id: '2', name: '码云', linkUrl: 'https://www.gitee.com', iconUrl: 'https://www.gitee.com/favicon.ico' },
        { id: '3', name: '菜鸟教程', linkUrl: 'http://www.runoob.com', iconUrl: 'https://www.runoob.com/favicon.ico' }
      ]
    }
  },
  created () {
    this.getParams()
    this.getArticle()
    this.getCategoryList()
  },
  methods: {
    // 获取路径中的参数
    getParams () {
      this.params = this.$route.params
    },
    // 获取文章
    async getArticle () {
      const { data: result } = await this.$http.get('/article/' + this.params.id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.article = result.data
    },
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/category')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.categoryList = result.data
    },
    // 返回到上一页面
    goBack () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 70%;
  height: 500px;
  margin-left: 15%;
}
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
