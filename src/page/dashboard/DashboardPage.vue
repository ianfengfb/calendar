<template>
    <v-container>
        <dashboard-skeleton v-if="summaryCardsIsFetching"></dashboard-skeleton>
        <v-row v-else>
            <div class="col-4 my-5">
                <summary-card
                    icon="mdi-book-account"
                    :number="summaryCards.diariesLastWeek"
                    title="Number of diaries last week"
                ></summary-card>
            </div>
            <div class="col-4 my-5">
                <summary-card
                    icon="mdi-cash-multiple"
                    :number="summaryCards.totalExpensesLastWeek"
                    title="Total expenses last week"
                ></summary-card>
            </div>
            <div class="col-4 my-5">
                <summary-card
                    icon="mdi-timer-sand"
                    :number="summaryCards.freeHoursLastWeek"
                    title="Number of free hours last week"
                ></summary-card>
            </div>
            <div class="col-6 px-3">
                <expense-calendar></expense-calendar>
            </div>
            <div class="col-6 px-3">
                <diaries-calendar></diaries-calendar>
            </div>
            <div class="col-6 px-3">
                <full-width-card class="expense-chart">
                    <expense-bar-chart></expense-bar-chart>
                </full-width-card>
            </div>
            <div class="col-6 px-3">
                <full-width-card>
                    <diaries-show-case></diaries-show-case>
                </full-width-card>
            </div>
        </v-row>
    </v-container>
</template>

<script>
    import SummaryCard from '@/components/dashboard/SummaryCard.vue'
    import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton.vue';
    import ExpenseCalendar from '@/components/dashboard/ExpenseCalendar.vue';
    import DiariesCalendar from '@/components/dashboard/DiariesCalendar.vue';
    import ExpenseBarChart from '@/components/dashboard/ExpenseBarChart.vue';
    import DiariesShowCase from '@/components/dashboard/DiariesShowCase.vue';

    export default {
        components: {
            SummaryCard,
            DashboardSkeleton,
            ExpenseCalendar,
            DiariesCalendar,
            ExpenseBarChart,
            DiariesShowCase
        },
        mounted() {
            this.$store.dispatch('dashboard/fetchSummaryCards');
        },
        computed: {
            summaryCards() {
                return this.$store.getters['dashboard/getSummaryCardsInformation'];
            },
            summaryCardsIsFetching() {
                return this.$store.getters['dashboard/getIsFetchingSummaryCards'];
            },
        }
    }
</script>

<style scoped>
    .expense-chart {
        min-height: 400px;
    }
</style>