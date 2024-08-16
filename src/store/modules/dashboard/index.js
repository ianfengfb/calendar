import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state: () => ({
        isFetchingSummaryCards: false,
        summaryCardsInformation: {},
        isFetchingExpensesInformation: false,
        expensesInformation: [],
        isFetchingDiariesInformation: false,
        diariesInformation: [],
    }),
    mutations,
    actions,
    getters
}