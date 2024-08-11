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
}

export default apis;