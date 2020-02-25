<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="5">
        <div ref="categoryNavRef" style="padding: 0px;">
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
          <!-- 走马灯 -->
          <el-carousel :interval="9000" height="200px" arrow="always">
            <el-carousel-item  style="text-align: center;">
              <img src="../../assets/image/carousel/carousel-1.jpg" />
            </el-carousel-item>
            <el-carousel-item  style="text-align: center;">
              <img src="../../assets/image/carousel/carousel-2.jpg" />
            </el-carousel-item>
            <el-carousel-item  style="text-align: center;">
              <img src="../../assets/image/carousel/carousel-3.jpg" />
            </el-carousel-item>
          </el-carousel>
          <el-tabs v-model="tabsActiveName" stretch>
            <el-tab-pane label="最新动态" name="first">
              <!-- 文章列表 -->
              <div class="dynamic" v-for="(item, index) in dynamicList" :key="item.id">
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
              <div style="text-align: center;">
                <el-button icon="el-icon-caret-bottom" :disabled="isLoadBtnDisabled" round @click="load()">查看更多</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="导航链接" name="third">
              <div class="link" v-for="classify in linkList" :key="classify.id">
                <div class="link-classify">
                  <h4><i class="el-icon-s-unfold"></i>{{ classify.name }}</h4>
                </div>
                <el-row :gutter="10">
                  <el-col :span="12" v-for="item in classify.links" :key="item.id" style="margin-bottom: 10px;">
                    <div class="link-body">
                      <el-avatar :src="item.iconUrl"></el-avatar>
                      <div>
                        <h5>{{ item.name }}</h5>
                        <el-link :href="item.linkUrl" :underline="false">{{ item.linkUrl }}</el-link>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12" style="margin-bottom: 10px;"></el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="实用工具" name="second">
              <h3>模块正在开发中...</h3>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="never" style="margin-bottom: 10px;" body-style="padding: 10px;">
          <div class="info">
            <div class="info-header">
              <i class="icon-user-primary-36px"></i>
              <h4 style="margin-left: 10px;">{{ userInfo.name }}</h4>
            </div>
            <h5><i class="el-icon-date"></i> 日历</h5>
            <div class="info-calendar">
              <i class="icon-calendar-primary-128px"></i>
              <div>
                <h3 style="color: #409EFF;">{{ date.mm }} / {{ date.dd }} / {{ date.yy }}</h3>
              </div>
            </div>
            <h5><i class="el-icon-s-order"></i> 留言</h5>
            <p style="font-size: small; color: grey;">{{ userInfo.notice }}</p>
            <h5><i class="el-icon-share"></i> 关注</h5>
            <div class="info-follow">
              <el-link v-for="item in userInfo.follow" :key="item.id" :underline="false" :href="item.linkUrl">
                <el-avatar size="small" :src="item.iconUrl" style="background-color: white;"></el-avatar>
              </el-link>
            </div>
          </div>
        </el-card>
        <div ref="fastLinkNavRef" style="padding: 0px;">
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
        <div ref="rightBtnNav" style="margin-top: 200px; text-align: center;">
          <el-button circle style="margin: 10px;" @click="backTop()">
            <i class="icon-top-primary-32px"></i>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoryNavList: [],
      fastLinkNavList: [],
      // 页底按钮状态
      isLoadBtnDisabled: false,
      // 默认激活的tab名
      tabsActiveName: 'first',
      // 链接列表
      linkList: [],
      // 用户信息
      userInfo: {
        name: 'Frank Fang',
        notice: '欢迎来到www.frankfang.cn ! 您可通过以下平台与我进行技术交流',
        follow: [
          { id: 1, linkUrl: 'https://github.com/0Quasimodo0', iconUrl: 'https://github.com/favicon.ico' },
          { id: 2, linkUrl: 'https://gitee.com/frankfang-space', iconUrl: 'https://gitee.com/favicon.ico' },
          { id: 3, linkUrl: 'https://me.csdn.net/weixin_45444394', iconUrl: 'http://csdn.net/favicon.ico' },
          { id: 4, linkUrl: 'https://www.cnblogs.com', iconUrl: 'https://www.cnblogs.com/favicon.ico' }
        ]
      },
      // 页面信息
      pageInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      // 动态列表
      dynamicList: [],
      carouselUrl: [
        '../../assets/carousel/carousel-01.jpg'
      ],
      date: {
        yy: '',
        mm: '',
        dd: ''
      },
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
        ],
        // 走马灯
        carousel: [
          'carousel-img-01',
          'carousel-img-02',
          'carousel-img-03'
        ]
      }
    }
  },
  created () {
    this.getCategoryNav()
    this.getFastLinkNav()
    this.getDynamicList()
    this.getLinkList()
    this.currentTime()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 获取动态列表
    async getFastLinkNav () {
      const { data: result } = await this.$http.get('/menu/link')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.fastLinkNavList = result.data
    },
    // 获取动态列表
    async getCategoryNav () {
      const { data: result } = await this.$http.get('/menu/category')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.categoryNavList = result.data
    },
    // 获取动态列表
    async getDynamicList () {
      const { data: result } = await this.$http.get('/index/dynamic', { params: this.pageInfo })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.dynamicList = result.data.list
      this.pageInfo.pageNum = result.data.pageNum
      this.pageInfo.pageSize = result.data.pageSize
      this.total = result.data.total
    },
    // 获取导航链接
    async getLinkList () {
      const {
        data: result
      } = await this.$http.get('/classify', {
        params: {
          links: true
        }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.linkList = result.data
    },
    // 查看更多动态
    load () {
      this.pageInfo.pageSize += 10
      this.getDynamicList()
      if (this.pageInfo.pageSize >= this.total) {
        this.isLoadBtnDisabled = true
        this.loadBtnContent = '已经到底了'
      }
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
      // console.log(scrollTop)
      // this.$refs.categoryNavRef.style.marginTop = scrollTop + 200 + 'px'
      if (scrollTop <= 80) {
        this.$refs.categoryNavRef.style.marginTop = 0 + 'px'
      } else {
        this.$refs.categoryNavRef.style.marginTop = scrollTop - 80 + 'px'
      }
      if (scrollTop <= 390) {
        this.$refs.fastLinkNavRef.style.marginTop = 0 + 'px'
        this.$refs.rightBtnNav.style.display = 'none'
      } else {
        this.$refs.fastLinkNavRef.style.marginTop = scrollTop - 390 + 'px'
        this.$refs.rightBtnNav.style.display = 'block'
      }
    },
    currentTime () {
      setInterval(this.getTime, 500)
    },
    getTime () {
      var date = new Date()
      this.date.yy = date.getFullYear()
      this.date.mm = date.getMonth() + 1
      this.date.dd = date.getDate()
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 72%;
  height: 500px;
  margin-left: 14%;
}
.nav-left {
  margin: 0;
}
.articleLink {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #F2F6FC;
  border-radius: 10px;
  padding: 20px;
}
.link{
  .link-classify{
    margin: 5px;
    h4{
      margin: 0px;
      i{
        margin: 10px;
      }
    }
  }
  .link-body {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #F2F6FC;
    border-radius: 8px;
    padding: 10px;
    .el-avatar{
      background-color: white;
    }
    div{
      margin-left: 8px;
      h5{
        margin: 0px;
      }
      .el-link{
        margin: 0px;
      }
    }
  }
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
.info{
  .info-header{
    display: flex;
    align-items: center;
    .el-avatar{
      margin-right: 5px;
    }
  }
  .info-calendar{
    display: flex;
    align-items: center;
    margin: 10px;
    i{
      margin-right: 0px;
    }
    div{
      h3{
        margin: 5px;
      }
    }
  }
  h5{
    margin: 0px;
  }
  p{
    margin: 10px;
  }
  .info-follow{
    .el-link{
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}
</style>
