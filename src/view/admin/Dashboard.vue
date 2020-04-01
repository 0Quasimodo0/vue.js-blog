<template>
  <div class="container">
    <div class="outline">
      <h3># 概要</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 用户 -->
          <el-card>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h4 style="margin: 0px;"><i class="el-icon-s-custom"></i> 用户</h4>
              <el-button type="text" round size="medium" icon="el-icon-edit-outline" @click="gotoModule('/admin/info')">编辑</el-button>
            </div>
            <div class="user">
              <div class="user-header">
                <el-avatar :size="50" :src="outline.user.avatar"></el-avatar>
                <div class="user-header-right">
                  <h4>{{ outline.user.nickname }}</h4>
                  <p>{{ outline.user.motto }}</p>
                </div>
              </div>
              <div class="user-body">
                <h5>简介</h5>
                <p>{{ outline.user.introduction }}</p>
              </div>
            </div>
          </el-card>
          <!-- 统计 -->
          <el-card style="margin-top: 20px;">
            <h4 style="margin-top: 0px;"><i class="el-icon-s-data"></i> 统计</h4>
            <el-row :gutter="20">
              <el-col :span="12">
                <div style="text-align: center; color: #409EFF;">
                  <h4>访问量</h4>
                  <h4>{{ outline.count.hits }}</h4>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="text-align: center; color: #409EFF;">
                  <h4>文章数</h4>
                  <h4>{{ outline.count.articleNumber }}</h4>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="11">
          <!-- 动态 -->
          <el-card>
            <h4 style="margin-top: 0px;"><i class="el-icon-s-data"></i> 动态</h4>
            <div style="display: flex; justify-content: space-between;">
              <h3># 最新发布</h3>
              <el-button type="text" @click="gotoModule('/admin/article')">文章列表</el-button>
            </div>
            <!-- 动态列表 -->
            <div class="dynamic" v-for="(item, index) in outline.dynamic.list" :key="item.id">
              <div class="dynamic-top">
                <i :class="style.article[index%5]"></i>
                <div>
                  <el-link :underline="false" :href=" '/#/admin/article/' + item.id ">
                    <h3>{{ item.title }}</h3>
                  </el-link>
                  <p>{{ item.introduction }}</p>
                </div>
              </div>
              <div class="dynamic-bottom">
                <div class="dynamic-bottom-category">
                  <p><i class="el-icon-s-fold"></i> {{ item.category_name }}</p>
                </div>
                <div class="dynamic-bottom-tags">
                  <el-tag v-for="(tag, i) in item.tags" :key="tag" :type="style.tags[i%5]">{{ tag }}</el-tag>
                </div>
              </div>
              <p>发布于 {{ item.date }}</p>
              <el-divider ></el-divider>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <!-- 消息模块 -->
          <el-card body-style="padding: 0px;">
            <el-container>
              <el-header style="background-color: #F2F6FC;">
                <div style="text-align: center; padding: 15px;">
                  <el-badge :value="200" :max="99" class="item">
                    <h4 style="margin: 5px;"><i class="el-icon-message-solid"></i> 消息</h4>
                  </el-badge>
                </div>
              </el-header>
              <el-main style="height: 400px;">
                <div v-for="item in 50" :key="item" style="display: flex; justify-content: flex-start; margin-bottom: 8px;">
                  <el-avatar></el-avatar>
                  <div style="margin-left: 5px;">
                    <h5 style="margin: 0px;">123**89@gmail.com</h5>
                    <p style="margin: 0px; font-size: small; color: grey;">message</p>
                  </div>
                </div>
              </el-main>
            </el-container>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="module">
      <h3># 模块</h3>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in modules" :key="item.id">
          <el-card>
            <!-- 模块信息 -->
            <div class="module-item">
              <h3><i :class="item.icon_title"></i> {{ item.name }}</h3>
              <div class="module-item-bottom">
                <i :class="item.icon"></i>
                <div>
                  <p>{{ item.introduction }}</p>
                  <el-button :type="item.style" round icon="el-icon-position" size="mini" @click="gotoModule(item.link)">点击进入</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 概要
      outline: {
        user: {},
        count: {
          hits: '',
          articleNumber: ''
        },
        dynamic: {
          // 列表
          list: [],
          // 总数
          total: 0,
          // 请求参数
          query: {
            // 路径参数
            params: '',
            // 分页信息
            pageInfo: {
              key: '',
              pageNum: 1,
              pageSize: 2,
              orderBy: ['date'],
              reverse: true
            }
          }
        }
      },
      // 模块
      modules: [
        { id: 1, name: '文章管理', icon_title: 'el-icon-edit', icon: 'icon-article2-primary-80px', introduction: '在该模块中可对文章进行统一管理。', style: 'primary', link: '/admin/article' },
        { id: 2, name: '目录管理', icon_title: 'el-icon-s-fold', icon: 'icon-category3-success-64px', introduction: '在该模块中可对文章进行统一管理。', style: 'success', link: '/admin/category' },
        { id: 3, name: '链接管理', icon_title: 'el-icon-link', icon: 'icon-link-warning-64px', introduction: '在该模块中可对文章进行统一管理。', style: 'warning', link: '/admin/link' },
        { id: 4, name: '个人中心', icon_title: 'el-icon-user', icon: 'icon-user2-danger-64px', introduction: '在该模块中可对文章进行统一管理。', style: 'danger', link: '/admin/info' },
        { id: 5, name: '统计数据', icon_title: 'el-icon-s-data', icon: 'icon-count-primary-64px', introduction: '在该模块中可对文章进行统一管理。', style: 'primary', link: '/admin/count' },
        { id: 6, name: '网站设置', icon_title: 'el-icon-setting', icon: 'icon-setting-info-64px', introduction: '在该模块中可对文章进行统一管理。', style: 'info', link: '/admin/setting' }
      ],
      // 样式
      style: {
        article: [
          'icon-article-success-64px',
          'icon-article-primary-64px',
          'icon-article-warning-64px',
          'icon-article-danger-64px',
          'icon-article-info-64px'
        ],
        tags: ['success', 'primary', 'warning', 'danger', 'info']
      }
    }
  },
  created () {
    this.getUserInfo()
    this.getDynamicList()
    this.getCountInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const { data: result } = await this.$http.get('/user/' + window.sessionStorage.getItem('uid'))
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.outline.user = result.data
    },
    // 获取动态列表
    async getDynamicList () {
      const { data: result } = await this.$http.post('/article', this.outline.dynamic.query.pageInfo, { params: this.outline.dynamic.query.params })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.outline.dynamic.list = result.data.records
      this.outline.dynamic.query.pageInfo.pageNum = result.data.current
      this.outline.dynamic.query.pageInfo.pageSize = result.data.size
      this.outline.dynamic.total = result.data.total
    },
    // 获取统计信息
    getCountInfo () {
      this.$http.get('/count/website').then(response => {
        this.outline.count.hits = response.data.data.hits
      })
      this.$http.get('/count/article').then(response => {
        this.outline.count.articleNumber = response.data.data.total
      })
    },
    // 跳转到指定模块
    gotoModule (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style lang="less" scoped>
.outline {
  .user {
    margin-top: 10px;
    .user-header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .user-header-right {
        margin-left: 10px;
        h4 {
          margin-top: 5px;
          margin-bottom: 5px;
        }
        p {
          font-size: small;
          color: grey;
          margin-top: 2px;
        }
      }
    }
    .user-body {
      h5 {
        margin-top: 5px;
        margin-bottom: 5px;
      }
      p {
        margin-top: 0px;
        font-size: small;
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
}
.module {
  .el-card {
    margin-bottom: 20px;
  }
  .module-item {
    h3 {
      margin-top: 0px;
    }
    .module-item-bottom {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      div {
        margin-left: 15px;
        p {
          font-size: small;
        }
      }
    }
  }
}
</style>
