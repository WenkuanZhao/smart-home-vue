import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  }
  // 可以添加更多路由，如设备详情页面等
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
