<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card shadow="never" style="height: 700px;">
          <h3># 搜索关键字：{{ this.$route.query.key }}</h3>
          <h3>o(*^＠^*)o 搜索功能暂未开放...</h3>
          <img src="../../assets/image/404.png" style=" height: 256px;" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <Shortcut></Shortcut>
        </el-card>
        <el-card shadow="never" style="margin-top: 20px;">
          <Recommend></Recommend>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 推荐组件
import Recommend from '@/components/website/Recommend.vue'
// 快速导航组件
import Shortcut from '@/components/website/Shortcut.vue'
export default {
  name: 'Search',
  components: {
    Recommend,
    Shortcut
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.container{
  width: 66%;
  margin-left: 17%;
}
.el-card{
  background: rgba(255, 255, 255, 0.7);
}
</style>
