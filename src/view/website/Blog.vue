<template>
  <div class="container">
    <!-- 返回顶部按钮 -->
    <el-backtop :bottom="350" :right="180">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="10">
      <el-col :span="5">
        <!-- 目录导航 -->
        <div ref="categoryNavRef" style="padding: 0px;">
          <el-card shadow="always" body-style="padding: 0px;">
            <CategoryNav></CategoryNav>
          </el-card>
        </div>
      </el-col>
      <el-col :span="14">
        <el-card shadow="always">
          <!-- 搜素区 -->
          <div class="search-area" style="display: flex; justify-content: flex-start;">
            <el-input placeholder="请输入关键词以搜索文章" clearable v-model="article.query.pageInfo.key" @input="search()">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button type="success" round icon="el-icon-s-unfold" style="margin-left: 15PX;" @click="refresh()">全部</el-button>
          </div>
          <!-- 文章列表 -->
          <ArticleList :list="article.list"></ArticleList>
          <!-- 分页区 -->
          <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="article.query.pageInfo.pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="article.query.pageInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="article.total"
                background>
              </el-pagination>
        </el-card>
      </el-col>
      <el-col :span="5">
        <div ref="rightNavRef" style="padding: 0px;">
          <el-card shadow="always" body-style="padding: 15px;">
            <Shortcut></Shortcut>
          </el-card>
          <el-card shadow="always" body-style="padding: 15px;" style="margin-top: 10px;">
            <Recommend></Recommend>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 目录导航
import CategoryNav from '@/components/website/blog/CategoryNav.vue'
// 文章列表
import ArticleList from '@/components/website/blog/ArticleList.vue'
// 快速导航组件
import Shortcut from '@/components/website/Shortcut.vue'
// 推荐组件
import Recommend from '@/components/website/Recommend.vue'
export default {
  name: 'Blog',
  components: {
    CategoryNav,
    Shortcut,
    Recommend,
    ArticleList
  },
  inject: ['reload'],
  data () {
    return {
      // 文章信息
      article: {
        // 列表
        list: [],
        // 总数
        total: 0,
        // 请求参数
        query: {
          // 路径参数
          params: { category_id: this.$route.query.categoryId },
          // 分页信息
          pageInfo: {
            key: '',
            pageNum: 1,
            pageSize: 10,
            orderBy: ['date'],
            reverse: false
          }
        }
      }
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.article.query.pageInfo.pageSize = newSize
      this.getArticleList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.article.query.pageInfo.pageNum = newPage
      this.getArticleList()
    },
    // 获取文章列表
    async getArticleList () {
      const { data: result } = await this.$http.post('/article', this.article.query.pageInfo, { params: this.article.query.params })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.article.list = result.data.records
      this.article.query.pageInfo.pageNum = result.data.current
      this.article.query.pageInfo.pageSize = result.data.size
      this.article.total = result.data.total
    },
    search () {
      if (this.article.query.pageInfo.key !== '') {
        return this.getArticleList()
      }
      this.reload()
    },
    refresh () {
      this.$router.push('/blog')
      this.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 70%;
  margin-left: 15%;
}
.el-card{
  background: rgba(255, 255, 255, 0.7);
}
.el-pagination {
  margin-top: 15px;
}
</style>
