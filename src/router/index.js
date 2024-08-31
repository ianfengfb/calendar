import { createRouter, createWebHistory } from 'vue-router'
import CalendarPage from '@/page/calendar/CalendarPage.vue'
import NewDiary from '@/page/diary/NewDiary.vue'
import NewBudget from '@/page/budget/NewBudget.vue'
import BudgetSettings from '@/page/budget/BudgetSettings.vue'
import DiariesPage from '@/page/diary/DiariesPage.vue'
import DashboardPage from '@/page/dashboard/DashboardPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
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
    },
    {
      path: '/budgets',
      children: [
        {
          path: 'new',
          component: NewBudget,
        },
        {
          path: 'settings',
          component: BudgetSettings,
        },
      ]
    },
    {
      path: '/dashboard',
      component: DashboardPage
    }
  ]
})

export default router
