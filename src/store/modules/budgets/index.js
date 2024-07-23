import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state: () => ({
        budgetTypes: [],
        budgetParentTypes: [],
    }),
    mutations,
    actions,
    getters
}