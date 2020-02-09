<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/article/list' }">文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card shadow="never">
      <!-- 表单 -->
      <el-form :model="infoForm" :rules="infoFormRules" ref="infoFormRef">
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="infoForm.title"></el-input>
        </el-form-item>
        <el-form-item label="所属目录" prop="categoryId">
          <el-select v-model="infoForm.categoryId" clearable placeholder="请选择所属目录" @change="getTagList">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-plus" style="margin-left: 10px;">新建</el-button>
        </el-form-item>
        <el-form-item label="文章标签"  prop="tags">
          <el-checkbox-group v-model="infoForm.tags" @change="cheakChange">
            <el-checkbox v-for="item in tagList" :key="item.id" :label="item" border size="small">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="已选标签">
          <div class="tagArea">
            <el-tag v-for="item in infoForm.tags" :key="item.id" style="margin-right: 10px;">{{ item.name }}</el-tag>
            <el-button type="primary" icon="el-icon-plus" plain size="small">新建</el-button>
          </div>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input type="textarea" v-model="infoForm.introduction" :rows="3"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="markdown-editor">
            <p>* 正文</p>
            <mavon-editor :toobars="markdownOption" v-model="infoForm.content_md" @change="contentChangeEvent" :ishljs = "true" style="min-height: 300px"></mavon-editor>
          </div>
        </el-form-item>
      </el-form>
      <!-- 按钮区 -->
      <div class="button-area">
        <div class="button-left">
          <el-button type="primary" plain icon="el-icon-upload2">上传</el-button>
        </div>
        <div class="button-right">
          <el-button type="success" round @click="submit">提交</el-button>
          <el-button type="primary" round @click="save">保存</el-button>
          <el-button type="info" round @click="reset('infoFormRef')">清空</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 文章信息表单
      infoForm: {
        // 标题
        title: '',
        // 简介
        introduction: '',
        // 目录id
        categoryId: '',
        // 标签列表
        tags: [],
        // markdown格式内容
        content_md: '',
        // html格式内容
        content_html: ''
      },
      // 文章信息验证
      infoFormRules: {
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
          { required: true, message: '请选择文章所属目录！', trigger: 'change' }
        ],
        // 验证是否选择标签
        tags: [
          { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
        ]
      },
      // 目录列表
      categoryList: [],
      // 标签列表
      tagList: [],
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
        save: false, // 保存（触发events中的save事件）
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
    this.getCategoryList()
  },
  methods: {
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/admin/category/list')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.categoryList = result.data
    },
    // 获取标签列表
    async getTagList () {
      if (this.infoForm.categoryId !== null) {
        const { data: result } = await this.$http.post('/admin/tag?cid=' + this.infoForm.categoryId)
        if (result.status !== 200) {
          return this.$message.error(result.message)
        }
        this.tagList = result.data
      }
    },
    // 文章内容修改触发事件
    contentChangeEvent (value, render) {
      this.infoForm.content_html = render
    },
    // 提交文章
    submit () {
      this.$refs.infoFormRef.validate(async valid => {
        if (this.infoForm.content_md !== '' && valid) {
          const { data: result } = await this.$http.post('/admin/article/create', this.infoForm)
          if (result.status !== 200) {
            return this.$message.error('上传失败！')
          }
          this.$message.success('上传成功！')
          this.$router.push('/admin/article/list')
        } else {
          this.$message.warning('请将表单填写完整！')
        }
      })
    },
    // 暂存为草稿
    save () {
      this.$message.info('功能暂未开启！')
    },
    // 重置表单
    reset (refName) {
      this.$refs[refName].resetFields()
      this.infoForm.content_md = ''
      this.infoForm.content_html = ''
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.button-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
</style>
