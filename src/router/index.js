import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Login from '../views/Login.vue'
import store from '../store/s_index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // 可以添加更多路由，如设备详情页面等
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  
  // 需要认证且未登录
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  // 已登录但访问登录页
  else if (to.path === '/login' && isAuthenticated) {
    next('/')
  }
  // 其他情况正常放行
  else {
    next()
  }
})

export default router

