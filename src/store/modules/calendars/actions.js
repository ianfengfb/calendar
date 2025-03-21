import ApiConstants from '@/constants/ApiConstants';
import axios from 'axios';

export default {
    async addEventType({ commit, dispatch }, eventType) {
        dispatch('global/clearAlert', null, { root: true });
        try {
            const response = await axios.post(ApiConstants.addEventType, eventType);
            const responseData = response?.data?.data;
            commit('addEventType', responseData);
            dispatch('global/createAlert', {
                title: 'Event type added successfully!',
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
    },
    async fetchEventTypes({ commit }) {
        try {
            const response = await axios.get(ApiConstants.fetchEventTypes);
            const responseData = response?.data?.data;
            commit('fetchEventTypes', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    async updateEventType({ commit, dispatch }, eventType) {
        dispatch('global/clearAlert', null, { root: true });
        try {
            const response = await axios.post(ApiConstants.updateEventType, eventType);
            const responseData = response?.data?.data;
            commit('updateEventType', responseData);
            dispatch('global/createAlert', {
                title: 'Event type updated successfully!',
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
    },
    async addEvent({ commit, dispatch }, event) {
        dispatch('global/clearAlert', null, { root: true });
        try {
            const response = await axios.post(ApiConstants.addEvent, event);
            const responseData = response?.data?.data;
            commit('addEvent', responseData);
            dispatch('global/createAlert', {
                title: 'Event added successfully!',
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
    },
    async fetchEvents({ commit }, data) {
        try {
            const response = await axios.post(ApiConstants.fetchEvents, data);
            const responseData = response?.data?.data;
            commit('fetchEvents', responseData);
        } catch (error) {
            console.error(error);
        }
    },
    async updateEvent({ commit, dispatch }, event) {
        dispatch('global/clearAlert', null, { root: true });
        try {
            const response = await axios.post(ApiConstants.updateEvent, event);
            const responseData = response?.data?.data;
            commit('updateEvent', responseData);
            dispatch('global/createAlert', {
                title: 'Event updated successfully!',
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
    },
    async deleteEvent({ commit, dispatch }, event) {
        dispatch('global/clearAlert', null, { root: true });
        try {
            const response = await axios.post(ApiConstants.deleteEvent, event);
            const responseData = response?.data?.data;
            commit('deleteEvent', responseData);
            dispatch('global/createAlert', {
                title: 'Event deleted successfully!',
                type: 'success'
            }, { root: true });
            setTimeout(() => {
                dispatch('global/clearAlert', null, { root: true });
            }, 3000);
            return responseData;
        } catch (error) {
            const errorData = error?.response;
            dispatch('global/createAlert', {
                title: errorData?.message || 'Failed to delete!',
                type: 'error'
            }, { root: true });
            setTimeout(() => {
                dispatch('global/clearAlert', null, { root: true });
            }, 3000);
        }
    }
}