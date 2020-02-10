<template>
  <el-container>
    <el-header>
      <h3 style="margin: 0px; align-items: center; display: flex; font-size:20pt; color: #409EFF;"><i class="icon-logo-128px"></i>MyBlog</h3>
      <el-menu mode="horizontal" class="nav-head" :router="true">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="small" class="nav-head-input" v-model="input" clearable @input="search()"></el-input>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/category" >博客</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <div class="container">
        <el-row :gutter="10">
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
          <el-col :span="14">
            <!-- 路由占位符 -->
            <router-view></router-view>
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
    </el-main>
    <el-footer>
      <div style="width: 70%; margin-left: 15%;">
        <el-row :gutter="20">
          <el-col :span="8">
            <h5>友情链接</h5>
            <el-row v-for="item in footerInfo.friendLinks" :key="item.id">
              <el-link :underline="false" :href="item.linkUrl">{{ item.name }}</el-link>
            </el-row>
          </el-col>
          <el-col :span="8">
            <h5>导航</h5>
            <el-row v-for="item in footerInfo.navLinks" :key="item.id">
              <el-link :underline="false" :href="item.linkUrl">{{ item.name }}</el-link>
            </el-row>
          </el-col>
          <el-col :span="8">
            <h5>关注我</h5>
            <el-row :gutter="10">
              <el-col :span="6" v-for="item in footerInfo.followLinks" :key="item.id">
                <el-link :underline="false" :href="item.linkUrl" :icon="item.iconUrl">{{ item.name }}</el-link>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </el-col>
        </el-row>
        <div style="text-align: center;">
          <p style="color: grey; font-size: small; margin: 20px;">{{ footerInfo.Copyright }}</p>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      // 快速导航链接
      fastLinkList: [],
      input: '',
      footerInfo: {
        friendLinks: [
          { id: '1', name: '博客园', linkUrl: '', iconUrl: '' },
          { id: '2', name: 'CSDN', linkUrl: '', iconUrl: '' },
          { id: '3', name: '简书', linkUrl: '', iconUrl: '' }
        ],
        navLinks: [
          { id: '1', name: '博客', linkUrl: '', iconUrl: '' },
          { id: '2', name: '关于', linkUrl: '', iconUrl: '' }
        ],
        followLinks: [
          { id: '1', name: 'QQ', linkUrl: '', iconUrl: 'icon-QQ-24px' },
          { id: '2', name: '微信', linkUrl: '', iconUrl: 'icon-wechat-24px' },
          { id: '3', name: '微博', linkUrl: '', iconUrl: 'icon-webo-24px' }
        ],
        Copyright: 'Copyright © 2020-2020 www.frankfang.me All Rights Reserved. 备案号：皖ICP备15012807号-1'
      }
    }
  },
  created () {
    this.getCategory()
    this.getLinkList()
  },
  methods: {
    // 获取左侧导航栏
    async getCategory () {
      const { data: result } = await this.$http.get('/category')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.menuList = result.data
    },
    // 获取右侧导航栏
    async getLinkList () {
      const { data: result } = await this.$http.post('/link', null, { params: { visible: true } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.fastLinkList = result.data
    },
    search () {
      if (this.input !== '') {
        return this.$router.push('/search/' + this.input)
      }
      this.$router.push('/category')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-head-logo {
  position: absolute;
  left: 0px;
  top: 5px;
}
.nav-head-input {
  width: 200px;
  height: 15px;
  margin: 15px;
}
.nav-head {
  display: flex;
  justify-content: flex-end;
}
.el-main {
  background-color: #F2F6FC;
}
.container {
  width: 80%;
  height: 500px;
  margin-left: 10%;
}
</style>
