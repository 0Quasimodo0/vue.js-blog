<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="3" style="padding-right: 20px;">
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
          <el-page-header @back="goBack" :content="article.title">
          </el-page-header>
          <h1 class="info-title">{{ article.title }}</h1>
          <!-- 基本信息 -->
          <div class="info-header">
            <i class="icon-author-48px"></i>
            <div class="info-header-author">
              <h3 class="info-header-author-name">Frank Fang</h3>
              <p class="info-header-author-date">发布时间：{{ article.date }}</p>
            </div>
          </div>
          <div class="info-tags">
            <div style="align-items: center; display: flex;">
              <i class="icon-category2-24px"></i>
              <h5 style="margin-left: 5px; margin-right: 5px;">{{ article.category.name }}</h5>
            </div>
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
      <el-col :span="5">
        <div ref="rightNav" style="padding: 0px;">
          <el-card shadow="never" style="margin-bottom: 10px;">推荐</el-card>
          <el-card shadow="never" body-style="padding: 0px;">
            <div class="nav-title">
              <h4><i class="icon-link-24px"></i>快速导航</h4>
            </div>
            <el-menu>
              <el-menu-item :index="item.id + ''" v-for="item in fastLinkList" :key="item.id">
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
      // 文章
      article: {
        id: '',
        title: '',
        date: '',
        category: {
          id: '',
          name: '',
          tags: []
        }
      },
      fastLinkList: [],
      srollStyle: {
        leftNavTop: 0
      },
      tagTypes: ['success', 'primary', 'warning', 'danger', 'info']
    }
  },
  created () {
    this.getArticle()
    this.getFastLinkNav()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 获取文章
    async getFastLinkNav () {
      const { data: result } = await this.$http.get('/menu/link')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.fastLinkList = result.data
    },
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
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      this.$refs.leftBtnNav.style.marginTop = scrollTop + 200 + 'px'
      if (scrollTop <= 80) {
        this.$refs.rightNav.style.marginTop = 0 + 'px'
      }
      if (scrollTop > 80) {
        this.$refs.rightNav.style.marginTop = scrollTop - 80 + 'px'
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
