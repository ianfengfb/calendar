<template>
    <div class="calendar-heading" v-if="expensesInformationIsFetching">
        Loading...
    </div>
    <div class="calendar-heading" v-else>
        Monthly <span class="expenses">Expenses</span>: ${{totalExpenses}}
    </div>
    <v-calendar
        ref="calendar"
        v-model="value"
        :events="formattedEvents"
        view-mode="month"
        @update:modelValue="dateChange"
    >
    <template
        v-slot:event="{ event }"
    >
        <v-tooltip location="top">
            <template v-slot:activator="{ props }">
                <v-chip
                    v-text="event.title"
                    v-bind="props"
                ></v-chip>
            </template>
            <v-data-table-virtual :items="event.list"></v-data-table-virtual>
        </v-tooltip>
    </template>
    </v-calendar>
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
                    date: event.date,
                    list: event.list,
                    allDay: true
                }
            });
        },
        totalExpenses() {
            const total = this.getterEvents.reduce((acc, event) => acc + parseFloat(event.amount), 0);
            return total.toFixed(2);
        },
        expensesInformationIsFetching() {
            return this.$store.getters['dashboard/getIsFetchingExpensesInformation'];
        },
        expensesListIsFetching() {
            return this.$store.getters['dashboard/getIsFetchingExpensesList'];
        },
        expensesList() {
            return this.$store.getters['dashboard/getExpensesList'];
        }
    },
    methods: {
        formatDate(date) {
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        },
       dateChange(date) {
            this.$store.dispatch('dashboard/fetchExpensesInformation', this.formatDate(date[0]));
        },
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
    .expenses {
        color: rgb(3, 169, 244)
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
       background-color: rgb(57, 167, 231, 0.5);
       cursor: help;
       color: #057cec;
    }
</style>