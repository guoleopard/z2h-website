import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import HanziPage from '../views/HanziPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hanzi',
    name: 'Hanzi',
    component: HanziPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
