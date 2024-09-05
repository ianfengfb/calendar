<template>
    <v-row >
      <div class="col-12">
        <v-tabs
          v-model="tab"
          bg-color="#e9e9e9"
          fixed-tabs
          @update:model-value="tabChangeHandler"
        >
          <v-tab value="recent">Recent</v-tab>
          <v-tab value="week">Last Week</v-tab>
          <v-tab value="month">Last Month</v-tab>
          <v-tab value="year">Last Year</v-tab>
          <v-tab value="monthly">Monthly Moods</v-tab>
          <v-tab value="yearly">Yearly Moods</v-tab>
        </v-tabs>
      </div>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="recent">
            <div class="col-12 text-center" v-if="isFetchingDiariesShowCase">Loading...</div>
            <div class="col-12 p-3" v-else>
                <diary-item :data="diariesShowCase" :single="true"></diary-item>
            </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="week">
            <div class="col-12 text-center" v-if="isFetchingDiariesShowCase">Loading...</div>
            <div class="col-12 p-3" v-else>
                <diary-item :data="diariesShowCase" :single="true"></diary-item>
            </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="month">
            <div class="col-12 text-center" v-if="isFetchingDiariesShowCase">Loading...</div>
            <div class="col-12 p-3" v-else>
                <diary-item :data="diariesShowCase" :single="true"></diary-item>
            </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="year">
            <div class="col-12 text-center" v-if="isFetchingDiariesShowCase">Loading...</div>
            <div class="col-12 p-3" v-else>
                <diary-item :data="diariesShowCase" :single="true"></diary-item>
            </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="monthly">
            <div class="col-12 text-center" v-if="isFetchingMoodChart">Loading...</div>
            <Line 
                id="line-chart-monthly-id"
                :data="lineChartData" 
                :options="lineChartOptions" 
                v-else
            />
        </v-tabs-window-item>
        <v-tabs-window-item value="yearly">
            <div class="col-12 text-center" v-if="isFetchingMoodChart">Loading...</div>
            <Line 
                id="line-chart-monthly-id"
                :data="lineChartData" 
                :options="lineChartOptions" 
                v-else
            />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-row>
</template>

<script>
    import DiaryItem from '../diary/DiaryItem.vue';
    import { Line } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement, PointElement, LineElement )
    export default {
        components: {
            DiaryItem,
            Line
        },
        data() {
            return {
                tab: 'recent'
            }
        },
        mounted() {
            this.$store.dispatch('dashboard/fetchDiariesShowCase', 'recent');
        },
        computed: {
            isFetchingDiariesShowCase() {
                return this.$store.getters['dashboard/getIsFetchingDiariesShowCase'];
            },
            diariesShowCase() {
                console.log(this.$store.getters['dashboard/getDiariesShowCase']);
                return this.$store.getters['dashboard/getDiariesShowCase'];
            },
            isFetchingMoodChart() {
                return this.$store.getters['dashboard/getIsFetchingMoodChart'];
            },
            moodChart() {
                return this.$store.getters['dashboard/getMoodChart'];
            },
            lineChartData() {
                if (!this.moodChart.chartLabels) return {
                    labels: [],
                    datasets: []
                };
                const chartLabels = this.moodChart.chartLabels;
                return {
                    labels: chartLabels,
                    datasets: [
                        {
                        label: 'Moods',
                        backgroundColor: '#057cec',
                        borderColor: '#057cec',
                        data: this.moodChart.chartData,
                        },
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
                    text: this.tab === 'monthly' ? 'Monthly Moods Trends' : 'Yearly Moods Trends'
                    }
                }
                }
            }
        },
        methods: {
            tabChangeHandler() {
                if (this.tab == 'recent' || this.tab == 'week' || this.tab == 'month' || this.tab == 'year') {
                    this.$store.dispatch('dashboard/fetchDiariesShowCase', this.tab);
                } else {
                    this.$store.dispatch('dashboard/fetchMoodChart', this.tab);
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