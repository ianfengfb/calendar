export default {
    addBudgetType(state, budgetType) {
        state.budgetTypes.push(budgetType);
    },
    fetchBudgetTypes(state, allTypes) {
        state.budgetTypes = allTypes.budget_types;
        state.budgetParentTypes = allTypes.budget_parent_types;
    },
}