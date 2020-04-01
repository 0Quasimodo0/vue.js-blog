<template>
  <div class="container">
    <!-- 返回顶部按钮 -->
    <el-backtop :bottom="350" :right="180">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="20">
      <el-col :span="17">
        <el-card shadow="never" v-if="true">
          <!-- 走马灯 -->
          <el-carousel height="220px" arrow="always" :interval="9000">
            <el-carousel-item v-for="item in carousel" :key="item.id">
              <div style="text-align: center; width: inherit; height: inherit;">
                <a :href="item.url">
                  <el-image :src="item.cover" fit="contain"></el-image>
                </a>
              </div>
            </el-carousel-item>
          </el-carousel>
          <!-- 工具栏 -->
          <ToolBar v-if="false"></ToolBar>
        </el-card>
        <h3 style="color: #5FB878;"># 最新发布</h3>
        <Dynamic></Dynamic>
      </el-col>
      <el-col :span="7">
        <!-- 关于 -->
        <el-card shadow="never" body-style="padding: 16px;">
          <UserInfo></UserInfo>
        </el-card>
        <!-- 统计 -->
        <el-card shadow="never" body-style="padding: 16px;" class="nav-right">
          <Count></Count>
        </el-card>
        <!-- 导航 -->
        <el-card shadow="never" body-style="padding: 16px;" class="nav-right">
          <Shortcut></Shortcut>
        </el-card>
        <!-- 推荐 -->
        <el-card shadow="never" body-style="padding: 16px;" class="nav-right">
          <Recommend></Recommend>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 动态组件
import Dynamic from '@/components/website/index/Dynamic.vue'
// 工具栏组件
import ToolBar from '@/components/website/index/ToolBar.vue'
// 快速导航组件
import Shortcut from '@/components/website/Shortcut.vue'
// 统计组件
import Count from '@/components/website/index/Count.vue'
// 关于组件
import UserInfo from '@/components/website/index/UserInfo.vue'
// 推荐组件
import Recommend from '@/components/website/Recommend.vue'

export default {
  name: 'Index',
  components: {
    Shortcut,
    Count,
    UserInfo,
    Recommend,
    Dynamic,
    ToolBar
  },
  data () {
    return {
      carousel: []
    }
  },
  created () {
    this.getCarouselList()
  },
  methods: {
    async getCarouselList () {
      const { data: result } = await this.$http.get('/carousel')
      this.carousel = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 60%;
  margin-left: 20%;
}
.el-card{
  background: rgba(255, 255, 255, 0.85);
}
.nav-right {
  margin-top: 20px;
}
</style>
