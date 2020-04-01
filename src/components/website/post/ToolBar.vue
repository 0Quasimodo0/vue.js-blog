<template>
  <div>
    <el-button circle style="margin-top: 10px;" @click="backTop()">
      <i class="icon-top-primary-32px"></i>
    </el-button>
    <el-tooltip effect="dark" content="复制链接" placement="left" style="margin-top: 10px; margin-left: 0px;">
      <el-button
      circle
      icon="icon-link-primary-32px"
      v-clipboard:copy=" 'http://www.frankfang.cn' + this.$route.path "
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"></el-button>
    </el-tooltip>
    <el-badge v-if="Switch.likeButton" :value="like" style="margin-top: 10px; padding: 0px;">
      <el-tooltip effect="dark" content="点赞" placement="left">
        <el-button circle icon="icon-like" @click="dolike()"></el-button>
      </el-tooltip>
    </el-badge>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    like: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 开关
      Switch: {
        // 点赞按钮
        likeButton: true
      }
    }
  },
  methods: {
    // 点赞
    dolike () {
      this.$http.get('/like/status', { params: { object_name: 'article', object_id: this.$route.params.id } }).then(response => {
        const result = response.data
        if (result.data.isLike) {
          this.$http.delete('/like/' + result.data.record.id).then(res => {
            if (res.data.status !== 200) {
              return this.$message.error(res.data.message)
            }
            this.like--
            return this.$message.success(res.data.message)
          })
        } else {
          this.$http.post('/like', { objectName: 'article', objectId: this.$route.params.id }).then(res => {
            if (res.data.status !== 200) {
              return this.$message.error(res.data.message)
            }
            this.like++
            return this.$message.success(res.data.message)
          })
        }
      })
    },
    // 返回顶部
    backTop () {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    },
    onCopy (e) {
      this.$message.success('链接已复制到剪贴板!')
    },
    onError (e) {
      this.$message.error('复制失败!')
    }
  }
}
</script>

<style>
</style>
