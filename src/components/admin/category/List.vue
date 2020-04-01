<template>
  <div>
    <!-- 列表区 -->
    <el-table :data="list" stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          {{ style.level[scope.row.level] }}
        </template>
      </el-table-column>
      <el-table-column label="上一级菜单" prop="parent_name"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" round size="small" @click="openUpdateDialog(scope.row)">修改</el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" round size="small" @click="openDeleteDialog(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // 样式
      style: {
        // 等级
        level: ['一级目录', '二级目录']
      }
    }
  },
  methods: {
    // 打开修改标签对话框
    openUpdateDialog (category) {
      /* if (category.level > 0) {
        this.getParentCategory(category.level - 1, category.type)
      } */
      this.$emit('update', category)
    },
    // 删除标签
    openDeleteDialog (id) {
      this.$emit('delete', id)
    }
  }
}
</script>

<style>
</style>
