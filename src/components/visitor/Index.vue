<template>
  <div class="container">
    <el-row :gutter="10">
      <!-- 左侧导航栏 -->
      <el-col :span="5">
        <el-card shadow="never" body-style="padding: 0px">
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
            <el-submenu :index="category.id + '' " v-for="category in menuList" :key="category.id">
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
      <!-- 中部容器 -->
      <el-col :span="14">
        <el-card shadow="never">
          <el-tabs v-model="tabsActiveName" stretch>
            <el-tab-pane label="最新动态" name="first">
              <el-card shadow="hover" style="margin-bottom: 5px;" v-for="(item, index) in dynamicList" :key="item.id">
                <h4># {{ userInfo.name }}在【{{ item.category.name }}】目录中发布了一篇新文章</h4>
                <div class="articleLink">
                  <div style="display: flex; align-items: center; justify-content: flex-start;">
                    <i :class="iconClassList.article[index%5]"></i>
                    <div style="margin-left: 8px;">
                      <h4 style="margin-top: 2px; margin-bottom: 8px;">{{ item.title }}</h4>
                      <el-tag v-for="(tag, i) in item.tags" :key="tag.id" :type="colorList[i%5]" style="margin-right: 5px;" effect="light">
                        {{ tag.name }}
                      </el-tag>
                    </div>
                  </div>
                  <el-button type="primary" round icon="el-icon-view" size="small" @click="viewArticle(item.id)">查看</el-button>
                </div>
              </el-card>
              <el-divider content-position="center"><p style="color: grey;">最多只显示10条内容</p></el-divider>
            </el-tab-pane>
            <el-tab-pane label="实用工具" name="second">
              <h3>模块正在开发中...</h3>
            </el-tab-pane>
            <el-tab-pane label="导航链接" name="third">
              <el-row :gutter="10">
                <el-col :span="12" v-for="item in linkList" :key="item.id" style="margin-bottom: 10px;">
                  <div class="link-card">
                    <el-avatar :src="item.iconUrl" style="background-color: white;"></el-avatar>
                    <div style="margin-left: 8px;">
                      <h5 style="margin: 0px;">{{ item.name }}</h5>
                      <el-link :href="item.linkUrl" :underline="false" style="margin: 0px;">{{ item.linkUrl }}</el-link>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" style="margin-bottom: 10px;"></el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <!-- 右侧导航栏 -->
      <el-col :span="5">
        <el-card shadow="never" body-style="padding: 0px;">
          <!-- 个人信息 -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin: 10px;">
              <div style="align-items: center; display: flex;">
                <i class="icon-info-24px"></i>
                <h4 style="margin: 5px;">个人信息</h4>
              </div>
              <el-button type="text">更多 >></el-button>
            </div>
            <div style="text-align: center;">
              <i class="icon-author-primary-64px" style="margin: 0 auto;"></i>
              <div style="margin: 0 auto;">
                <h3 style="margin: 0px;">{{ userInfo.name }}</h3>
                <p style="color: grey; font-size: small; margin: 0px;">{{ userInfo.intro }}</p>
              </div>
              <el-row :gutter="10" style="margin-top: 0px; margin-bottom: 0px;">
                <el-col :span="8">
                  <h5>文章</h5>
                  <p>99</p>
                </el-col>
                <el-col :span="8">
                  <h5>收藏</h5>
                  <p>99</p>
                </el-col>
                <el-col :span="8">
                  <h5>访问</h5>
                  <p>99</p>
                </el-col>
              </el-row>
            </div>
          </div>
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
      // 默认激活的tab名
      tabsActiveName: 'first',
      // 菜单列表
      menuList: [],
      // 链接列表
      linkList: [],
      // 用户信息
      userInfo: {
        name: 'Frank Fang',
        intro: '个性签名'
      },
      // 快速导航列表
      fastLinkList: [],
      // 动态列表
      dynamicList: [],
      // 图标类名列表
      iconClassList: {
        article: ['icon-article-success-64px', 'icon-article-primary-64px', 'icon-article-warning-64px', 'icon-article-danger-64px', 'icon-article-info-64px']
      },
      // 颜色列表
      colorList: ['success', 'primary', 'warning', 'danger', 'info']
    }
  },
  created () {
    this.getMenuList()
    this.getDynamicList()
    this.getLinkList()
    this.getQuickLinkList()
  },
  methods: {
    // 获取左侧菜单栏
    async getMenuList () {
      const { data: result } = await this.$http.get('/category')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.menuList = result.data
    },
    // 获取动态列表
    async getDynamicList () {
      const { data: result } = await this.$http.get('/article/dynamic', { params: { size: 10 } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.dynamicList = result.data
    },
    // 获取导航链接
    async getLinkList () {
      const { data: result } = await this.$http.get('/link')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.linkList = result.data
    },
    // 获取右侧快速导航
    async getQuickLinkList () {
      const { data: result } = await this.$http.post('/link', null, { params: { visible: true } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.fastLinkList = result.data
    },
    // 查看文章
    viewArticle (id) {
      this.$router.push('/article/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.nav-left{
  margin: 0;
}
.container {
  width: 80%;
  height: 500px;
  margin-left: 10%;
}
.articleLink {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #F2F6FC;
  border-radius: 10px;
  padding: 20px;
}
.link-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #F2F6FC;
  border-radius: 8px;
  padding: 10px;
}
</style>
