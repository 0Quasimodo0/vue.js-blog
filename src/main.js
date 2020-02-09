import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './assets/css/icon.css'
import './plugins/element.js'
import './plugins/MavonEditor.js'
import axios from 'axios'
import './assets/css/github-markdown.css'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8081'
// axios请求拦截器
axios.interceptors.request.use(config => {
  config.headers.authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
