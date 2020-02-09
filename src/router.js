import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/admin/Login.vue'
import Dashboard from './components/admin/Dashboard.vue'
import Write from './components/admin/article/Write.vue'
import List from './components/admin/article/List.vue'
import View from './components/admin/article/View.vue'
import Welcome from './components/admin/Welcome.vue'
import Modify from './components/admin/article/Modify.vue'
import Frame from './components/visitor/Frame.vue'
import Index from './components/visitor/Index.vue'
import Posts from './components/visitor/Posts.vue'
import TagList from './components/admin/tag/List.vue'
import CategoryList from './components/admin/category/List.vue'
import Link from './components/admin/collection/Link.vue'
import Info from './components/admin/Info.vue'
import Setting from './components/admin/Setting.vue'
import Search from './components/visitor/Search.vue'
import Category from './components/visitor/Category.vue'
import Tag from './components/visitor/Tag.vue'
import About from './components/visitor/About.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/',
      component: Frame,
      meta: { requireLogin: false },
      redirect: '/index',
      children: [
        { path: '/index', component: Index, meta: { requireLogin: false } },
        { path: '/article/:id', component: Posts, meta: { requireLogin: false } },
        { path: '/search', component: Search, meta: { requireLogin: false } },
        { path: '/category', component: Category, meta: { requireLogin: false } },
        { path: '/tag/:id', component: Tag, meta: { requireLogin: false } },
        { path: '/about', component: About, meta: { requireLogin: false } },
        { path: '/login', component: Login, meta: { requireLogin: false } }
      ]
    },
    { path: '/admin',
      component: Dashboard,
      meta: { requireLogin: true },
      redirect: '/admin/dashboard',
      children: [
        { path: '/admin/article/list', component: List, meta: { requireLogin: true } },
        { path: '/admin/article/write', component: Write, meta: { requireLogin: true } },
        { path: '/admin/dashboard', component: Welcome, meta: { requireLogin: true } },
        { path: '/admin/article/view/:id', component: View, meta: { requireLogin: true } },
        { path: '/admin/article/modify/:id', component: Modify, meta: { requireLogin: true } },
        { path: '/admin/tag/list', component: TagList, meta: { requireLogin: true } },
        { path: '/admin/category/list', component: CategoryList, meta: { requireLogin: true } },
        { path: '/admin/link', component: Link, meta: { requireLogin: true } },
        { path: '/admin/info', component: Info, meta: { requireLogin: true } },
        { path: '/admin/setting', component: Setting, meta: { requireLogin: true } }
      ]
    }
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
