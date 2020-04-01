<template>
  <div class="container" ref="containerRef">
    <el-row :gutter="10">
      <el-col :span="3" style="padding-right: 20px;">
        <!-- ToolBar -->
        <div ref="leftBtnNav" style="margin-top: 200px; padding: 0px; text-align: center;">
          <ToolBar :like="count.like"></ToolBar>
        </div>
      </el-col>
      <el-col :span="16">
        <el-card shadow="always">
          <!-- 页头 -->
          <el-page-header @back="goBack" :content="article.title" />
          <Article :article="article" :author="user" :view="count.view"></Article>
        </el-card>
      </el-col>
      <el-col :span="5">
        <div ref="rightNav" style="padding: 0px;">
          <!-- 导航 -->
          <el-card shadow="always" body-style="padding: 15px;">
            <Shortcut></Shortcut>
          </el-card>
          <!-- 推荐 -->
          <el-card shadow="always" body-style="padding: 15px;" style="margin-top: 10px;">
            <Recommend></Recommend>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 快速导航组件
import Article from '@/components/website/post/Article.vue'
// 工具栏组件
import ToolBar from '@/components/website/post/ToolBar.vue'
// 快速导航组件
import Shortcut from '@/components/website/Shortcut.vue'
// 推荐组件
import Recommend from '@/components/website/Recommend.vue'
export default {
  name: 'Post',
  components: {
    Article,
    ToolBar,
    Shortcut,
    Recommend
  },
  data () {
    return {
      // 文章信息
      article: {},
      // 用户信息
      user: {},
      // 统计信息
      count: {
        view: 0,
        like: 0
      }
    }
  },
  created () {
    this.getArticle()
    this.hasNewReader()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 获取文章信息
    async getArticle () {
      const { data: result } = await this.$http.get('/article/' + this.$route.params.id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.article = result.data
      this.getUserInfo(this.article.author_id)
      this.getCountInfo(this.article.id)
    },
    // 获取用户信息
    async getUserInfo (id) {
      const { data: result } = await this.$http.get('/user/' + id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.user = result.data
    },
    // 获取统计信息
    getCountInfo (articleId) {
      this.$http.get('/count/article', { params: { details: 'view', article_id: articleId } }).then(response => {
        this.count.view = response.data.data + 1
      })
      this.$http.get('/count/like', { params: { object_name: 'article', object_id: articleId } }).then(response => {
        this.count.like = response.data.data.total
      })
    },
    // 统计阅读量
    hasNewReader () {
      return this.$http.post('/count/article', null, { params: { id: this.$route.params.id } })
    },
    // 返回到上一页面
    goBack () {
      this.$router.back(-1)
    },
    // 监听滚动事件
    handleScroll () {
      // 滚动条高度
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 容器高度
      let maxHeight = this.$refs.containerRef.offsetHeight
      if (scrollTop <= 60) {
        this.$refs.leftBtnNav.style.marginTop = scrollTop + 200 + 'px'
        // this.$refs.rightNav.style.marginTop = 0 + 'px'
      } else if (scrollTop <= maxHeight - 400) {
        this.$refs.leftBtnNav.style.marginTop = scrollTop + 200 + 'px'
        // this.$refs.rightNav.style.marginTop = scrollTop - 60 + 'px'
      } else {
        // this.$refs.rightNav.style.marginTop = maxHeight - 400 - 60 + 'px'
      }
    }
  },
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 可以访问组件实例 `this`
  beforeRouteUpdate (to, from, next) {
    this.getArticle()
    next()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 66%;
  margin-left: 17%;
}
.el-card{
  background: rgba(255, 255, 255, 0.7);
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
</style>
