<template>
  <div>
    <h1 class="info-title">{{ article.title }}</h1>
    <!-- 基本信息 -->
    <div>
      <div class="info-header">
        <el-avatar :size="50" :src="author.avatar"></el-avatar>
        <div class="info-header-author">
          <h3 class="info-header-author-name">{{ author.nickname }}</h3>
          <p class="info-header-author-date">{{ author.motto }}</p>
        </div>
      </div>
      <div class="info-tags">
        <div style="align-items: center; display: flex;">
          <i class="el-icon-s-fold"></i>
          <h5 style="margin-left: 5px; margin-right: 5px;">{{ article.category_name }}</h5>
        </div>
        <el-tag v-for="(tag, index) in article.tags" :key="tag" :type="style.tags[index%5]" effect="dark" size="small">
          {{ tag }}
        </el-tag>
      </div>
    </div>
    <!-- 正文 -->
    <div class="markdown-body">
      <div class="content" v-html= "article.content_html">
        {{ article.content_html }}
      </div>
    </div>
    <!-- 页底 -->
    <div style="display: flex; justify-content: space-between;">
      <p style="font-size: small; color: grey;"><i class="el-icon-time"></i> 发布于：{{ article.date }}</p>
      <p style="font-size: small; color: grey;"><i class="el-icon-view"></i> 阅读量：{{ view }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    article: {
      type: Object,
      default: () => ({})
    },
    author: {
      type: Object,
      default: () => ({})
    },
    view: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 样式信息
      style: {
        tags: ['success', 'primary', 'warning', 'danger', 'info']
      }
    }
  }
}
</script>

<style lang="less" scoped>
.info-title {
  margin-top: 30px;
  margin-bottom: 30px;
}
.info-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.info-header-author {
  margin-left: 15px;
}
.info-header-author-name {
  margin: 0px;
}
.info-header-author-date {
  margin: 1px;
  color: gray;
  font-size: small;
}
.info-tags {
  margin: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.el-tag {
  margin: 5px;
}
</style>
