import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/routes';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);

app.use(router);
app.component('VueDatePicker', VueDatePicker);
app.mount('#app');
