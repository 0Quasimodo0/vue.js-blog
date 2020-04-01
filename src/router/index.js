import Vue from 'vue'
import Router from 'vue-router'
// 管理员登录界面
// import Login from '@/view/Login.vue'
const Login = () => import(/* webpackChunkName: "login" */ '@/view/Login.vue')
// 后台管理主体视图区
// import Admin from '@/view/Admin.vue'
const Admin = () => import(/* webpackChunkName: "admin" */ '@/view/Admin.vue')
// import Dashboard from '@/view/admin/Dashboard.vue'
const Dashboard = () => import(/* webpackChunkName: "admin-dashboard" */ '@/view/admin/Dashboard.vue')
// import Article from '@/view/admin/Article.vue'
const Article = () => import(/* webpackChunkName: "admin-article" */ '@/view/admin/Article.vue')
// import ArticleList from '@/components/admin/article/List.vue'
const ArticleList = () => import(/* webpackChunkName: "admin-article" */ '@/components/admin/article/List.vue')
// import ArticleWrite from '@/components/admin/article/Write.vue'
const ArticleWrite = () => import(/* webpackChunkName: "admin-article" */ '@/components/admin/article/Write.vue')
// import ArticleView from '@/components/admin/article/View.vue'
const ArticleView = () => import(/* webpackChunkName: "admin-article" */ '@/components/admin/article/View.vue')
// import ArticleUpdate from '@/components/admin/article/Update.vue'
const ArticleUpdate = () => import(/* webpackChunkName: "admin-article" */ '@/components/admin/article/Update.vue')
// import Category from '@/view/admin/Category.vue'
const Category = () => import(/* webpackChunkName: "admin-category" */ '@/view/admin/Category.vue')
// import Link from '@/view/admin/Link.vue'
const Link = () => import(/* webpackChunkName: "admin-link" */ '@/view/admin/Link.vue')
// import Info from '@/view/admin/Info.vue'
const Info = () => import(/* webpackChunkName: "admin-info" */ '@/view/admin/Info.vue')
// import Count from '@/view/admin/Count.vue'
const Count = () => import(/* webpackChunkName: "admin-count" */ '@/view/admin/Count.vue')
// import Setting from '@/view/admin/Setting.vue'
const Setting = () => import(/* webpackChunkName: "admin-setting" */ '@/view/admin/Setting.vue')
// 网站主体视图区
// import Frame from '@/view/Website.vue'
const Frame = () => import(/* webpackChunkName: "website" */ '@/view/Website.vue')
// import Index from '@/view/website/Index.vue'
const Index = () => import(/* webpackChunkName: "index" */ '@/view/website/Index.vue')
// import Posts from '@/view/website/Post.vue'
const Posts = () => import(/* webpackChunkName: "post" */ '@/view/website/Post.vue')
// import Search from '@/view/website/Search.vue'
const Search = () => import(/* webpackChunkName: "search" */ '@/view/website/Search.vue')
// import About from '@/view/website/About.vue'
const About = () => import(/* webpackChunkName: "about" */ '@/view/website/About.vue')
// import Blog from '@/view/website/Blog.vue'
const Blog = () => import(/* webpackChunkName: "blog" */ '@/view/website/Blog.vue')
// import NotFound from '@/view/404.vue'
const NotFound = () => import(/* webpackChunkName: "404" */ '@/view/404.vue')

Vue.use(Router)

const router = new Router({
  // 开启历史模式
  mode: 'history',
  routes: [
    { path: '/',
      component: Frame,
      meta: { requireLogin: false },
      children: [
        { path: '', component: Index, meta: { requireLogin: false } },
        { path: '/article/:id', component: Posts, meta: { requireLogin: false } },
        { path: '/search', component: Search, meta: { requireLogin: false } },
        { path: '/blog', component: Blog, meta: { requireLogin: false } },
        { path: '/about', component: About, meta: { requireLogin: false } },
        { path: '/login', component: Login, meta: { requireLogin: false } }
      ]
    },
    { path: '/admin',
      component: Admin,
      meta: { requireLogin: true },
      children: [
        { path: '', component: Dashboard, meta: { requireLogin: true } },
        {
          path: '/admin/article',
          component: Article,
          meta: { requireLogin: true },
          children: [
            { path: '', component: ArticleList, meta: { requireLogin: true } },
            { path: '/admin/article/write', component: ArticleWrite, meta: { requireLogin: true } },
            { path: '/admin/article/:id', component: ArticleView, meta: { requireLogin: true } },
            { path: '/admin/article/:id/update', component: ArticleUpdate, meta: { requireLogin: true } }
          ]
        },
        { path: '/admin/category', component: Category, meta: { requireLogin: true } },
        { path: '/admin/link', component: Link, meta: { requireLogin: true } },
        { path: '/admin/info', component: Info, meta: { requireLogin: true } },
        { path: '/admin/count', component: Count, meta: { requireLogin: true } },
        { path: '/admin/setting', component: Setting, meta: { requireLogin: true } }
      ]
    },
    { path: '*', component: NotFound }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, _from, next) => {
  // to 将要跳转的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数, 表示放行
  // next() 放行 next('/login') 强制跳转
  if (to.meta.requireLogin === true) {
    if (!window.sessionStorage.getItem('token')) {
      return next('/login')
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default router
