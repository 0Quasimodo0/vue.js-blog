<template>
  <el-container>
    <el-header>
      <h3 style="margin: 0px; align-items: center; display: flex; font-size:20pt; color: #409EFF;"><i class="icon-logo-128px"></i>MyBlog</h3>
      <el-menu mode="horizontal" class="nav-head" :router="true">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="small" class="nav-head-input" v-model="input" clearable></el-input>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/category" >博客</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <!-- 路由占位符 -->
      <router-view></router-view>
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
</style>
