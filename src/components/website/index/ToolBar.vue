<template>
  <div class="toolBar" style="margin-top: 15px; display: flex; justify-content: space-between;">
    <div class="toolBar-left">
      <el-tooltip effect="dark" content="首页" placement="top">
        <el-button type="danger" circle icon="el-icon-s-home" @click="gotoModule('/')"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="统计" placement="top">
        <el-button type="primary" circle icon="el-icon-s-data" @click="gotoModule('/about')"></el-button>
      </el-tooltip>
      <el-button round @click="gotoModule('/blog')">
        <h4 style="margin: 0px;"><i class="el-icon-s-fold"></i> 目录</h4>
      </el-button>
      <el-button round @click="gotoModule('/tools/Bvtoav')">
        <h4 style="margin: 0px;"><i class="el-icon-s-tools"></i> 工具</h4>
      </el-button>
    </div>
    <div class="toolBar-right">
      <el-tooltip effect="dark" content="搜索" placement="top">
        <el-button type="success" circle icon="el-icon-search" @click="gotoModule('/search')"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="收藏本站" placement="top">
        <el-button type="warning" circle icon="el-icon-star-on"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="联系站长" placement="top">
        <el-button type="primary" circle icon="el-icon-message" @click="gotoModule('/about')"></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  methods: {
    gotoModule (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style>
</style>
