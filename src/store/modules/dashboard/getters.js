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
    },
    getIsFetchingExpensesLineChart(state) {
        return state.isFetchingExpensesLineChart;
    },
    getExpensesLineChart(state) {
        return state.expensesLineChart;
    },
    getIsFetchingDiariesShowCase(state) {
        return state.isFetchingDiariesShowCase;
    },
    getDiariesShowCase(state) {
        return state.diariesShowCase;
    },
    getIsFetchingMoodChart(state) {
        return state.isFetchingMoodChart;
    },
    getMoodChart(state) {
        return state.moodChart;
    },
    getIsFetchingSearchContent(state) {
        return state.isFetchingSearchContent;
    },
    getSearchContent(state) {
        return state.searchContent;
    },
    getIsFetchingSingleItem(state) {
        return state.isFetchingSingleItem;
    },
    getSingleItem(state) {
        return state.singleItem;
    }
}