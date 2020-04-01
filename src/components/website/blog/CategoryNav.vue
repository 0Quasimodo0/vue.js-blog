<template>
  <div>
    <div class="nav-title">
      <h4><i class="icon-write-24px"></i>博客随笔</h4>
    </div>
    <el-menu v-for="category in category.list" :key="category.id" @select="handleSelectMenu">
      <div class="category">
        <div>
          <i class="el-icon-s-fold"></i>
          <p>{{ category.name }}</p>
        </div>
        <el-menu-item v-for="(tag, i) in category.children" :key="tag.id" :index="tag.id + '' ">
          <template slot="title">
            <i :class="style.tags[i%5]"></i>
            <span style="margin-left: 5px;">{{ tag.name }}</span>
          </template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'CategoryNav',
  inject: ['reload'],
  data () {
    return {
      // 目录
      category: {
        list: []
      },
      // 样式
      style: {
        tags: [
          'icon-tag2-primary-24px',
          'icon-tag2-success-24px',
          'icon-tag2-warning-24px',
          'icon-tag2-danger-24px',
          'icon-tag2-info-24px'
        ]
      }
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/category/menu', { params: { type: '文章' } })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.category.list = result.data
    },
    // 根据标签查找文章列表
    handleSelectMenu (index, indexPath) {
      this.$router.push({ path: '/blog', query: { categoryId: index } })
      this.reload()
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
