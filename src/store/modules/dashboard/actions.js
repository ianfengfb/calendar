import axios from 'axios';
import ApiConstants from '@/constants/ApiConstants';

export default {
    async fetchSummaryCards({ commit }) {
        commit('fetchSummaryCardsStart');
        try {
            const response = await axios.get(ApiConstants.fetchSummaryCards);
            const responseData = response?.data?.data;
            commit('fetchSummaryCardsEnd', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    async fetchExpensesInformation({ commit }, date) {
        commit('fetchExpensesInformationStart');
        try {
            const response = await axios.get(`${ApiConstants.fetchExpensesInformation}/${date}`);
            const responseData = response?.data?.data;
            commit('fetchExpensesInformationEnd', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    
}