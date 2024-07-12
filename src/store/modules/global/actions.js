export default {
    createAlert({ commit }, payload) {
        commit('createAlert', payload);
    },
    clearAlert({ commit }) {
        commit('clearAlert');
    }
}