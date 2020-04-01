<template>
  <!-- 导航 -->
  <div>
    <h4 style="margin: 0px;"><i class="el-icon-s-promotion"></i> 导航</h4>
    <div>
      <div v-for="item in link.list" :key="item.id" style="display: flex; align-items: center; margin-top: 15px;">
        <el-avatar :size="30" :src="item.iconUrl" style="background-color: #FFFFFF; margin-right: 8px;"></el-avatar>
        <el-link :underline="false" :href="item.linkUrl">
          <span style="font-weight: bold;">{{ item.name }}</span>
        </el-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shortcut',
  data () {
    return {
      // 导航
      link: {
        // 列表
        list: [],
        query: {
          // 路径参数
          params: { shortcut: true }
        }
      }
    }
  },
  created () {
    this.getShortcutList()
  },
  methods: {
    // 获取快速导航列表
    async getShortcutList () {
      const { data: result } = await this.$http.get('/link', { params: this.link.query.params })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.link.list = result.data
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
  span {
    color: #5FB878;
    border-bottom: 2px solid #5FB878;
  }
}
</style>
