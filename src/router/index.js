import { createRouter, createWebHistory } from 'vue-router'
import CalendarPage from '@/page/calendar/CalendarPage.vue'
import NewDiary from '@/page/diary/NewDiary.vue'

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
    },
    {
      path: '/diary',
      component: NewDiary
    }
  ]
})

export default router
