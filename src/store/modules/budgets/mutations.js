export default {
    addBudgetType(state, budgetType) {
        state.budgetTypes.push(budgetType);
    },
    fetchBudgetTypes(state, budgetTypes) {
        state.budgetTypes = budgetTypes;
    },
}