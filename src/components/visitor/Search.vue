<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="5">
        <el-card class="card-nav-left" body-style="padding: 0px;" shadow="never">
          <div slot="header" body-style="padding: 0px;">
            <span>快速访问</span>
            <el-button style="float: right; padding: 3px 0" type="text">展开</el-button>
          </div>
          <el-menu class="nav-left" :router="true">
            <el-submenu :index="item.id + '' " v-for="item in menuList" :key="item.id">
              <template slot="title">
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="subItem.id + ''" v-for="subItem in item.tags" :key="subItem.id">
                <template>
                  <span>{{ subItem.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card v-for="item in articleList" :key="item.id" shadow="hover" class="ArticleCard">
          <h2>{{ item.title }}</h2>
          <p>简介：</p>
          <p>{{ item.introduction }}</p>
          <el-row>
            <el-col :span="21">
              <el-tag v-for="tagItem in item.tags" :key="tagItem.id" style="margin: 5px;">
                {{ tagItem.name }}
              </el-tag>
            </el-col>
            <el-col :span="3">
              <el-button icon="el-icon-view" type="primary" size="small" style="justify-content: flex-end;" @click="viewArticle(item.id)">查看</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="card-nav-right" shadow="never">
          <h3>模块正在开发中……</h3>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        { id: '1', name: 'Web前端', tags: [{ id: '1-1', name: 'Vue.js' }, { id: '1-2', name: 'React.js' }] },
        { id: '2', name: '服务器', tags: [{ id: '2-1', name: 'Spring Boot' }, { id: '2-2', name: 'Node.js' }] },
        { id: '3', name: '编程语言', tags: [{ id: '3-1', name: 'C++' }, { id: '3-2', name: 'Java' }] },
        { id: '4', name: '算法', tags: [{ id: '4-1', name: 'KMP' }, { id: '4-2', name: 'NP' }] }
      ],
      articleList: [
        { id: '1',
          title: '标题1',
          introduction: '这是关于这篇文章的简介，内容不超过140字。这是关于这篇文章的简介，内容不超过140字。',
          tags: [
            { id: '1-1', name: '标签' },
            { id: '1-2', name: '标签' },
            { id: '1-3', name: '标签' }
          ]
        },
        { id: '2',
          title: '标题2',
          introduction: '这是关于这篇文章的简介，内容不超过140字。这是关于这篇文章的简介，内容不超过140字。',
          tags: [
            { id: '1-1', name: '标签' },
            { id: '1-2', name: '标签' },
            { id: '1-3', name: '标签' }
          ]
        },
        { id: '3',
          title: '标题3',
          introduction: '这是关于这篇文章的简介，内容不超过140字。这是关于这篇文章的简介，内容不超过140字。',
          tags: [
            { id: '1-1', name: '标签' },
            { id: '1-2', name: '标签' },
            { id: '1-3', name: '标签' }
          ]
        }
      ]
    }
  },
  created () {
    this.getNavMenu()
  },
  methods: {
    async getNavMenu () {
      const { data: result } = await this.$http.get('/menu')
      if (result.data !== 200) {
        return this.$message.error(result.message)
      }
      this.menuList = result.data
    },
    async viewArticle (id) {
      this.$router.push('/article/' + id)
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
.ArticleCard {
  margin: 10px;
}
</style>
