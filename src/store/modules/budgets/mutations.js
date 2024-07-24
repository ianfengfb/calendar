export default {
    addBudgetType(state, budgetType) {
        state.budgetTypes.push(budgetType);
    },
    fetchBudgetTypes(state, allTypes) {
        state.budgetTypes = allTypes.budget_types;
    },
    fetchBudgetTypesSettings(state, allTypes) {
        state.budgetTypesSettings = allTypes;
    }
}