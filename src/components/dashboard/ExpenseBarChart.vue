<template>
    <v-row >
      <div class="col-12">
        <v-tabs
          v-model="tab"
          bg-color="#e9e9e9"
          fixed-tabs
          @update:model-value="tabChangeHandler"
        >
          <v-tab value="month">{{ monthBarChartTab }}</v-tab>
          <v-tab value="week">{{ weekBarChartTab }}</v-tab>
          <v-tab value="monthly">Monthly Trends</v-tab>
          <v-tab value="weekly">Weekly Trends</v-tab>
        </v-tabs>
      </div>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="month">
          <v-row v-if="expensesBarChartIsFetching">
            <div class="col-12 px-4 text-center">Loading...</div>
          </v-row>
          <v-row v-else>
            <div class="col-12 px-4">
              <v-row>
                <div class="col-4 p-4">
                  <v-switch
                    v-model="includeLoan"
                    :label="includeLoan ? 'Including Loan' : 'Excluding Loan'"
                    hide-details
                    inset
                  ></v-switch>
                </div>
                <div class="col-4 p-4">
                  <v-text-field 
                    label="Start Date" 
                    v-model="startDate"
                    readonly
                    @click="toggleDatePicker('start')"
                  ></v-text-field>
                  <v-date-picker 
                      v-if="showDatePickerStart"
                      v-model="datePickerValueStart"
                      @update:modelValue="selectDate('start')"
                  ></v-date-picker>
                </div>
                <div class="col-4 p-4">
                  <v-text-field 
                    label="End Date" 
                    v-model="endDate"
                    readonly
                    @click="toggleDatePicker('end')"
                  ></v-text-field>
                  <v-date-picker 
                      v-if="showDatePickerEnd"
                      v-model="datePickerValueEnd"
                      @update:modelValue="selectDate('end')"
                  ></v-date-picker>
                </div>
              </v-row>
            </div>
            <div class="col-12 px-4">
              <Bar
                id="expense-chart-id"
                :options="chartOptions"
                :data="chartData"
              />
            </div>
            <div class="col-6 ps-4">
              <Bar
                id="total-chart-id"
                :options="totalChartOptions"
                :data="totalChartData"
              />
            </div>
            <div class="col-6 pe-4">
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
            <div class="col-12 px-4 text-center">Loading...</div>
          </v-row>
          <v-row v-else>
            <div class="col-12 px-4">
              <v-row>
                <div class="col-4 p-4">
                  <v-switch
                    v-model="includeLoan"
                    :label="includeLoan ? 'Including Loan' : 'Excluding Loan'"
                    hide-details
                    inset
                  ></v-switch>
                </div>
                <div class="col-4 p-4">
                  <v-text-field 
                    label="Start Date" 
                    v-model="startDate"
                    readonly
                    @click="toggleDatePicker('start')"
                  ></v-text-field>
                  <v-date-picker 
                      v-if="showDatePickerStart"
                      v-model="datePickerValueStart"
                      @update:modelValue="selectDate('start')"
                  ></v-date-picker>
                </div>
                <div class="col-4 p-4">
                  <v-text-field 
                    label="End Date" 
                    v-model="endDate"
                    readonly
                    @click="toggleDatePicker('end')"
                  ></v-text-field>
                  <v-date-picker 
                      v-if="showDatePickerEnd"
                      v-model="datePickerValueEnd"
                      @update:modelValue="selectDate('end')"
                  ></v-date-picker>
                </div>
              </v-row>
            </div>
            <div class="col-12 px-4">
              <Bar
                id="expense-chart-id"
                :options="chartOptions"
                :data="chartData"
              />
            </div>
            <div class="col-6 ps-4">
              <Bar
                id="total-chart-id"
                :options="totalChartOptions"
                :data="totalChartData"
              />
            </div>
            <div class="col-6 pe-4">
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
        tab: 'month',
        includeLoan: true,
        datePickerValueStart: this.getStartOfTheMonth(),
        showDatePickerStart: false,
        datePickerValueEnd: this.getEndOfTheMonth(),
        showDatePickerEnd: false,
        monthBarChartTab: 'Month',
        weekBarChartTab: 'Week',
      }
    },
    mounted() {
      this.$store.dispatch('dashboard/fetchExpensesBarChart', {start_date: this.dateToFormatYMD(this.datePickerValueStart), end_date: this.dateToFormatYMD(this.datePickerValueEnd)});
    },
    computed: {
      startDate() {
        return this.datePickerValueStart.toDateString();
      },
      endDate() {
        return this.datePickerValueEnd.toDateString();
      },
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
        let chartLabels = this.expensesBarChart.chartLabels;
        if (!this.includeLoan) {
          chartLabels = chartLabels.filter(label => label !== 'Loan');
        }
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
        if (!this.expensesBarChart.chartLabels) return {
          labels: [],
          datasets: []
        };
        let totalExpenses = this.expensesBarChart.totalExpenses;
        let totalBudgets = this.expensesBarChart.totalBudgets;
        if (!this.includeLoan) {
          const loanExpense = this.expensesBarChart.chartExpenseData['Loan'].total_amount;
          totalExpenses -= loanExpense;
          const loanBudget = this.expensesBarChart.chartBudgetData['Loan'].total_weekly_budget;
          totalBudgets -= loanBudget;
        }
        return {
          labels: ['Total'],
          datasets: [
            {
              label: 'Total Expenses',
              backgroundColor: '#3f51b5',
              data: [totalExpenses]
            },
            {
              label: 'Total Budgets',
              backgroundColor: '#e9e9e9',
              data: [totalBudgets]
            }
          ]
        }
      },
      pieChartData() {
        if (!this.expensesBarChart.chartLabels) return {
          labels: [],
          datasets: []
        };
        let chartLabels = this.expensesBarChart.chartLabels;
        if (!this.includeLoan) {
          chartLabels = chartLabels.filter(label => label !== 'Loan');
        }
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
      },
      startIsStartOfMonth() {
        const startOfMonth = this.dateToFormatYMD(this.getStartOfTheMonth());
        const start = this.dateToFormatYMD(this.datePickerValueStart);
        return start === startOfMonth;
      },
      endIsEndOfMonth() {
        const endOfMonth = this.dateToFormatYMD(this.getEndOfTheMonth());
        const end = this.dateToFormatYMD(this.datePickerValueEnd);
        return end === endOfMonth;
      },
      startIsStartOfWeek() {
        const startOfWeek = this.dateToFormatYMD(this.getStartOfTheWeek());
        const start = this.dateToFormatYMD(this.datePickerValueStart);
        return start === startOfWeek;
      },
      endIsEndOfWeek() {
        const endOfWeek = this.dateToFormatYMD(this.getEndOfTheWeek());
        const end = this.dateToFormatYMD(this.datePickerValueEnd);
        return end === endOfWeek;
      }
    },
    methods: {
      tabChangeHandler() {
        if (this.tab === 'month') {
          this.datePickerValueStart = this.getStartOfTheMonth();
          this.datePickerValueEnd = this.getEndOfTheMonth();
          if (this.weekBarChartTab === 'Custom') {
            this.weekBarChartTab = 'Week';
          }
          this.$store.dispatch('dashboard/fetchExpensesBarChart', {start_date: this.dateToFormatYMD(this.datePickerValueStart), end_date: this.dateToFormatYMD(this.datePickerValueEnd)});
        } else if (this.tab === 'week') {
          if (this.monthBarChartTab === 'Custom') {
            this.monthBarChartTab = 'Month';
          }
          this.datePickerValueStart = this.getStartOfTheWeek();
          this.datePickerValueEnd = this.getEndOfTheWeek();
          this.$store.dispatch('dashboard/fetchExpensesBarChart', {start_date: this.dateToFormatYMD(this.datePickerValueStart), end_date: this.dateToFormatYMD(this.datePickerValueEnd)});
        } else if (this.tab === 'monthly') {
          this.$store.dispatch('dashboard/fetchExpensesLineChart', 'monthly');
        } else if (this.tab === 'weekly') {
          this.$store.dispatch('dashboard/fetchExpensesLineChart', 'weekly');
        }
      },
      toggleDatePicker(type) {
        if (type === 'start') {
          this.showDatePickerStart = !this.showDatePickerStart;
        } else {
          this.showDatePickerEnd = !this.showDatePickerEnd;
        }
      },
      selectDate(type) {
        if (type === 'start') {
          if (this.datePickerValueStart > this.datePickerValueEnd) {
            this.datePickerValueStart = this.datePickerValueEnd;
          }
          this.showDatePickerStart = false;
        } else {
          if (this.datePickerValueEnd < this.datePickerValueStart) {
            this.datePickerValueStart = this.datePickerValueEnd;
          }
          this.showDatePickerEnd = false;
        }
        if (this.tab == 'month') {
          if (this.startIsStartOfMonth && this.endIsEndOfMonth) {
            this.monthBarChartTab = 'Month';
          } else {
            this.monthBarChartTab = 'Custom';
          }
        }
        if (this.tab == 'week') {
          if (this.startIsStartOfWeek && this.endIsEndOfWeek) {
            this.weekBarChartTab = 'Week';
          } else {
            this.weekBarChartTab = 'Custom';
          }
        }
        this.$store.dispatch('dashboard/fetchExpensesBarChart', {start_date: this.dateToFormatYMD(this.datePickerValueStart), end_date: this.dateToFormatYMD(this.datePickerValueEnd)});
      },
      getStartOfTheMonth() {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1);
      },
      getEndOfTheMonth() {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
      },
      getStartOfTheWeek() {
        const startOfWeek = new Date();
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - (day === 0 ? 6 : day - 1);

        startOfWeek.setDate(diff);
        startOfWeek.setHours(0, 0, 0, 0);
        return startOfWeek;
      },
      getEndOfTheWeek() {
        const endOfWeek = new Date();
        const day = endOfWeek.getDay();
        const diff = day === 0 ? 0 : 7 - day; // If today is Sunday, diff is 0, otherwise, calculate days until Sunday

        endOfWeek.setDate(endOfWeek.getDate() + diff);
        endOfWeek.setHours(23, 59, 59, 999); 
        return endOfWeek;
      },
      dateToFormatYMD(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
    }
  }
  </script>

  <style scoped>
    :deep(.v-tabs-window) {
      width: 100%;
    }
  </style>