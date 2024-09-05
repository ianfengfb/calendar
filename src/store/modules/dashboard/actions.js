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
    async fetchExpensesBarChart({ commit }, {start_date, end_date}) {
        commit('fetchExpensesBarChartStart');
        try {
            const response = await axios.get(`${ApiConstants.fetchExpensesBarChart}?start_date=${start_date}&end_date=${end_date}`);
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
    },    
    async fetchSearchContent({ commit }, searchContent) {
        commit('fetchSearchContentStart');
        try {
            const response = await axios.post(ApiConstants.fetchSearchContent, searchContent);
            const responseData = response?.data?.data;
            commit('fetchSearchContentEnd', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    resetSearchContent({ commit }) {
        commit('resetSearchContent');
    },
    async fetchSingleItem({ commit }, data) {
        commit('fetchSingleItemStart');
        try {
            const response = await axios.post(ApiConstants.fetchSingleItem, data);
            const responseData = response?.data?.data;
            commit('fetchSingleItemEnd', responseData);
        } catch (error) {
            console.error(error);
        }
    }
}