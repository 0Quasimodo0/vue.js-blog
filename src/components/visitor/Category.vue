<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="5">
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
            <el-tab-pane label="分类整理" name="first">
              <div class="category" v-for="category in categoryList" :key="category.id">
                <div class="category-header" name="category.id">
                  <div class="category-header-title">
                    <h4><i class="el-icon-s-unfold" style="margin: 10px;"></i>{{ category.name }}</h4>
                  </div>
                </div>
                <div class="category-body">
                  <el-row :gutter="10">
                    <el-col :span="12" v-for="(tag, index) in category.tags" :key="tag.id">
                      <el-card
                      body-style="background-color: #F2F6FC; border-radius: 10px; padding: 10px; margin: 5px;"
                      shadow="hover">
                        <div class="tag" style="display: flex; justify-content:space-between;">
                          <i :class="tagIconClassList[index%5]"></i>
                          <h4>{{ tag.name }}</h4>
                          <el-button type="text" icon="el-icon-view" size="medium" @click="viewArticleListByTag(tag.id)">查看</el-button>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="12">
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="文章列表" name="second"></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="5">
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
      tabsActiveName: 'first',
      // 目录列表
      categoryList: [],
      // 快速导航列表
      fastLinkList: [
        { id: '1', name: 'Github', linkUrl: 'http://www.github.com', iconUrl: 'https://www.github.com/favicon.ico' },
        { id: '2', name: '码云', linkUrl: 'https://www.gitee.com', iconUrl: 'https://www.gitee.com/favicon.ico' },
        { id: '3', name: '菜鸟教程', linkUrl: 'http://www.runoob.com', iconUrl: 'https://www.runoob.com/favicon.ico' }
      ],
      // 自定义图标类名
      tagIconClassList: [
        'icon-tag-success-64px',
        'icon-tag-primary-64px',
        'icon-tag-warning-64px',
        'icon-tag-danger-64px',
        'icon-tag-info-64px'
      ]
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/category')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.categoryList = result.data
    },
    // 根据标签查找文章列表
    viewArticleListByTag (id) {
      this.$router.push('/tag/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 80%;
  height: 500px;
  margin-left: 10%;
}
</style>
