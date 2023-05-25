import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import ReportView from '../views/ReportView.vue'
import notFound from '../views/404View.vue'
import TestView from '../views/testView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/profile/report-bug',
      name: 'report-bug', 
      component: ReportView
    },
    {
      path: '/testpage',
      name: 'test-page',
      component: TestView
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: notFound
    }
  ]
})

export default router
