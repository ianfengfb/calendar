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
import './css/global.css';

import BaseCard from './components/UI/BaseCard.vue';
import FullWidthCard from './components/UI/FullWidthCard.vue';
import ScrollCard from './components/UI/ScrollCard.vue';
import { VTreeview } from 'vuetify/labs/VTreeview'
import { VCalendar } from 'vuetify/labs/VCalendar'
import MdiIconPicker from './components/helper/MdiIconPicker.vue';

const vuetify = createVuetify({
    components: {
        VTreeview,
        VCalendar,
        ...components,
    },
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
app.component('scroll-card', ScrollCard);
app.component('mdi-icon-picker', MdiIconPicker);

app.mount('#app');
