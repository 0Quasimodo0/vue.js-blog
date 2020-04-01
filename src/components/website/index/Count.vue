<template>
  <div>
    <h4 style="margin: 0px;"><i class="el-icon-s-data"></i> 统计</h4>
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div style="text-align: center; color: #909399;">
            <h4>访问量</h4>
            <h4>{{ count.hits }}</h4>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="text-align: center; color: #909399;">
            <h4>文章数</h4>
            <h4>{{ count.article }}</h4>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Count',
  data () {
    return {
      // 统计信息
      count: {
        // 网站访问量
        hits: '',
        // 文章总数
        article: ''
      }
    }
  },
  created () {
    this.getCountInfo()
  },
  methods: {
    // 获取统计信息
    getCountInfo () {
      this.$http.get('/count/website').then(response => {
        this.count.hits = response.data.data.hits + 1
      })
      this.$http.get('/count/article').then(response => {
        this.count.article = response.data.data.total
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
