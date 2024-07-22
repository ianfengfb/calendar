import axios from 'axios';

export default {
    async addBudgetType({ commit, dispatch }, budgetType) {
        dispatch('global/clearAlert', null,{ root: true });
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/budget-type', budgetType);
            const responseData = response?.data?.data;
            commit('addBudgetType', responseData);
            dispatch('global/createAlert', {
                title: 'Expense type added successfully!',
                type: 'success'
            }, { root: true });
            setTimeout(() => {
                dispatch('global/clearAlert', null,{ root: true });
            }, 3000);
            return responseData;
        }  catch (error) {
            const errorData = error?.response;
            dispatch('global/createAlert', {
                title: errorData?.message || 'Failed to save!',
                type: 'error'
            }, { root: true });
            setTimeout(() => {
                dispatch('global/clearAlert', null,{ root: true });
            }, 3000);
        }
    },
    async fetchBudgetTypes({ commit }, page) {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/budget-types/${page}`);
            const responseData = response?.data?.data;
            commit('fetchBudgetTypes', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    async addExpense({ dispatch }, expense) {
        dispatch('global/clearAlert', null,{ root: true });
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/expense-item', expense);
            const responseData = response?.data?.data;
            dispatch('global/createAlert', {
                title: 'Expense added successfully!',
                type: 'success'
            }, { root: true });
            setTimeout(() => {
                dispatch('global/clearAlert', null,{ root: true });
            }, 3000);
        } catch (error) {
            const errorData = error?.response;
            dispatch('global/createAlert', {
                title: errorData?.message || 'Failed to save!',
                type: 'error'
            }, { root: true });
            setTimeout(() => {
                dispatch('global/clearAlert', null,{ root: true });
            }, 3000);
        }
    }
}