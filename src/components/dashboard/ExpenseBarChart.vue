<template>
    <v-row >
      <div class="col-12">
        <v-tabs
          v-model="tab"
          bg-color="#e9e9e9"
          fixed-tabs
          @update:model-value="tabChangeHandler"
        >
          <v-tab value="month">Month</v-tab>
          <v-tab value="week">Week</v-tab>
          <v-tab value="monthly">Monthly Trends</v-tab>
          <v-tab value="weekly">Weekly Trends</v-tab>
        </v-tabs>
      </div>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="month">
          <v-row v-if="expensesBarChartIsFetching">
            <div class="col-12 text-center">Loading...</div>
          </v-row>
          <v-row v-else>
            <div class="col-12">
              <Bar
                id="expense-chart-id"
                :options="chartOptions"
                :data="chartData"
              />
            </div>
            <div class="col-6">
              <Bar
                id="total-chart-id"
                :options="totalChartOptions"
                :data="totalChartData"
              />
            </div>
            <div class="col-6">
              <Pie 
                id="pie-chart-id"
                :data="pieChartData" 
                :options="pieChartOptions" 
              />
            </div>
          </v-row>
        </v-tabs-window-item>

        <v-tabs-window-item value="week">
          <v-row v-if="expensesBarChartIsFetching">
            <div class="col-12 text-center">Loading...</div>
          </v-row>
          <v-row v-else>
            <div class="col-12">
              <Bar
                id="expense-chart-id"
                :options="chartOptions"
                :data="chartData"
              />
            </div>
            <div class="col-6">
              <Bar
                id="total-chart-id"
                :options="totalChartOptions"
                :data="totalChartData"
              />
            </div>
            <div class="col-6">
              <Pie 
                id="pie-chart-id"
                :data="pieChartData" 
                :options="pieChartOptions" 
              />
            </div>
          </v-row>
        </v-tabs-window-item>

        <v-tabs-window-item value="monthly">
          <v-row v-if="expensesBarChartIsFetching">
            <div class="col-12 text-center">Loading...</div>
          </v-row>
          <Line 
            id="line-chart-monthly-id"
            :data="lineChartData" 
            :options="lineChartOptions" 
            v-else
          />
        </v-tabs-window-item>

        <v-tabs-window-item value="weekly">
          <v-row v-if="expensesBarChartIsFetching">
            <div class="col-12 text-center">Loading...</div>
          </v-row>
          <Line 
            id="line-chart-weekly-id"
            :data="lineChartData" 
            :options="lineChartOptions" 
            v-else
          />
        </v-tabs-window-item>
      </v-tabs-window>
      
    </v-row>
  </template>
  
  <script>
  import { Bar, Pie, Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'

  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement )
  
  export default {
    components: { Bar, Pie, Line },
    data() {
      return {
        pieChartOptions: {
          responsive: true,
        },
        tab: 'month'
      }
    },
    mounted() {
      this.$store.dispatch('dashboard/fetchExpensesBarChart', 'month');
    },
    computed: {
      chartOptions() {
        return {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: this.tab === 'month' ? 'Monthly Expenses and Budgets' : 'Weekly Expenses and Budgets'
            }
          }
        }
      },
      totalChartOptions() {
        return {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: this.tab === 'month' ? 'Monthly Total' : 'Weekly Total'
            }
          }
        }
      },
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
      pieChartData() {
        if (!this.expensesBarChart.chartLabels) return {
          labels: [],
          datasets: []
        };
        const chartLabels = this.expensesBarChart.chartLabels;
        return {
          labels: chartLabels,
          datasets: [
            {
              backgroundColor: chartLabels.map(label => this.expensesBarChart.chartExpenseData[label].color),
              data: chartLabels.map(label => this.expensesBarChart.chartExpenseData[label].total_amount)
            }
          ]
        }
      },
      expensesLineChart() {
        return this.$store.getters['dashboard/getExpensesLineChart'];
      },
      expensesBarLineIsFetching() {
        return this.$store.getters['dashboard/getIsFetchingExpensesLineChart'];
      },
      lineChartData() {
        if (!this.expensesLineChart.chartLabels) return {
          labels: [],
          datasets: []
        };
        const chartLabels = this.expensesLineChart.chartLabels;
        return {
          labels: chartLabels,
          datasets: [
            {
              label: 'Expenses',
              backgroundColor: '#057cec',
              borderColor: '#057cec',
              data: chartLabels.map(label => this.expensesLineChart.chartExpenseData[label])
            },
            {
              label: 'Budgets',
              backgroundColor: '#e9e9e9',
              borderColor: '#e9e9e9',
              data: chartLabels.map(label => this.expensesLineChart.chartBudgetData[label])
            }
          ]
        }
      },
      lineChartOptions() {
        return {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
            title: {
              display: true,
              text: this.tab === 'monthly' ? 'Monthly Expenses Trends' : 'Weekly Expenses Trends'
            }
          }
        }
      }
    },
    methods: {
      tabChangeHandler() {
        if (this.tab === 'month') {
          this.$store.dispatch('dashboard/fetchExpensesBarChart', 'month');
        } else if (this.tab === 'week') {
          this.$store.dispatch('dashboard/fetchExpensesBarChart', 'week');
        } else if (this.tab === 'monthly') {
          this.$store.dispatch('dashboard/fetchExpensesLineChart', 'monthly');
        } else if (this.tab === 'weekly') {
          this.$store.dispatch('dashboard/fetchExpensesLineChart', 'weekly');
        }
      }
    }
  }
  </script>

  <style scoped>
    :deep(.v-tabs-window) {
      width: 100%;
    }
  </style>