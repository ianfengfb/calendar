export default {
    createAlert(state, payload) {
        state.alert = payload;
    },
    clearAlert(state) {
        state.alert = {};
    }
}