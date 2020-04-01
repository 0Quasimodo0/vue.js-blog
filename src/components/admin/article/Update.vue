<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/article' }">文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>文章修改</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card shadow="never">
      <!-- 表单 -->
      <el-form :model="form.article" :rules="form.rules" ref="infoFormRef">
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="form.article.title"></el-input>
        </el-form-item>
        <el-form-item label="所属目录" prop="categoryId">
          <!-- 级联选择器 -->
          <el-cascader
          v-model="form.article.categoryId"
          :options="select.category"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false }"
          :show-all-levels="false"
          clearable
          @visible-change="getCategoryList"></el-cascader>
          <el-button type="primary" icon="el-icon-plus" style="margin-left: 10px;" @click="createCategory()">新建</el-button>
        </el-form-item>
        <el-form-item label="* 文章标签">
          <el-tag
          v-for="tag in temp.tags"
          :key="tag"
          :disable-transitions="false"
          closable
          @close="handleTagClose(tag)">{{ tag }}</el-tag>
          <el-input
          class="input-new-tag"
          size="small"
          v-if="Switch.inputVisible"
          v-model="temp.inputValue"
          ref="saveTagInput"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="* 封面" prop="cover">
          <el-image v-if="Switch.previewCover" style="width: 240px; height: 135px;" :src="form.article.cover" fit="contain"></el-image>
          <el-input v-model="form.article.cover" clearable>
            <el-button slot="append" icon="el-icon-refresh" @click="Switch.previewCover = !Switch.previewCover">刷新</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input type="textarea" v-model="form.article.introduction" :rows="3"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="markdown-editor">
            <p>* 正文</p>
            <mavon-editor
            :toobars="markdownOption"
            v-model="form.article.contentMd"
            @change="contentChangeEvent"
            :ishljs = "true"
            style="min-height: 500px"></mavon-editor>
          </div>
        </el-form-item>
      </el-form>
      <!-- 按钮区 -->
      <div class="button-area">
        <div class="button-left">
          <el-button type="primary" plain icon="el-icon-upload2">上传</el-button>
        </div>
        <div class="button-right">
          <el-button type="success" round icon="el-icon-check" @click="update()">修改</el-button>
          <el-button type="primary" round icon="el-icon-refresh" @click="getArticle()">还原</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单
      form: {
        // 文章
        article: {
          // 文章id
          id: '',
          // 文章标题
          title: '',
          // 简介
          introduction: '',
          // 目录id
          categoryId: '',
          // 标签
          tags: '',
          // 封面链接
          cover: '',
          // html格式内容
          contentHtml: '',
          // markdown格式内容
          contentMd: ''
        },
        // 校验规则
        rules: {
          // 验证是否输入标题
          title: [
            { required: true, message: '请输入文章标题！', trigger: 'blur' },
            { min: 1, max: 32, message: '长度不能超过 32 个字符', trigger: 'blur' }
          ],
          // 验证简介是否合法
          introduction: [
            { required: true, message: '请输入文章简介（不超过 64 个字符）！', trigger: 'blur' },
            { min: 0, max: 64, message: '长度不能超过 64 个字符', trigger: 'blur' }
          ],
          // 验证是否选择目录
          categoryId: [
            { required: true, message: '请选择文章所属目录', trigger: 'change' }
          ]
        }
      },
      // 选择器
      select: {
        // 目录
        category: []
      },
      // 开关
      Switch: {
        inputVisible: false,
        // 预览封面
        previewCover: false
      },
      // 暂存
      temp: {
        // 新建标签的输入值
        inputValue: '',
        // 标签数组
        tags: []
      },
      // 编辑器工具栏设置
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    // 标签清除事件
    handleTagClose (tag) {
      this.temp.tags.splice(this.temp.tags.indexOf(tag), 1)
    },
    // 打开标签输入框
    showInput () {
      this.Switch.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 添加新标签
    handleInputConfirm () {
      let inputValue = this.temp.inputValue
      if (inputValue) {
        this.temp.tags.push(inputValue)
      }
      this.Switch.inputVisible = false
      this.temp.inputValue = ''
    },
    async getArticle () {
      const { data: result } = await this.$http.get('/admin/article/' + this.$route.params.id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.getCategoryList(true)
      this.form.article.id = result.data.id
      this.form.article.title = result.data.title
      this.form.article.introduction = result.data.introduction
      this.form.article.categoryId = result.data.categoryId
      this.form.article.contentHtml = result.data.contentHtml
      this.form.article.contentMd = result.data.contentMd
      this.form.article.tags = result.data.tags
      this.form.article.cover = result.data.cover
      this.temp.tags = result.data.tags.split(',')
    },
    // 获取目录列表
    async getCategoryList (render) {
      if (render) {
        const { data: result } = await this.$http.get('/category/menu', { params: { type: '文章' } })
        if (result.status !== 200) {
          return this.$message.error(result.message)
        }
        this.select.category = result.data
      }
    },
    // 创建目录
    createCategory () {
      this.$router.push('/admin/category/list')
    },
    // 文章内容修改触发事件
    contentChangeEvent (value, render) {
      this.form.article.contentHtml = render
    },
    // 修改文章
    update () {
      this.$refs.infoFormRef.validate(async valid => {
        if (this.form.article.contentMd !== '' && valid) {
          this.form.article.tags = this.temp.tags.toString()
          const { data: result } = await this.$http.put('/admin/article', this.form.article)
          if (result.status !== 200) {
            return this.$message.error('上传失败！')
          }
          this.$message.success('上传成功！')
          this.$router.push('/admin/article/list')
        } else {
          this.$message.warning('请将表单填写完整！')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
