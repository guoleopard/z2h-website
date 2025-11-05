import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import HanziPage from '../views/HanziPage.vue'
import AlphabetPage from '../views/AlphabetPage.vue'
import WordPage from '../views/WordPage.vue'
import ParagraphPage from '../views/ParagraphPage.vue'
import LoginPage from '../views/LoginPage.vue'
import MembershipPage from '../views/MembershipPage.vue'
import DonatePage from '../views/DonatePage.vue'
import InvitePage from '../views/InvitePage.vue'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/membership',
    name: 'Membership',
    component: MembershipPage
  },
  {
    path: '/donate',
    name: 'Donate',
    component: DonatePage
  },
  {
    path: '/invite',
    name: 'Invite',
    component: InvitePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
