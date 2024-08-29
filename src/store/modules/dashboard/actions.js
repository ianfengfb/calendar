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
    async fetchDiariesInformation({ commit },date) {
        commit('fetchDiariesInformationStart');
        try {
            const response = await axios.get(`${ApiConstants.fetchDiariesInformation}/${date}`);
            const responseData = response?.data?.data;
            commit('fetchDiariesInformationEnd', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    async fetchExpensesBarChart({ commit }, period) {
        commit('fetchExpensesBarChartStart');
        try {
            const response = await axios.get(`${ApiConstants.fetchExpensesBarChart}/${period}`);
            const responseData = response?.data?.data;
            commit('fetchExpensesBarChartEnd', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    async fetchExpensesLineChart({ commit }, period) {
        commit('fetchExpensesLineChartStart');
        try {
            const response = await axios.get(`${ApiConstants.fetchExpensesLineChart}/${period}`);
            const responseData = response?.data?.data;
            commit('fetchExpensesLineChartEnd', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    async fetchDiariesShowCase({ commit }, type) {
        commit('fetchDiariesShowCaseStart');
        try {
            const response = await axios.get(`${ApiConstants.fetchDiariesShowCase}/${type}`);
            const responseData = response?.data?.data;
            commit('fetchDiariesShowCaseEnd', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    async fetchMoodChart({ commit }, period) {
        commit('fetchMoodChartStart');
        try {
            const response = await axios.get(`${ApiConstants.fetchMoodChart}/${period}`);
            const responseData = response?.data?.data;
            commit('fetchMoodChartEnd', responseData);
        } catch (error) {
            console.error(error);
        }
    }
    
}