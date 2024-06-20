import { createRouter, createWebHistory } from 'vue-router'
import CalendarPage from '@/page/calendar/CalendarPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/calendar'
    },
    {
      path: '/calendar',
      component: CalendarPage
    }
  ]
})

export default router