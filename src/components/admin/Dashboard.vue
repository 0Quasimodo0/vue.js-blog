<template>
  <el-container>
    <el-header>
      <div class="logo">
        <a href="http://localhost:8080/#/admin/dashboard"><img src="../../assets/image/MyBlog.png" alt=""/></a>
        <span>MyBlog</span>
      </div>
      <div>
        <el-button type="primary" round size="medium" icon="el-icon-edit" @click="write()">写博客</el-button>
        <el-button type="warning" round size="medium" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container class="container-aside">
      <el-aside class="aside">
        <!-- 侧边栏菜单区域 -->
        <el-menu :router="true">
          <el-menu-item index="/admin/article/list">
            <!-- 二级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本-->
              <span>文章管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/category/list">
            <!-- 二级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本-->
              <span>目录管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/tag/list">
            <!-- 二级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本-->
              <span>标签管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/link">
            <!-- 二级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本-->
              <span>链接管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/classify">
            <!-- 二级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本-->
              <span>分类管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/info">
            <i class="el-icon-user"></i>
            <span slot="title">信息管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">网站设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        id: '',
        username: '',
        email: ''
      }
    }
  },
  methods: {
    write () {
      this.$router.push('/admin/article/write')
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  background-color: #F2F6FC;
}
.logo {
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
    font-weight: bold;
  }
}
</style>
