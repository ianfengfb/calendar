export default {
    getBudgetTypes(state) {
        return state.budgetTypes;
    },
    getBugetTypesSettings(state) {
        return state.budgetTypesSettings.budget_types;
    },
    getBudgetParentTypes(state) {
        return state.budgetTypesSettings.budget_parent_types;
    },
    getBudgetParentSelections(state) {
        return state.budgetParentTypes;
    }
}