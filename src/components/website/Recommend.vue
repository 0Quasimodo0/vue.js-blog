<template>
  <div>
    <h4 style="margin: 0px;"><i class="el-icon-s-opportunity"></i> 推荐</h4>
    <div style="margin-top: 15px;">
      <div v-for="item in recommend.list" :key="item.id">
        <el-link :underline="false" :href=" '/article/' + item.id ">
          <i class="el-icon-star-on"></i>
          <span style="margin: 0px; font-weight: bold; font-size: medium;">{{ item.title }}</span>
        </el-link>
        <p style="font-size: small; color: grey;"><i class="el-icon-time"></i> {{ item.date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  data () {
    return {
      // 推荐
      recommend: {
        // 列表
        list: []
      }
    }
  },
  created () {
    this.getRecommend()
  },
  methods: {
    // 获取推荐列表
    async getRecommend () {
      const { data: result } = await this.$http.get('/recommend/article')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.recommend.list = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
  background: rgba(255, 255, 255, 0.7);
}
.el-link {
  span {
    margin: 0px;
    border-bottom: 2px solid transparent;
  }
}
.el-link :hover {
  i {
    color: #5FB878;
  }
  span {
    color: #5FB878;
    border-bottom: 2px solid #5FB878;
  }
}
</style>
