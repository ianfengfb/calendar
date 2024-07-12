import { createStore } from "vuex";

import diariesModule from "./modules/diaries/index.js";
import globalModule from "./modules/global/index.js";

const store = createStore({
    modules: {
        diaries: diariesModule,
        global: globalModule,
    },
});

export default store;