import ApiConstants from '@/constants/ApiConstants';
import axios from 'axios';

export default {
    async addBudgetType({ commit, dispatch }, budgetType) {
        dispatch('global/clearAlert', null,{ root: true });
        try {
            const response = await axios.post(ApiConstants.addBudgetType, budgetType);
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
            const response = await axios.get(`${ApiConstants.fetchBudgetTypes}/${page}`);
            const responseData = response?.data?.data;
            if (page === 'expense') {
                commit('fetchBudgetTypes', responseData);
            } else if (page === 'settings') {
                commit('fetchBudgetTypesSettings', responseData);
            }
        } catch (error) {
            console.error(error);
        }
    },
    async addExpense({ dispatch }, expense) {
        dispatch('global/clearAlert', null,{ root: true });
        try {
            const response = await axios.post(ApiConstants.addExpense, expense);
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
    },
    async addBudgetParentType({ commit, dispatch }, budgetParentType) {
        dispatch('global/clearAlert', null,{ root: true });
        try {
            const response = await axios.post(ApiConstants.addBudgetParentType, budgetParentType);
            const responseData = response?.data?.data;
            commit('addParentType', responseData);
            dispatch('global/createAlert', {
                title: 'Parent type added successfully!',
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
    async updateBudgetType({ commit, dispatch }, budgetType) {
        dispatch('global/clearAlert', null,{ root: true });
        try {
            const response = await axios.post(ApiConstants.updateBudgetType, budgetType);
            const responseData = response?.data?.data;
            dispatch('global/createAlert', {
                title: 'Expense type updated successfully!',
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
}