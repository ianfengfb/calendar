const baseUrl = 'http://127.0.0.1:8000/api/';

const apis = {
    addBudgetType: `${baseUrl}budget-type`,
    fetchBudgetTypes: `${baseUrl}budget-types`,
    addExpense: `${baseUrl}expense-item`,
    addBudgetParentType: `${baseUrl}budget-parent-type`,
    updateBudgetType: `${baseUrl}update-budget-type`,
    addDiary: `${baseUrl}diaries`,
    fetchDiaries: `${baseUrl}get-diaries`,
    getSingleDiary: `${baseUrl}diary`,
    fetchSummaryCards: `${baseUrl}get-summary-card-information`,
    fetchExpensesInformation: `${baseUrl}get-expenses-information`,
    fetchDiariesInformation: `${baseUrl}get-diaries-information`,
    fetchExpensesBarChart: `${baseUrl}get-expensese-bar-chart-data`,
    fetchExpensesLineChart: `${baseUrl}get-expensese-line-chart-data`,
    fetchDiariesShowCase: `${baseUrl}get-diary-show-case`,
    fetchMoodChart: `${baseUrl}get-diary-mood-chart`,
    fetchSearchContent: `${baseUrl}get-search-result`,
    fetchSingleItem: `${baseUrl}get-single-item`,
}

export default apis;