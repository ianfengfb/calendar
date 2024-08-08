export default {
    addBudgetType(state, budgetType) {
        state.budgetTypes.push(budgetType);
    },
    fetchBudgetTypes(state, allTypes) {
        state.budgetTypes = allTypes.budget_types;
    },
    fetchBudgetTypesSettings(state, allTypes) {
        state.budgetTypesSettings = allTypes;
        state.budgetParentTypes = allTypes.budget_parent_selections;
    },
    addParentType(state, parentType) {
        state.budgetParentTypes.push(parentType);
    }
}