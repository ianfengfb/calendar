import { createStore } from "vuex";

import diariesModule from "./modules/diaries/index.js";
import globalModule from "./modules/global/index.js";
import budgetsModule from "./modules/budgets/index.js";

const store = createStore({
    modules: {
        diaries: diariesModule,
        global: globalModule,
        budgets: budgetsModule,
    },
});

export default store;