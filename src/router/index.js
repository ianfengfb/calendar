import { createRouter, createWebHistory } from 'vue-router'
import CalendarPage from '@/page/calendar/CalendarPage.vue'
import CalendarSetting from '@/page/calendar/CalendarSetting.vue'
import NewDiary from '@/page/diary/NewDiary.vue'
import NewBudget from '@/page/budget/NewBudget.vue'
import BudgetSettings from '@/page/budget/BudgetSettings.vue'
import BudgetAnalysis from '@/page/budget/BudgetAnalysis.vue'
import DiariesPage from '@/page/diary/DiariesPage.vue'
import DashboardPage from '@/page/dashboard/DashboardPage.vue'
import ReportPage from '@/page/report/ReportPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/calendar',
      children: [
        {
          path: 'board',
          component: CalendarPage
        },
        {
          path: 'settings',
          component: CalendarSetting
        }
      ]
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
        {
          path: 'analysis',
          component: BudgetAnalysis,
        }
      ]
    },
    {
      path: '/dashboard',
      component: DashboardPage
    },
    {
      path: '/report',
      component: ReportPage
    }
  ]
})

export default router
