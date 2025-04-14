import ApiConstants from '@/constants/ApiConstants';
import axios from 'axios';

export default {
    async fetchReports({ commit }) {
        try {
            const response = await axios.get(ApiConstants.fetchReports);
            const responseData = response?.data?.data;
            commit('fetchReports', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    async addReport({ commit, dispatch }, report) {
        dispatch('global/clearAlert', null, { root: true });
        try {
            const response = await axios.post(ApiConstants.addReport, report);
            const responseData = response?.data?.data;
            commit('addReport', responseData);
            dispatch('global/createAlert', {
                title: 'Report added successfully!',
                type: 'success'
            }, { root: true });
            setTimeout(() => {
                dispatch('global/clearAlert', null, { root: true });
            }, 3000);
            return responseData;
        } catch (error) {
            const errorData = error?.response;
            dispatch('global/createAlert', {
                title: errorData?.message || 'Failed to save!',
                type: 'error'
            }, { root: true });
            setTimeout(() => {
                dispatch('global/clearAlert', null, { root: true });
            }, 3000);
        }
    }
}