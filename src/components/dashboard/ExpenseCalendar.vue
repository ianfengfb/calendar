<template>
    <div class="calendar-heading" v-if="expensesInformationIsFetching">
        Loading...
    </div>
    <div class="calendar-heading" v-else>
        Monthly expense: ${{totalExpenses}}
    </div>
    <v-calendar
        ref="calendar"
        v-model="value"
        :events="formattedEvents"
        view-mode="month"
        @update:modelValue="dateChange"
    ></v-calendar>
  </template>

<script>
  export default {
    data: () => ({
      value: [new Date()],
    }),
    mounted() {
        this.$store.dispatch('dashboard/fetchExpensesInformation', this.formatDate(this.value[0]));
    },
    computed: {
        getterEvents() {
            return this.$store.getters['dashboard/getExpensesInformation'];
        },
        formattedEvents() {
            return this.getterEvents.map(event => {
                return {
                    title: `$${event.amount}`,
                    start: new Date(`${event.date}T00:00:00`),
                    end: new Date(`${event.date}T23:59:59`),
                    color: 'red',
                    allDay: true
                }
            });
        },
        totalExpenses() {
            return this.getterEvents.reduce((acc, event) => acc + parseFloat(event.amount), 0);
        },
        expensesInformationIsFetching() {
            return this.$store.getters['dashboard/getIsFetchingExpensesInformation'];
        }
    },
    methods: {
        formatDate(date) {
            return date.toISOString().split('T')[0];
        },
        dateChange(date) {
            this.$store.dispatch('dashboard/fetchExpensesInformation', this.formatDate(date[0]));
        }
    },
  }
</script>

<style scoped>
    .calendar-heading {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 20px;
        text-align: center;
    }
    :deep(.v-calendar-month__day) {
        min-height: 60px !important;
    }
    :deep(.v-calendar-month__day .v-badge) {
        display: none;
    }
    :deep(.v-calendar-month__day .v-chip) {
       width: 100%;
       display: flex;
       justify-content: center;
       align-items: center;
    }
</style>