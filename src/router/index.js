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
      path: '/diaries',
      children: [
        {
          path: '',
          component: DiariesPage
        },
        {
          path: 'new',
          component: NewDiary,
        },
        {
          path: 'edit/:id',
          component: NewDiary,
          props: true
        }
      ]
    }
  ]
})

export default router
