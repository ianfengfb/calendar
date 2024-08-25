export default {
    getIsFetchingSummaryCards(state) {
        return state.isFetchingSummaryCards;
    },
    getSummaryCardsInformation(state) {
        return state.summaryCardsInformation;
    },
    getIsFetchingExpensesInformation(state) {
        return state.isFetchingExpensesInformation;
    },
    getExpensesInformation(state) {
        return state.expensesInformation;
    },
    getIsFetchingDiariesInformation(state) {
        return state.isFetchingDiariesInformation;
    },
    getDiariesInformation(state) {
        return state.diariesInformation;
    },
    getIsFetchingExpensesBarChart(state) {
        return state.isFetchingExpensesBarChart;
    },
    getExpensesBarChart(state) {
        return state.expensesBarChart;
    }
}