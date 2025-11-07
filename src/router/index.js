import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import HanziPage from '../views/HanziPage.vue'
import AlphabetPage from '../views/AlphabetPage.vue'
import WordPage from '../views/WordPage.vue'
import ParagraphPage from '../views/ParagraphPage.vue'
import LoginPage from '../views/LoginPage.vue'
import MembershipPage from '../views/MembershipPage.vue'
import ForgotPasswordPage from '../views/ForgotPasswordPage.vue'
import DonatePage from '../views/DonatePage.vue'
import InvitePage from '../views/InvitePage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import NumberPage from '../views/NumberPage.vue'
import PinyinPage from '../views/PinyinPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pinyin',
    name: 'Pinyin',
    component: PinyinPage
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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordPage
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
  },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/number', name: 'Number', component: NumberPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
