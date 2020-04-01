<template>
  <div>
    <!-- 文章列表 -->
    <el-card shadow="never" body-style="padding: 5px;" v-for="item in article.list" :key="item.id" style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; padding-right: 8px;">
        <div style="margin-left: 10px; width: 68%; margin-top: 15px; margin-right: 10px;">
          <el-link :underline="false" :href=" '/article/' + item.id ">
            <h3>{{ item.title }}</h3>
          </el-link>
          <p style="font-size: small; color: grey;">{{ item.introduction }}</p>
          <div>
            <el-tag v-for="(tag, i) in item.tags" :key="tag" :type="style.tags[i%5]" style="margin-right: 8px;">{{ tag }}</el-tag>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <p style="font-size: small; color: grey;"><i class="el-icon-time"></i> 发布于 {{ item.date }}</p>
            <div style="display: flex; justify-content: flex-end;">
              <p style="font-size: small; color: grey; margin-right: 5px;"><i class="el-icon-view"></i> {{ item.view }}</p>
              <p style="font-size: small; color: grey;"><i class="el-icon-star-off"></i> {{ item.like }}</p>
            </div>
          </div>
        </div>
        <el-image style="width: 32%; opacity: 0.8;" :src="item.cover" fit="contain"></el-image>
      </div>
    </el-card>
    <div style="text-align: center;">
      <el-button style="background-color: #5FB878; color: #FFF;" round icon="el-icon-caret-bottom" v-show="!isLoadBtnDisabled" @click="loadMoreArticle()">查看更多</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dynamic',
  data () {
    return {
      // 文章信息
      article: {
        // 列表
        list: [],
        // 请求
        query: {
          // 路径参数
          params: {},
          // 分页信息
          pageInfo: {
            // 关键字
            key: '',
            // 当前页面数
            pageNum: 1,
            // 每页的数据量
            pageSize: 10,
            // 排序字段
            orderBy: ['date'],
            // 是否为倒序
            reverse: true
          }
        },
        // 总数
        total: 0
      },
      // 页底按钮状态
      isLoadBtnDisabled: false,
      // 样式信息
      style: {
        // 标签
        tags: ['success', 'primary', 'warning', 'danger', 'info']
      }
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
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
    // 查看更多动态
    loadMoreArticle () {
      this.article.query.pageInfo.pageSize += 10
      this.getArticleList()
      if (this.article.query.pageInfo.pageSize >= this.article.total) {
        this.isLoadBtnDisabled = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
  background: rgba(255, 255, 255, 0.85);
}
.el-link {
  h3 {
    margin: 0px;
    border-bottom: 2px solid transparent;
  }
}
.el-link :hover {
  h3 {
    color: #5FB878;
    border-bottom: 2px solid #5FB878;
  }
}
</style>
