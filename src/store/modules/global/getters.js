export default {
    getAlert(state) {
        return state.alert;
    },
    showAlert(state) {
        return state.alert?.type;
    }
}