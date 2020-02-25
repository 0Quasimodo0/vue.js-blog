<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="5">
        <div style="padding: 0px;">
          <el-card shadow="never" body-style="padding: 0px;">
            <div class="nav-title">
              <h4><i class="icon-write-24px"></i>博客随笔</h4>
            </div>
            <el-menu text-color="#303133" active-text-color="#409EFF" :router="true" v-for="category in categoryNavList" :key="category.id">
              <div class="category">
                <div>
                  <i class="el-icon-s-fold"></i>
                  <p>{{ category.name }}</p>
                </div>
                <el-menu-item v-for="(tag, i) in category.tags" :key="tag.id" :index=" '/tag/' + tag.id ">
                  <template slot="title">
                    <i :class="iconClassList.tagList[i%5]"></i>
                    <span style="margin-left: 5px;">{{ tag.name }}</span>
                  </template>
                </el-menu-item>
              </div>
            </el-menu>
          </el-card>
        </div>
      </el-col>
      <el-col :span="14">
        <el-card shadow="never">
          <!-- 文章列表 -->
          <div class="dynamic" v-for="(item, index) in articleList" :key="item.id">
            <div class="dynamic-top">
              <i :class="iconClassList.article[index%5]"></i>
              <div>
                <el-link :underline="false" :href=" '/#/article/' + item.id ">
                  <h3>{{ item.title }}</h3>
                </el-link>
                <p>{{ item.introduction }}</p>
              </div>
            </div>
            <div class="dynamic-bottom">
              <div class="dynamic-bottom-category">
                <p><i class="el-icon-s-fold"></i>{{ item.category.name }}</p>
              </div>
              <div class="dynamic-bottom-tags">
                <el-tag v-for="(tag, i) in item.tags" :key="tag.id" :type="iconClassList.tag[i%5]">{{ tag.name }}</el-tag>
              </div>
            </div>
            <p>发布于 {{ item.date }}</p>
            <el-divider ></el-divider>
          </div>
          <!-- 分页区 -->
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
      </el-col>
      <el-col :span="5">
        <div style="padding: 0px;">
          <el-card shadow="never" style="margin-bottom: 10px;">
            推荐
          </el-card>
          <el-card shadow="never" body-style="padding: 0px;">
            <div class="nav-title">
              <h4><i class="icon-link-24px"></i>快速导航</h4>
            </div>
            <el-menu>
              <el-menu-item :index="item.id + ''" v-for="item in fastLinkNavList" :key="item.id">
                <template slot="title">
                  <el-avatar size="small" :src="item.iconUrl" style="background-color: white; margin-right: 5px;"></el-avatar>
                  <el-link :underline="false" :href="item.linkUrl">{{ item.name }}</el-link>
                </template>
              </el-menu-item>
            </el-menu>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 快速导航列表
      fastLinkNavList: [],
      // 目录列表
      categoryNavList: [],
      // 文章列表
      articleList: [],
      // 获取文章列表的参数对象
      queryInfo: {
        key: '',
        pageNum: 1,
        pageSize: 10,
        reverse: false
      },
      // 文章总数
      total: 0,
      // 图标类名列表
      iconClassList: {
        // 文章
        article: [
          'icon-article-success-64px',
          'icon-article-primary-64px',
          'icon-article-warning-64px',
          'icon-article-danger-64px',
          'icon-article-info-64px'
        ],
        // 标签
        tag: ['success', 'primary', 'warning', 'danger', 'info'],
        // 标签列表
        tagList: [
          'icon-tag2-primary-24px',
          'icon-tag2-success-24px',
          'icon-tag2-warning-24px',
          'icon-tag2-danger-24px',
          'icon-tag2-info-24px'
        ]
      }
    }
  },
  created () {
    this.getArticleList()
    this.getCategoryList()
    this.getFastLinkNav()
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
    // 获取动态列表
    async getFastLinkNav () {
      const { data: result } = await this.$http.get('/menu/link')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.fastLinkNavList = result.data
    },
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/menu/category')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.categoryNavList = result.data
    },
    // 获取文章列表
    async getArticleList () {
      this.queryInfo.key = this.$route.params.key
      const { data: result } = await this.$http.get('/article', { params: this.queryInfo })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.articleList = result.data.list
      this.queryInfo.pageNum = result.data.pageNum
      this.queryInfo.pageSize = result.data.pageSize
      this.total = result.data.total
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 72%;
  margin-left: 14%;
}
.tag {
  display: flex;
  align-items: center;
  background-color: #F2F6FC;
  border-radius: 8px;
  padding: 0px 8px 0px 8px;
}
.nav-title {
  margin-left: 5px;
  h4 {
    align-items: center;
    display: flex;
    margin: 10px;
    i {
      margin-right: 5px;
    }
  }
}
.category {
  div {
    background-color: #E4E7ED;
    align-items: center;
    display: flex;
    p {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: small;
      font-weight: bold;
      color: #515151;
    }
    i {
      margin-left: 8px;
      margin-right: 5px;
    }
  }
}
.dynamic {
  padding: 10px;
  .dynamic-top {
    align-items: center;
    display: flex;
    i {
      margin-right: 10px;
    }
    div {
      .el-link {
        h3{
          margin: 0px;
        }
      }
      p{
        margin: 0px;
        margin-top: 5px;
        color: #909399;
        font-size: small;
      }
    }
  }
  .dynamic-bottom {
    align-items: center;
    display: flex;
    justify-content: space-between;
    .dynamic-bottom-category{
      background-color: #F2F6FC;
      border-radius: 5px;
      margin: 10px;
      margin-left: 0px;
      padding: 8px;
      p{
        margin: 0px;
        font-size: small;
        font-weight: bold;
      }
    }
    .dynamic-bottom-tags{
      .el-tag{
        margin-right: 8px;
      }
    }
  }
  p{
    font-size: small;
    color: #909399;
    margin: 2px;
  }
  .el-divider{
    margin: 5px;
  }
}
</style>
