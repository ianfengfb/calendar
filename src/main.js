import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css'
import 'vuetify/styles';
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import BaseCard from './components/UI/BaseCard.vue';
import FullWidthCard from './components/UI/FullWidthCard.vue';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
            dark: false,
            colors: {
                primary: '#03a9f4',
                secondary: '#424242',
            }
            },
        },
    },
})

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(store);

app.component('base-card', BaseCard);
app.component('full-width-card', FullWidthCard);

app.mount('#app');
