import { createStore } from "vuex";

import diariesModule from "./modules/diaries/index.js";
import globalModule from "./modules/global/index.js";
import budgetsModule from "./modules/budgets/index.js";
import dashboardModule from "./modules/dashboard/index.js";
import calendarsModule from "./modules/calendars/index.js";

const store = createStore({
    modules: {
        diaries: diariesModule,
        global: globalModule,
        budgets: budgetsModule,
        dashboard: dashboardModule,
        calendar: calendarsModule,
    },
});

export default store;