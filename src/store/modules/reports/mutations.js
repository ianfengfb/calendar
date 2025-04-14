export default {
    fetchReports(state, reports) {
        state.reports = reports;
    },
    addReport(state, report) {
        state.reports.unshift(report);
    }
}