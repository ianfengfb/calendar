import axios from 'axios';

export default {
    async addDiary({ commit, dispatch }, diary) {
        dispatch('global/clearAlert', null,{ root: true });
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/diaries', diary);
            const responseData = response?.data;
            dispatch('global/createAlert', {
                title: 'Diary added successfully!',
                type: 'success'
            }, { root: true });
            setTimeout(() => {
                dispatch('global/clearAlert', null,{ root: true });
            }, 3000);
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
    async fetchDiaries({ commit }, filter) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/get-diaries', filter);
            const responseData = response?.data?.data;
            commit('fetchDiaries', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    async getSingleDiary(_, id) {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/diary/${id}`);
            const responseData = response?.data?.data;
            return responseData;
        } catch (error) {
            console.error(error);
        }
    },
    updateDiary({ commit }, diary) {
        commit('updateDiary', diary);
    },
    deleteDiary({ commit }, id) {
        commit('deleteDiary', id);
    }
}