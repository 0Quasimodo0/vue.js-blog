<template>
  <div>
    <div class="dynamic" v-for="(item, index) in list" :key="item.id">
      <div class="dynamic-top">
        <i :class="style.article[index%5]"></i>
        <div>
          <el-link :underline="false" :href=" '/article/' + item.id ">
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
          <el-tag v-for="(tag, i) in item.tags" :key="tag" :type="style.tag[i%5]">{{ tag }}</el-tag>
        </div>
      </div>
      <p>发布于 {{ item.date }}</p>
      <el-divider ></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    list: {
      type: Array,
      // Array类型的default必须是一个函数
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      style: {
        // 文章
        article: [
          'icon-article-success-64px',
          'icon-article-primary-64px',
          'icon-article-warning-64px',
          'icon-article-danger-64px',
          'icon-article-info-64px'
        ],
        // 标签
        tag: ['success', 'primary', 'warning', 'danger', 'info']
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
.el-link {
  h3 {
    margin: 0px;
    border-bottom: 2px solid transparent;
  }
}
.el-link :hover {
  h3 {
    color: #5FB878;
    border-bottom: 2px solid #5FB878;
  }
}
</style>
