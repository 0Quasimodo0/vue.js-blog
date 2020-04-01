<template>
  <el-container>
    <el-header :class="{ 'el-header-active': isActive }">
      <div class="container-header">
        <div class="header-brand">
          <el-link :underline="false" href="/">
            <span>{{ websiteInfo.brand }}</span>
          </el-link>
        </div>
        <el-menu mode="horizontal" :router="true" menu-trigger="hover" background-color="#393D49" text-color="#FFF" active-text-color="#5FB878">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="small" v-model="input" clearable @input="search()"></el-input>
          <el-menu-item index="/" class="menu-item">
            <template slot="title">
              <i class="el-icon-s-home" style="border-bottom: 0px;"></i>
              <span style="font-weight: bold;">首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="blog" class="menu-item">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span style="font-weight: bold;">博客</span>
            </template>
            <el-submenu :index=" '/blog/' + item.id " v-for="item in menu.category" :key="item.id">
              <template slot="title">
                <i class="el-icon-s-unfold"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index=" '/blog?categoryId=' + i.id " v-for="i in item.children" :key="i.id">
                <template slot="title">
                  <span>{{ i.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="link" class="menu-item">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span style="font-weight: bold;">导航</span>
            </template>
            <el-menu-item-group v-for="item in menu.link" :key="item.category_id">
              <template slot="title">
                <span style="margin-left: -25px; font-weight: bold; font-size: medium;">{{ item.category_name }}</span>
              </template>
              <el-menu-item :index="link.linkUrl" v-for="link in item.links" :key="link.id">
                <div style="display: flex; align-items: center;">
                  <el-avatar :size="25" :src="link.iconUrl" style="margin-right: 8px; background-color: #FFFFFF;"></el-avatar>
                  <el-link :underline="false" :href="link.linkUrl">
                    <span style="color: #FFF;">{{ link.name }}</span>
                  </el-link>
                </div>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/about" class="menu-item">
            <i class="el-icon-info" style="border-bottom: 0px;"></i>
            <span style="font-weight: bold;">关于</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <!-- 路由占位符 -->
      <router-view v-if="isRouterAlive"></router-view>
    </el-main>
    <el-footer>
      <div style="width: 100%; color: #303133;">
        <div class="container-footer">
          <el-row :gutter="20">
            <el-col :span="6">
              <h4># 平台</h4>
              <el-row v-for="item in footerInfo.platformLinks" :key="item.id">
                <el-link :underline="false" :href="item.linkUrl" class="link-bottom">
                  <span>{{ item.name }}</span>
                </el-link>
              </el-row>
            </el-col>
            <el-col :span="6">
              <h4># 文档</h4>
              <el-row v-for="item in footerInfo.courseLinks" :key="item.id">
                <el-link :underline="false" :href="item.linkUrl" class="link-bottom">
                  <span>{{ item.name }}</span>
                </el-link>
              </el-row>
            </el-col>
            <el-col :span="6">
              <h4># 博客</h4>
              <el-row v-for="item in footerInfo.blogLinks" :key="item.id">
                <el-link :underline="false" :href="item.linkUrl" class="link-bottom">
                  <span>{{ item.name }}</span>
                </el-link>
              </el-row>
            </el-col>
            <el-col :span="6">
              <h4># 关注</h4>
              <el-row :gutter="10" style="margin-bottom: 20px;">
                <el-col :span="6" v-for="item in footerInfo.followLinks" :key="item.id">
                  <el-link :underline="false" :href="item.linkUrl" class="link-bottom">
                    <i :class="item.iconUrl"></i>
                  </el-link>
                </el-col>
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>
              </el-row>
            </el-col>
          </el-row>
          <div style="text-align: center;">
            <p style="color: grey; font-size: small; margin: 20px; margin-bottom: 0px;">{{ websiteInfo.copyright }}</p>
            <el-link :href="footerInfo.miitGovLink">
              <p style="margin: 0px; margin-bottom: 10px; font-size: small; color: grey;">{{ websiteInfo.beianInfo }}</p>
            </el-link>
          </div>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      input: '',
      // 是否开启顶部固定效果
      isActive: false,
      isRouterAlive: true,
      // 菜单
      menu: {
        category: [],
        link: []
      },
      websiteInfo: {
        brand: '',
        copyright: '',
        beianInfo: ''
      },
      footerInfo: {
        blogLinks: [{
          id: '1',
          name: '博客园',
          linkUrl: 'https://www.cnblogs.com/'
        },
        {
          id: '2',
          name: 'CSDN',
          linkUrl: 'https://www.csdn.net/'
        }
        ],
        courseLinks: [{
          id: '1',
          name: 'spring',
          linkUrl: 'https://spring.io'
        },
        {
          id: '2',
          name: 'spring boot',
          linkUrl: 'https://spring.io/projects/spring-boot'
        },
        {
          id: '3',
          name: 'spring cloud',
          linkUrl: 'https://spring.io/projects/spring-cloud'
        },
        {
          id: '4',
          name: 'dubbo',
          linkUrl: 'http://dubbo.apache.org/'
        },
        {
          id: '5',
          name: 'mybatis plus',
          linkUrl: 'https://mp.baomidou.com/'
        },
        {
          id: '6',
          name: 'vue.js',
          linkUrl: 'https://cn.vuejs.org/'
        },
        {
          id: '7',
          name: 'element ui',
          linkUrl: 'https://element.eleme.cn/'
        }
        ],
        platformLinks: [{
          id: '1',
          name: 'LeetCode',
          linkUrl: 'https://leetcode-cn.com/'
        },
        {
          id: '2',
          name: '思否',
          linkUrl: 'https://segmentfault.com/'
        },
        {
          id: '3',
          name: '菜鸟教程',
          linkUrl: 'http://www.runoob.com'
        },
        {
          id: '4',
          name: 'W3School',
          linkUrl: 'https://www.w3school.com.cn/'
        }
        ],
        followLinks: [{
          id: '1',
          name: 'github',
          linkUrl: 'https://github.com/0Quasimodo0',
          iconUrl: 'icon-github-36px'
        },
        {
          id: '2',
          name: 'gitee',
          linkUrl: 'https://gitee.com/frankfang-space',
          iconUrl: 'icon-gitee-36px'
        },
        {
          id: '3',
          name: 'CSDN',
          linkUrl: 'https://me.csdn.net/weixin_45444394',
          iconUrl: 'icon-csdn-36px'
        },
        {
          id: '4',
          name: '博客园',
          linkUrl: 'https://www.cnblogs.com/',
          iconUrl: 'icon-cnblogs-36px'
        }
        ],
        miitGovLink: 'http://beian.miit.gov.cn/'
      }
    }
  },
  created () {
    this.getCategoryMenu()
    this.getLinkMenu()
    this.getWebsiteInfo()
    this.hasNewVisitor()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 获取目录菜单
    async getCategoryMenu () {
      const {
        data: result
      } = await this.$http.get('/category/menu', {
        params: {
          type: '文章'
        }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.menu.category = result.data
    },
    // 获取导航菜单
    async getLinkMenu () {
      const {
        data: result
      } = await this.$http.get('/link', {
        params: {
          group: true
        }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.menu.link = result.data
    },
    // 获取网站信息
    async getWebsiteInfo () {
      const {
        data: result
      } = await this.$http.get('/setting')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.websiteInfo = result.data
    },
    // 统计网站访问量
    hasNewVisitor () {
      return this.$http.post('/count/website')
    },
    // 搜索文章
    search () {
      if (this.input !== '') {
        return this.$router.push({
          path: '/search',
          query: {
            key: this.input
          }
        })
      }
      this.reload()
    },
    // 重新加载页面
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    // 处理滚动事件
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 0) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
  .el-header {
    padding: 0px;
    background-color: #393D49;
    // background: rgba(255, 255, 255, 0.85);
    position: relative;
    width: 100%;
    z-index: 100;
  }
  .el-footer {
    padding: 0px;
    height: 100%;
  }

  .el-header-active {
    position: fixed;
    top: 0;
  }

  .container-header {
    width: 64%;
    height: 100%;
    margin-left: 18%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-menu {
      border-bottom: 0px;
      display: flex;
      align-items: center;
      .el-input {
        width: 200px;
        margin-right: 15px;
      }
    }
    .header-brand {
      display: flex;
      align-items: center;
      margin-bottom: 0px;
      .el-link {
        span {
          margin: 0px;
          color: #FFF;
          font-weight: bold;
          font-size: 18pt;
        }
      }
    }
  }

  .container-footer {
    width: 64%;
    margin-left: 18%;
  }

  .el-main {
    background-color: #F2F6FC;
  }
  .link-bottom {
    span {
      margin: 0px;
      border-bottom: 2px solid transparent;
    }
  }
  .link-bottom :hover {
    span {
      color: #5FB878;
      border-bottom: 2px solid #5FB878;
    }
  }
</style>
