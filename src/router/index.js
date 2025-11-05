import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import HanziPage from '../views/HanziPage.vue'
import AlphabetPage from '../views/AlphabetPage.vue'
import WordPage from '../views/WordPage.vue'
import ParagraphPage from '../views/ParagraphPage.vue'

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
  },
  {
    path: '/alphabet',
    name: 'Alphabet',
    component: AlphabetPage
  },
  {
    path: '/word',
    name: 'Word',
    component: WordPage
  },
  {
    path: '/paragraph',
    name: 'Paragraph',
    component: ParagraphPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
