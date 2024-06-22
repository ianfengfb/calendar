import { createStore } from "vuex";

import diariesModule from "./modules/diaries/index.js";

const store = createStore({
    modules: {
        diaries: diariesModule,
    },
});

export default store;