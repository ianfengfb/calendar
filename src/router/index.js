import { createRouter, createWebHistory } from 'vue-router'
import CalendarPage from '@/page/calendar/CalendarPage.vue'
import NewDiary from '@/page/diary/NewDiary.vue'
import DiariesPage from '@/page/diary/DiariesPage.vue'

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
      path: '/diary-new',
      component: NewDiary
    },
    {
      path: '/diary',
      component: DiariesPage
    }
  ]
})

export default router
