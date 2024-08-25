<template>
    <v-row v-if="expensesBarChartIsFetching">
      <div class="col-12">Loading...</div>
    </v-row>
    <v-row v-else>
      <div class="col-12">
        <v-tabs
          v-model="tab"
          bg-color="#e9e9e9"
          @update:model-value="tabChangeHandler"
        >
          <v-tab value="month">Month</v-tab>
          <v-tab value="week">Week</v-tab>
        </v-tabs>
      </div>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="month">
            <Bar
              id="expense-chart-id"
              :options="chartOptions"
              :data="chartData"
            />
            <Bar
              id="total-chart-id"
              :options="totalChartOptions"
              :data="totalChartData"
            />
        </v-tabs-window-item>

        <v-tabs-window-item value="week">
          <Bar
              id="expense-chart-id"
              :options="chartOptions"
              :data="chartData"
            />
            <Bar
              id="total-chart-id"
              :options="totalChartOptions"
              :data="totalChartData"
            />
        </v-tabs-window-item>
      </v-tabs-window>
      
    </v-row>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    components: { Bar },
    data() {
      return {
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Monthly Expenses and Budgets'
            }
          }
        },
        totalChartOptions: {
          responsive: false,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Monthly Total'
            }
          }
        },
        tab: 'month'
      }
    },
    mounted() {
      this.$store.dispatch('dashboard/fetchExpensesBarChart', 'month');
    },
    computed: {
      expensesBarChart() {
        return this.$store.getters['dashboard/getExpensesBarChart'];
      },
      expensesBarChartIsFetching() {
        return this.$store.getters['dashboard/getIsFetchingExpensesBarChart'];
      },
      chartData() {
        if (!this.expensesBarChart.chartLabels) return {
          labels: [],
          datasets: []
        };
        const chartLabels = this.expensesBarChart.chartLabels;
        return {
          labels: chartLabels,
          datasets: [
            {
              label: 'Expenses',
              backgroundColor: chartLabels.map(label => this.expensesBarChart.chartExpenseData[label].color),
              data: chartLabels.map(label => this.expensesBarChart.chartExpenseData[label].total_amount)
            },
            {
              label: 'Budgets',
              backgroundColor: '#e9e9e9',
              data: chartLabels.map(label => this.expensesBarChart.chartBudgetData[label].total_weekly_budget)
            }
          ]
        }
      },
      totalChartData() {
        return {
          labels: ['Total'],
          datasets: [
            {
              label: 'Total Expenses',
              backgroundColor: '#3f51b5',
              data: [this.expensesBarChart.totalExpenses]
            },
            {
              label: 'Total Budgets',
              backgroundColor: '#e9e9e9',
              data: [this.expensesBarChart.totalBudgets]
            }
          ]
        }
      },
    },
    methods: {
      tabChangeHandler() {
        this.$store.dispatch('dashboard/fetchExpensesBarChart', this.tab);
      }
    }
  }
  </script>

  <style scoped>
    :deep(.v-tabs-window) {
      width: 100%;
    }
  </style>