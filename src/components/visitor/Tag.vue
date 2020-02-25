<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="3">
        <div ref="leftBtnNav" style="margin-top: 200px; padding: 0px;">
          <el-button circle style="margin: 10px;" @click="backTop()">
            <i class="icon-top-primary-32px"></i>
          </el-button>
          <el-button circle style="margin: 10px;">
            <i class="icon-link-primary-32px"></i>
          </el-button>
          <el-button circle style="margin: 10px;">
            <i class="icon-index-primary-32px"></i>
          </el-button>
        </div>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never">
          <!-- 页头 -->
          <div style="margin-bottom: 15px;">
            <el-page-header @back="goBack" content="按标签分类"></el-page-header>
          </div>
          <div class="search-area">
            <el-input placeholder="请输入关键词以搜索文章" clearable v-model="queryInfo.key" @input="search()">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
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
        <div ref="rightNavRef" style="padding: 0px;">
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
  inject: ['reload'],
  data () {
    return {
      // 快速导航列表
      fastLinkNavList: [],
      // 文章列表
      articleList: [],
      // 获取文章列表的参数对象
      queryInfo: {
        key: '',
        pageNum: 1,
        pageSize: 10
      },
      // 文章总数
      total: 0,
      // 图标类名列表
      iconClassList: {
        article: [
          'icon-article-success-64px',
          'icon-article-primary-64px',
          'icon-article-warning-64px',
          'icon-article-danger-64px',
          'icon-article-info-64px'
        ],
        tag: ['success', 'primary', 'warning', 'danger', 'info']
      }
    }
  },
  created () {
    this.getArticleList()
    this.getFastLinkNav()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
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
    // 获取文章列表
    async getArticleList () {
      const { data: result } = await this.$http.post('/article', this.queryInfo, { params: { tid: this.$route.params.id } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.articleList = result.data.list
      this.queryInfo.pageNum = result.data.pageNum
      this.queryInfo.pageSize = result.data.pageSize
      this.total = result.data.total
    },
    // 搜素文章
    search () {
      if (this.queryInfo.key !== '') {
        return this.getArticleList()
      }
      this.reload()
    },
    // 返回到上一页面
    goBack () {
      this.$router.back(-1)
    },
    // 返回顶部
    backTop () {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    },
    // 处理滚动事件
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.$refs.leftBtnNav.style.marginTop = scrollTop + 200 + 'px'
      if (scrollTop <= 80) {
        this.$refs.rightNavRef.style.marginTop = 0 + 'px'
      }
      if (scrollTop > 80) {
        this.$refs.rightNavRef.style.marginTop = scrollTop - 80 + 'px'
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 70%;
  margin-left: 15%;
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
