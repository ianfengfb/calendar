export default {
    fetchSummaryCardsStart(state) {
        state.isFetchingSummaryCards = true;
    },
    fetchSummaryCardsEnd(state, summaryCardsInformation) {
        state.isFetchingSummaryCards = false;
        state.summaryCardsInformation = summaryCardsInformation;
    },
    fetchExpensesInformationStart(state) {
        state.isFetchingExpensesInformation = true;
    },
    fetchExpensesInformationEnd(state, expensesInformation) {
        state.isFetchingExpensesInformation = false;
        state.expensesInformation = expensesInformation;
    },
    fetchDiariesInformationStart(state) {
        state.isFetchingDiariesInformation = true;
    },
    fetchDiariesInformationEnd(state, diariesInformation) {
        state.isFetchingDiariesInformation = false;
        state.diariesInformation = diariesInformation;
    },
}